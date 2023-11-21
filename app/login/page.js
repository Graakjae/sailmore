"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../authContext";
import "./login.css";
import SimpleButton from "../../components/buttons/SimpleButton";
import Link from "next/link";
import TextInputField from "../../components/inputs/TextInputField";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loggedIn, setLoggedIn } = useAuth();
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
            console.log("Login response:", data);

            if (data === "Login successful") {
                console.log("User logged in successfully");
                setLoggedIn(true);
                router.push("/");
            } else {
                console.error("Login failed:", data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flexBox">
            <div className="loginWrapper">
                <div>
                    <h2>Login</h2>
                    <TextInputField label="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    <TextInputField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <SimpleButton onClick={handleLogin} text="Login" />
                    <Link className="noLink" href="/signup">
                        Need an account? <b className="link">SIGN UP</b>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
