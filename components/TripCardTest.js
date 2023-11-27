"use client"
import React, { useState, useEffect } from 'react';

const TripCardTest = () => {
    const [tripCards, setTripCards] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/backend/phpScripts/Sejlture.php');
            const result = await response.json();
            setTripCards(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {tripCards.map((tripcard, index) => (
                    <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <p><strong>First Name: </strong> {tripcard.title}</p>
                        <p><strong>Age: </strong> {tripcard.start_date}</p>
                        <p><strong>Age: </strong> {tripcard.end_date}</p>
                        <p><strong>Experience: </strong> {tripcard.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripCardTest;