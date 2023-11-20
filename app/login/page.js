"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await fetch("/backend/phpScripts/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `email=${email}&password=${password}`
            });

            const data = await response.text();

            if (data === "Login successful") {
                console.log("User logged in successfully");
                // Redirect to a protected page or update the UI
                router.push("/"); // Replace '/dashboard' with your desired protected page
            } else {
                console.error("Login failed:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
