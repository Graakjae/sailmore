"use client";
import "../app/trips/tripsoverview.css";
import Image from "next/image";

const TripCard = ({ title, startpoint, destination, start_date, end_date, price, img }) => {
    return (
        <div className="trip-card">
            <Image
                src={img}
                className="trip-img"
                alt="Trip Image"
                onError={e => {
                    e.target.src = "/trip_img/defaultTripImage.jpg";
                }}
                width={300}
                height={200}
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
