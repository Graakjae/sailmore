// authContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check the server-side authentication status and update the client-side state
        fetch("/backend/phpScripts/checkAuth.php")
            .then(response => response.json())
            .then(data => setLoggedIn(data.loggedIn))
            .catch(error => console.error("Error checking authentication:", error));
    }, []);

    const value = {
        loggedIn,
        setLoggedIn
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
