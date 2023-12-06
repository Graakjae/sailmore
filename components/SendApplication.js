"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/authContext";
import Link from "next/link";
export default function Application({ maxCapacity, acceptedCrew }) {
    const [message, setMessage] = useState("");
    const [application, setApplication] = useState(false);
    const params = useParams();
    const loggedIn = useAuth().loggedIn;
    const userRole = useAuth().userRole;
    const handleRequest = async () => {
        try {
            const formData = new FormData();
            formData.append("msg", message);
            formData.append("trip_ID", params.trip);
            fetch("/backend/phpScripts/sendApplication.php", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.success === false && data.message === "You must be logged in to apply for a trip") {
                        console.log("You must be logged in to apply for a trip");
                    }
                });
        } catch (error) {
            console.error("Error submitting application:", error);
        }
    };
    return (
        <div>
            {application ? (
                loggedIn ? (
                    <div>
                        <textarea
                            placeholder="Enter your application message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <button onClick={handleRequest}>Request to join</button>
                    </div>
                ) : (
                    <div>
                        you must be logged in to request to join <Link href="/login">login here</Link>
                    </div>
                )
            ) : userRole === "captain" ? null : (
                <button onClick={() => setApplication(true)} disabled={acceptedCrew.length >= maxCapacity}>
                    Request to join
                </button>
            )}
        </div>
    );
}
