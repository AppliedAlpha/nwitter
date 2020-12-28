import React, {useState} from "react";
import {authService} from "fBase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            }
            else {
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            // console.log(data);
        }
        catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email"
                       type="text"
                       placeholder="Email"
                       required
                       value={email}
                       onChange={onChange}
                       className="authInput"
                />
                <input name="password"
                       type="password"
                       placeholder="Password"
                       required
                       value={password}
                       onChange={onChange}
                       className="authInput"
                />
                <input type="submit"
                       className="authInput authSubmit"
                       value={newAccount ? "계정 만들기" : "로그인"}
                />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "로그인하고 싶나요?" : "계정을 만들고 싶으신가요?"}
            </span>
        </>
    );
};

export default AuthForm;