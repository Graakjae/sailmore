"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/authContext";
import { nanoid } from "nanoid";
import Image from "next/image";
import "./your-applications.css";
import Link from "next/link";
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
            <h2 className="title">Your Applications</h2>
            <div className="flexbox">
                {applications.map(application => (
                    <Link href={`/trip/${application.pk_id}`} key={nanoid()} className="crewApplication">
                        <Image
                            src={`/trip_img/${application.img}`}
                            alt={application.title}
                            width={200}
                            height={200}
                            className="application-image"
                        />
                        <div className="crewApplicationInfo">
                            <p>{application.title}</p>
                            <p>Status: {application.applicationStatus}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
