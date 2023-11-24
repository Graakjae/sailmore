"use client"
import React, { useState, useEffect } from 'react';

const CrewMemberList = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/getCrew.php');
            const result = await response.json();
            setTrips(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>CrewMemberList</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {trips.map((trip, index) => (
                    <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <p><strong>First Name: </strong> {trip.firstname}</p>
                        <p><strong>Age: </strong> {trip.age}</p>
                        <p><strong>Experience: </strong> {trip.experience}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CrewMemberList;