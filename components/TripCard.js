"use client"
import React, { useState, useEffect } from 'react';

const TripCard = ({title, startpoint, destination, start_date, end_date, price, img}) => {

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                        <img src={`trip_img/${img}`} className='trip-img' />
                        <h2 className='trip-title'>{title}</h2>
                        <h3 className='trip-area'>{startpoint} to {destination}</h3>
                        <p className='trip-dates'>{start_date} - {end_date}</p>
                        <p className='trip-price'>{price}€/day</p>
                    </div>
            </div>
        </div>
    );
};

export default TripCard;
