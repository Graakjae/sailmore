"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CrewCapacity from "@/components/CrewCapacity";

export default function TripPage() {
    const [trip, setTrip] = useState({});
    const { trip: tripParam } = useParams(); // Destructuring to get the 'trip' parameter

    useEffect(() => {
        if (tripParam) {
            fetchTrip(tripParam);
        }
    }, [tripParam]);

    const fetchTrip = async (tripId) => {
        try {
            const response = await fetch(`/backend/phpScripts/getTrips.php/${tripId}`);
            const result = await response.json();

            if (typeof result === "object" && result !== null) {
                setTrip(result);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div>
            <div key={trip.id}>
                <h3>Trip</h3>
                <div>
                    <h4>{trip.title}</h4>
                    <p>Firstname: {trip.firstname}</p>
                    <p>Description: {trip.description}</p>
                    <p>Start Point: {trip.startpoint}</p>
                    <p>Destination: {trip.destination}</p>
                    <p>Start Date: {trip.start_date}</p>
                    <p>End Date: {trip.end_date}</p>
                    <p>Price: {trip.price}</p>
                    <CrewCapacity
                        capacity={trip.crew_capacity}
                        trip={trip}
                    />
                    <p>Rules: {trip.rules}</p>
                    <div>
                        <h5>Images</h5>
                        {trip.img ? (
                            <Image
                                src={`/trip_img/${trip.img}`}
                                alt={`Image of ${trip.title}`}
                                width={100}
                                height={100}
                            />
                        ) : (
                            <p>No images for this trip</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
