import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
                updateProfile: (args) => user.updateProfile(args),
            });
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ?
                <AppRouter isLoggedIn={Boolean(userObj)}
                           refreshUser={refreshUser}
                           userObj={userObj} />
                : "Initializing..."}
            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
