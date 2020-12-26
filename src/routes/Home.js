import React, {useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import {dbService, storageService} from "fBase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        dbService.collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArray);
            console.log(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target: {value}, } = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {target: {files}, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}, } = finishedEvent;
            setAttachment(result);
        };
        if (theFile) reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                       value={nweet}
                       onChange={onChange}
                       placeholder="What's Happening?"
                       maxLength={140}
                />
                <input type="file"
                       accept="image/*"
                       onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear Image</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map(nweet =>
                    <Nweet key={nweet.id}
                           nweetObj={nweet}
                           isOwner={nweet.creatorId === userObj.uid} />
                )}
            </div>
        </div>
    );
};
export default Home;