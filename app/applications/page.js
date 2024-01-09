"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/authContext";
import "./application.css";
import Image from "next/image";
import Link from "next/link";
export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [acceptedCrew, setAcceptedCrew] = useState([]);
    const captainId = useAuth().userId;
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const formData = new FormData();
                formData.append("captainId", captainId);

                const response = await fetch(`/backend/phpScripts/getApplications.php`, {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    const errorResponse = await response.text();
                    console.error(`HTTP error! Status: ${response.status}, Response: ${errorResponse}`);
                    return;
                }

                const data = await response.json();
                setApplications(data.applications);
                console.log("Applications Data:", data.applications);
                if (data.applications && data.applications.length > 0) {
                    const tripId = data.applications[0].trip_ID;
                    // fetchTrip(tripId);
                    fetchAcceptedCrew(tripId);
                }
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, [captainId]);

    const handleDecision = async (action, applicationId) => {
        try {
            const formData = new FormData();
            formData.append("captainId", captainId);
            formData.append("action", action);
            formData.append("applicationId", applicationId);

            const response = await fetch(`/backend/phpScripts/getApplications.php`, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                return;
            }

            const data = await response.json();
            setApplications(data.applications);
            console.log("Applications Data:", data.applications);
        } catch (error) {
            console.error("Error handling decision:", error);
        }
    };

    const fetchAcceptedCrew = async tripId => {
        try {
            const response = await fetch(`/backend/phpScripts/acceptedCrew.php?trip=${tripId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();

            if (result.success) {
                setAcceptedCrew(result.acceptedCrew);
                console.log("Accepted Crew Data:", result);
            } else {
                console.error(`Error fetching accepted crew data: ${result.error}`);
            }
        } catch (error) {
            console.error(`Error fetching accepted crew data: ${error}`);
        }
    };

    console.log(acceptedCrew);
    return (
        <div className="applications-wrapper">
            <h2>Applications Page</h2>
            <h3 className="pending">Pending Applications</h3>
            <div className="grid">
                {applications.map(
                    application =>
                        application.applicationStatus === "pending" && (
                            <div key={application.pk_id}>
                                <div className="application-wrapper">
                                    <div>
                                        <h3>Applying for: {application.title}</h3>
                                    </div>
                                    <Link href={`/profile/crew/${application.crewmember_ID}`} className="profile">
                                        <Image
                                            src={`http://frederikgraakjaer.dk/public/profilePictures/${application.profilePicture}`}
                                            alt="Profile Image"
                                            width={50}
                                            height={50}
                                            className="profilePicture-application"
                                        />
                                        <div>
                                            <h3>
                                                {application.firstname} {application.lastname}
                                            </h3>
                                            <p>{application.exp}</p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="message">{application.msg}</p>
                                    </div>
                                    {application.applicationStatus === "pending" && (
                                        <div className="buttons-wrapper">
                                            <button
                                                className="button"
                                                onClick={() => handleDecision("accepted", application.pk_id)}
                                                disabled={acceptedCrew.length >= application.trip_crew_capacity}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="button"
                                                onClick={() => handleDecision("declined", application.pk_id)}
                                                disabled={acceptedCrew.length >= application.trip_crew_capacity}
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
