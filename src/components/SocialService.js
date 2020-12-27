import React from "react";
import {authService, firebaseInstance} from "fBase";

const SocialService = () => {
    const onSocialClick = async (event) => {
        const {target: {name}, } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    };

    return (
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
        </div>
    );
};

export default SocialService;