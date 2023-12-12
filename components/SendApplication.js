"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/authContext";
import Link from "next/link";
import Image from "next/image";
import SimpleButton from "./buttons/SimpleButton";

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
                    if (data.success === true && data.message === "Application submitted successfully") {
                        setApplication(false);
                        setMessage("");
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
                        <div className="background"></div>
                        <div className="application">
                            <Image
                                src="/cross.png"
                                width={15}
                                height={15}
                                alt="cross"
                                className="cross-icon"
                                onClick={() => setApplication(false)}
                            />
                            <h2>Application</h2>
                            <textarea
                                placeholder="Enter your application message here"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                            <SimpleButton text={"Send application"} onClick={handleRequest} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="not-loggedin">
                            <Image
                                src="/cross.png"
                                width={15}
                                height={15}
                                alt="cross"
                                className="cross-icon"
                                onClick={() => setApplication(false)}
                            />
                            <p>You must be logged in to request to join</p>
                            <Link href="/login">
                                <p className="not-loggedin-text">Login here</p>
                            </Link>
                        </div>
                        <div className="background"></div>
                    </div>
                )
            ) : userRole === "captain" ? null : (
                <div className="button-center">
                    <button
                        className="request-btn"
                        onClick={() => setApplication(true)}
                        disabled={acceptedCrew.length >= maxCapacity}
                    >
                        Request to join
                    </button>
                </div>
            )}
        </div>
    );
}
