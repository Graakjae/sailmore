"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripPage() {
    const [trip, setTrip] = useState({});
    const params = useParams();

    useEffect(() => {
        const trip = params;

        if (trip) {
            fetchTrip(trip);
        }
    }, [params]);

    const fetchTrip = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/getTrips.php/${params.trip}`);
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
            <div>
                <h3>Trip</h3>
                {trip.title ? (
                    <div>
                        <h4>{trip.title}</h4>
                        <p>Description: {trip.description}</p>
                        <p>Start Point: {trip.startpoint}</p>
                        <p>Destination: {trip.destination}</p>
                        <p>Start Date: {trip.start_date}</p>
                        <p>End Date: {trip.end_date}</p>
                        <p>Price: {trip.price}</p>
                        <p>Crew Capacity: {trip.crew_capacity}</p>
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
                ) : (
                    <p>No trip found</p>
                )}
            </div>
        </div>
    );
}
