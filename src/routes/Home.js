import React, {useState} from "react"

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        const {target: {value}, } = event;
        setNweet(value);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?" maxLength={140} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    );
};
export default Home;