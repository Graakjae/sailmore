"use client";
import TripCard from "../../components/TripCard";
import Link from "next/link"; // Import Link
import "./tripsoverview.css";
import { useState, useEffect } from "react";

export default function TripsOverview() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [targetArea, setTargetArea] = useState(null);
    const [targetPrice, setTargetPrice] = useState(null);

    async function fetchTrips() {
        try {
            const response = await fetch("/backend/phpScripts/getTripCards.php");
            const result = await response.json();
            setTrips(result);
            console.log(result);

            setFilteredTrips(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        let newFilteredTrips = [...trips];

        if (startDate) {
            const startDateObj = new Date(startDate);
            newFilteredTrips = newFilteredTrips.filter(trip => {
                const tripStartDateObj = new Date(trip.start_date);
                return tripStartDateObj >= startDateObj;
            });
        }
        if (targetArea) {
            newFilteredTrips = newFilteredTrips.filter(trip => {
                return trip.startpoint === targetArea || trip.destination === targetArea;
            });
        }
        if (targetPrice) {
            newFilteredTrips = newFilteredTrips.filter(trip => {
                return Number(trip.price) <= Number(targetPrice);
            });
        }

        setFilteredTrips(newFilteredTrips);
    };

    function resetFilters(e) {
        e.preventDefault();
        if (startDate || targetArea || targetPrice) {
            setFilteredTrips(trips);
            setStartDate(null);
            setTargetArea(null);
            setTargetPrice(null);
            document.querySelector(".filter-form").reset();
        }
    }

    return (
        <div>
            <div className="filter">
                <form className="filter-form" onSubmit={handleSubmit}>
                    <input type="date" onChange={e => setStartDate(e.target.value)} />
                    <input
                        type="text"
                        placeholder="Where would you like to go?"
                        onChange={e => setTargetArea(e.target.value)}
                    />
                    <input type="number" placeholder="Max. price" onChange={e => setTargetPrice(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={resetFilters}>Reset filters</button>
            </div>
            <div className="trip-card-container">
                {filteredTrips.map((trip, index) => (
                    // Wrap each TripCard with Link
                    <Link href={`/trip/${trip.pk_id}`} key={index}>
                        <TripCard
                            title={trip.title}
                            startpoint={trip.startpoint}
                            destination={trip.destination}
                            start_date={trip.start_date}
                            end_date={trip.end_date}
                            price={trip.price}
                            img={`/trip_img/${trip.img ? trip.img : "/defaultTripImage.jpg"}`}
                            key={index}
                            trip={trip}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
