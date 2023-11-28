"use client";
import TripCard from "../../components/TripCard";
import "./tripsoverview.css";
import { useState, useEffect } from "react";

export default function TripsOverview() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [targetArea, setTargetArea] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);

  async function fetchTrips() {
    try {
      const response = await fetch("/backend/phpScripts/getTripCards.php");
      const result = await response.json();
      setTrips(result);
      setFilteredTrips(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // !! opdel i forskellige if-statements, ét til hvert filtreringskriterie
    if (startDate) {
      const newFilteredTrips = trips.filter((trip) => {
        const startDateObj = new Date(startDate);
        const tripStartDateObj = new Date(trip.start_date);

        return tripStartDateObj >= startDateObj;
      });
      setFilteredTrips(newFilteredTrips);
    }
    if (endDate) {
      const newFilteredTrips = trips.filter((trip) => {
        const endDateObj = new Date(endDate);
        const tripEndDateObj = new Date(trip.end_date);

        return tripEndDateObj <= endDateObj;
      });
      setFilteredTrips(newFilteredTrips);
    }
    if (targetArea) {
      const newFilteredTrips = trips.filter((trip) => {
        return (
          trip.startpoint === targetArea || trip.destination === targetArea
        );
      });
      setFilteredTrips(newFilteredTrips);
    }
    if (targetPrice) {
      const newFilteredTrips = trips.filter((trip) => {
        return Number(trip.price) <= Number(targetPrice);
      });
      setFilteredTrips(newFilteredTrips);
    }
  };

  function resetFilters(e) {
    e.preventDefault();
    if (startDate || endDate || targetArea || targetPrice) {
      setFilteredTrips(trips);
      setStartDate(null);
      setEndDate(null);
      setTargetArea(null);
      setTargetPrice(null);
      document.querySelector("form").reset();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <input
          type="text"
          placeholder="Country"
          onChange={(e) => setTargetArea(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max. price"
          onChange={(e) => setTargetPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={resetFilters}>Reset filters</button>
      {filteredTrips.map((trip, index) => (
        <TripCard
          title={trip.title}
          startpoint={trip.startpoint}
          destination={trip.destination}
          start_date={trip.start_date}
          end_date={trip.end_date}
          price={trip.price}
          img={trip.img}
          key={index}
          trip={trip}
        />
      ))}
    </div>
  );
}
