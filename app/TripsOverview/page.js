"use client"
import React, { useState, useEffect } from 'react';

const TripsComponent = () => {
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
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Price</th>
                        {/* Add other columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td><img src={trip.img} /></td>
                            <td>{trip.title}</td>
                            <td>{trip.start_date}</td>
                            <td>{trip.end_date}</td>
                            <td>{trip.price}</td>
                            {/* Render other columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TripsComponent;
