"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
const CrewMemberList = () => {
    const [crewmembers, setCrewmembers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/backend/phpScripts/getCrew.php");
            const result = await response.json();
            setCrewmembers(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <h2 className="trip-list title-margin">Crewmembers</h2>
            <div className="trip-card-container">
                {crewmembers.slice(0, 8).map((crewmember, index) => (
                    <Link href={`profile/crew/${crewmember.pk_id}`} key={index} className="trip-card-inner-container">
                        <Image
                            src={`http://frederikgraakjaer.dk/public/profilePictures/${crewmember.profilePicture}`}
                            alt="Profile image"
                            width={150}
                            height={150}
                            className="trip-img"
                        />
                        <p className="trip-title">
                            {crewmember.firstname} {crewmember.lastname}, {crewmember.age}
                        </p>
                        <p className="crew-country">{crewmember.country}</p>
                        <p className="crew-exp">{crewmember.exp}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CrewMemberList;
