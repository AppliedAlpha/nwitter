import React, {useState, useEffect} from "react"
import {dbService} from "fBase";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }))
            //    .sort((a, b) => {return a["createdAt"] - b["createdAt"];});
            setNweets(nweetArray);
            console.log(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
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
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment(null);
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