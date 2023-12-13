"use client";
import TripCard from "../../components/TripCard";
import Link from "next/link"; // Import Link
import "./tripsoverview.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TripsOverview() {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [targetArea, setTargetArea] = useState(null);
  const [targetPrice, setTargetPrice] = useState(null);
  const [placeholder, setPlaceholder] = useState("When do you plan to travel?");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let newFilteredTrips = [...trips];

    if (startDate) {
      const startDateObj = new Date(startDate);
      newFilteredTrips = newFilteredTrips.filter((trip) => {
        const tripStartDateObj = new Date(trip.start_date);
        return tripStartDateObj >= startDateObj;
      });
    }
    if (targetArea) {
      const lowerCaseTargetArea = targetArea.toLowerCase();
      newFilteredTrips = newFilteredTrips.filter((trip) => {
        return (
          trip.startpoint.toLowerCase().includes(lowerCaseTargetArea) || 
          trip.destination.toLowerCase().includes(lowerCaseTargetArea)
        );
      });
    }
    if (targetPrice) {
      newFilteredTrips = newFilteredTrips.filter((trip) => {
        return Number(trip.price) <= Number(targetPrice);
      });
    }

    setFilteredTrips(newFilteredTrips);
  };

  function resetFilters (e) {
      e.preventDefault();
      setFilteredTrips(trips);
      setStartDate(null);
      setTargetArea(null);
      setTargetPrice(null);
      document.querySelector(".filter-form").reset();
    }

  return (
    <div className="trips-page">
      <h1>Trips on SailMore</h1>
      <div className="filter">
        <form className="filter-form" onSubmit={handleSubmit}>
          <div className="search-bar">
            <div className="search-bar-input">
              <div className="pick-date search-input">
            <DatePicker
            selected={startDate}
            onChange={(date) => { setStartDate(date), setPlaceholder(startDate); }} />
            <input placeholder={placeholder} className="placeholder" disabled/>
            </div>
              <p> | </p>
              <input
              className="search-input"
                type="text"
                placeholder="Where would you like to go?"
                onChange={(e) => setTargetArea(e.target.value)}
              />
              <input
                className="max-price-mobile"
                  type="number"
                  placeholder="Max. price"
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">
              <img src="/search.png" />
            </button>
          </div>
          <input
          className="max-price"
            type="number"
            placeholder="Max. price"
            onChange={(e) => setTargetPrice(e.target.value)}
          />
          <div className="mobile-buttons">
          <button type="submit" className="submit-button-mobile">
              <img src="/search.png" />
            </button>
          <button onClick={(e) => {resetFilters(e); setPlaceholder("When do you plan to travel?");}} className="reset-button-mobile">Reset filters</button>
          </div>
          <button onClick={(e) => {resetFilters(e); setPlaceholder("When do you plan to travel?");}} className="reset-button">Reset filters</button>
        </form>
      </div>
      <div className="trip-card-container">
        {filteredTrips.map((trip, index) => (
          // Wrap each TripCard with Link
          <Link
            href={`/trip/${trip.pk_id}`}
            key={index}
            className="trip-card-inner-container"
          >
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
