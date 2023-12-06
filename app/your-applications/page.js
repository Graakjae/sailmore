"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/authContext";

export default function YourApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const crewMemberId = useAuth().userId;
    console.log("crewMemberId:", crewMemberId);
    console.log("applications:", useAuth());
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const formData = new FormData();
                formData.append("crewMemberId", crewMemberId);

                const response = await fetch(`/backend/phpScripts/crewApplications.php`, {
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
                console.log("Crew Member Applications Data:", data);
            } catch (error) {
                console.error("Error fetching crew member applications:", error);
            }
        };

        fetchApplications();
    }, [crewMemberId]);
    console.log("applications:", applications);
    return (
        <div>
            <h1>Your Applications Page</h1>
            <h2>Your Applications</h2>
            {applications.map(application => (
                <div key={application.pk_id}>
                    <div>
                        <p>Trip: {application.title}</p>
                        <p>Status: {application.applicationStatus}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
