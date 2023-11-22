"use client"
import React, { useState, useEffect } from 'react';

const TripsListComponent = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/DatabaseTrips.php');
            const result = await response.json();
            setTrips(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Trips List</h1>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {trips.map((trip, index) => (
                    <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <h2>{trip.title}</h2>
                        <p><strong>Start Date:</strong> {trip.start_date}</p>
                        <p><strong>End Date:</strong> {trip.end_date}</p>
                        <p><strong>Price:</strong> {`${trip.price}$/day`}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripsListComponent;

