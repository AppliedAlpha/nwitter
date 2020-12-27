import React from "react";
import AuthForm from "components/AuthForm";
import SocialService from "components/SocialService";

const Auth = () => {
    return (
        <div>
            <AuthForm />
            <SocialService />
        </div>
    );
};

export default Auth;