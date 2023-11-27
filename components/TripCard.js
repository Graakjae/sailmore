"use client"
import React, { useState, useEffect } from 'react';


const TripCard = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/Sejlture.php');
            const result = await response.json();
            setTrips(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Trips List</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {trips.slice(0, 6).map((trip, index) => (
                    <div key={index} style={{ flex: '0 0 25%', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <img src={`trip_img/${trip.trip_img}`} className='trip-img' />
                        <h2 className='trip-title'>{trip.title}</h2>
                        <p className='trip-dates'>{trip.start_date} - {trip.end_date}</p>
                        <p className='trip-price'>${trip.price}€/day</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripCard;
