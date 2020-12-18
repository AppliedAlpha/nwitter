import React, {useState, useEffect} from "react";
import AppRouter from "components/Router";
import {authService} from "fBase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setIsLoggedIn((!!user));
            setInit(true);
        });
    }, []);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
