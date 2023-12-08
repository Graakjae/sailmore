// pages/index.js
"use client";
import "./styles.css";
import Image from "next/image";
import Footer from "/components/Footer";
import HomePageHeader from "/components/HomePageHeader";
import LoggedIn from "@/components/loggedIn";
import React, { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import Link from "next/link";
import HomePageCrew from "@/components/HomePageCrew";

function HomePage() {
    const [trips, setTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);

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
                alt="Site Logo"
                className="backgroundImage"
                width={1000}
                height={1000}
                priority
            />
            <LoggedIn />
            <br></br>
            <HomePageHeader />
            <br></br>
            <h1>Trips List</h1>
            {filteredTrips.slice(0, 8).map((trip, index) => (
                <Link href={`/trip/${trip.pk_id}`} key={index}>
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
                </Link>
            ))}
            <br></br>
            {/* <ExploreTripsButton /> */}
            <br></br>
            <HomePageCrew />
            <br></br>
            {/* <MoreCrewMembersButton /> */}
            <br></br>
            <Footer />
        </div>
    );
}
export default HomePage;
