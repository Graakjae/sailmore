"use client";
import { useState } from "react";
export default function signUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        try {
            const response = await fetch("/backend/phpScripts/signup.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `email=${email}&password=${password}`
            });

            const data = await response.text();
            console.log(data); // You can handle the response as needed
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}
