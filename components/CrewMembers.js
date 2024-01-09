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
        <div className="crewmember-component">
            <div className="crewmember-list">
                {crewmembers.map((crewmember, index) => (
                    <Link href={`/profile/crew/${crewmember.pk_id}`} key={index} className="crewmember-card">
                        <Image
                            src={`http://frederikgraakjaer.dk/public/profilePictures/${crewmember.profilePicture}`}
                            alt="Profile image"
                            width={500}
                            height={500}
                            className="crewmember-img"
                        />
                        <p className="name-and-age">
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
