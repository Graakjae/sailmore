// pages/index.js
"use client";
import "./styles.css";
import "./trips/tripsoverview.css";
import Image from "next/image";
import Footer from "/components/Footer";
import React, { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import Link from "next/link";
import HomePageCrew from "@/components/HomePageCrew";
import { useAuth } from "./authContext";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import SimpleButton from "@/components/buttons/SimpleButton";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

function HomePage() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [targetArea, setTargetArea] = useState(null);
    const [targetPrice, setTargetPrice] = useState(null);
    const [placeholder, setPlaceholder] = useState("When do you plan to travel?");
    const router = useRouter();
    console.log(useAuth());

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

    return (
        <div>
            <Image
                src="/Båd_billede.png"
                alt="Picture of a boat on a beach"
                className="backgroundImage"
                width={1000}
                height={1000}
                priority
            />
            <div className="homepage-wrapper">
                <div className="frontpage-height">
                    <h1 className="title">Find your sailing adventure here</h1>
                    <div className="searchbar">
                        <div className="search-bar">
                            <div className="search-bar-input">
                                <div className="pick-date search-input">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => {
                                            setStartDate(date), setPlaceholder(startDate);
                                        }}
                                    />
                                    <input placeholder={placeholder} className="placeholder" disabled />
                                </div>
                                <p> | </p>
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder="Where would you like to go?"
                                    onChange={e => setTargetArea(e.target.value)}
                                />
                                <input
                                    className="max-price-mobile"
                                    type="number"
                                    placeholder="Max. price"
                                    onChange={e => setTargetPrice(e.target.value)}
                                />
                            </div>
                            <Link
                                className="submit-button-front search-bar-icon "
                                href={{
                                    pathname: "/trips"
                                }}
                            >
                                <button type="submit" className="search-bar-icon2">
                                    <img src="/search.png" className="search-bar-icon-img" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="under-searchbar">
                        <Link className="under-searchbar-text" href={"/crew"}>
                            Are you a captain? Click here to find crew members
                        </Link>
                        <div className="background-opacity"></div>
                    </div>
                </div>
                <h2 className="trip-list">Trips</h2>
                <div className="flexbox-frontpage">
                    <div className="trip-card-container">
                        {filteredTrips.slice(0, 8).map((trip, index) => (
                            <Link href={`/trip/${trip.pk_id}`} key={index} className="trip-card-inner-container">
                                <TripCard
                                    title={trip.title}
                                    startpoint={trip.startpoint}
                                    destination={trip.destination}
                                    start_date={trip.start_date}
                                    end_date={trip.end_date}
                                    price={trip.price}
                                    img={`http://frederikgraakjaer.dk/public/trip_img/${
                                        trip.img ? trip.img : "/defaultTripImage.jpg"
                                    }`}
                                    key={index}
                                    trip={trip}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
                <Link href={"/trips"}>
                    <SimpleButton text={"Explore trips"} />
                </Link>
                <HomePageCrew />
                <Link href={"/crew"}>
                    <SimpleButton text={"Explore crewmembers"} />
                </Link>
            </div>
        </div>
    );
}
export default HomePage;
