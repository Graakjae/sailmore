"use client"
import React, { useState, useEffect } from 'react';

export default function TripCard() {
    const [trips, setTrips] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/getTrips.php');
            const result = await response.json();
            setTrips(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Trips List</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {trips.map((trip, index) => (
                    <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <img src={trip.trip_img} />
                        <h2>{trip.title}</h2>
                        <p>{trip.start_date} - {trip.end_date}</p>
                        <p>${trip.price}€/day</p>
                    </div>
                ))}
            </div>
        </div>
    );
};