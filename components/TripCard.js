"use client";
import "../app/trips/tripsoverview.css";

const TripCard = ({ title, startpoint, destination, start_date, end_date, price, img }) => {
    return (
        <div className="trip-card">
            <img src={`trip_img/${img}`} className="trip-img" />
            <h2 className="trip-title">{title}</h2>
            <h3 className="trip-area">
                {startpoint} to {destination}
            </h3>
            <p className="trip-dates">
                {start_date} - {end_date}
            </p>
            <p className="trip-price">{price}€/day</p>
        </div>
    );
};

export default TripCard;
