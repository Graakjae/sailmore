// authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetch("/backend/phpScripts/checkAuth.php")
            .then(response => response.json())
            .then(data => {
                setLoggedIn(data.loggedIn);
                setUserId(data.userId);
            })
            .catch(error => console.error("Error checking authentication:", error));
    }, []);

    const value = {
        loggedIn,
        setLoggedIn,
        userId
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
