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
                Google로 계속하기
                <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button name="github"
                    className="authBtn"
                    onClick={onSocialClick}>
                GitHub으로 계속하기
                <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    );
};

export default SocialService;