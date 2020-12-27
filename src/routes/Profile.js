import React, {useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {authService, dbService} from "fBase";

export default ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : "");

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    };

    const onChange = (event) => {
        const {target: {value}, } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    };

    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text"
                       onChange={onChange}
                       placeholder="Display name"
                       value={newDisplayName} />
                <input type="submit"
                       value="Update Profile" />
            </form>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}