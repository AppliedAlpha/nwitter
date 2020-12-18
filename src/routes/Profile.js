import React from "react"
import {useHistory} from "react-router-dom"
import {authService} from "fBase";

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}