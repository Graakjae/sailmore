"use client";
import "../app/trips/tripsoverview.css";

const TripCard = ({ title, startpoint, destination, start_date, end_date, price, img }) => {
    return (
        <div className="trip-card">
            <img
                src={`${img}`}
                className="trip-img"
                alt="Trip Image"
                onError={e => {
                    e.target.src = "/trip_img/defaultTripImage.jpg";
                }}
            />
            <h2 className="trip-title-tripcard">{title}</h2>
            <h3 className="trip-area-tripcard">
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
