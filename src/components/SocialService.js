import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
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
        <div className="authBtns">
            <button name="google"
                    className="authBtn"
                    onClick={onSocialClick}>
                Continue with Google
                <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button name="github"
                    className="authBtn"
                    onClick={onSocialClick}>
                Continue with GitHub
                <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    );
};

export default SocialService;