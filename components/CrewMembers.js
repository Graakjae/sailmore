"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";

const CrewMemberList = () => {
    const [crewmembers, setCrewmembers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/getCrew.php');
            const result = await response.json();
            setCrewmembers(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>CrewMemberList</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {crewmembers.map((crewmember, index) => (
                    <div key={index}>
                        <Image
                            src={`/profilePictures/${crewmember.profilePicture}`}
                            alt="Profile image"
                            width={150}
                            height={150}
                        />
                        <p><strong></strong></p>
                        <p>{crewmember.firstname} {crewmember.lastname}, {crewmember.age}</p>
                        <p></p>
                        <p>{crewmember.exp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CrewMemberList;