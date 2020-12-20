import React, {useState} from "react"
import {dbService} from "../fBase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now(),
        });
        setNweet("");
    };
    const onChange = (event) => {
        const {target: {value}, } = event;
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's Happening?" maxLength={140} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
};
export default Home;