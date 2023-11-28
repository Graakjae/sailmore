"use client";
import TripCard from "@/components/HomePageTrips";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CaptainProfilePage() {
    const [profile, setProfile] = useState({});
    const [trips, setTrips] = useState([]);
    const params = useParams();
    console.log("user", params.profile_captain);

    useEffect(() => {
        const userId = params;

        if (userId) {
            fetchProfile(userId);
            fetchProfileTrips(userId); // Pass userId to fetchProfileTrips
        }
    }, [params]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/profile.php/${params.profile_captain}`);
            const result = await response.json();
            console.log("result", result);

            // Check if the result is an object or an array
            if (typeof result === "object" && result !== null) {
                setProfile(result);
                console.log("result", result);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProfileTrips = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/profileTrips.php/${params.profile_captain}`);
            const result = await response.json();
            console.log("result trips", result);

            // Check if the result is an object or an array
            if (Array.isArray(result)) {
                setTrips(result);
            } else {
                console.error("Unexpected data format for trips:", result);
            }
        } catch (error) {
            console.error("Error fetching trips data:", error);
        }
    };

    return (
        <div>
            <div>
                <h2>{profile.firstname}</h2>
                <p>{profile.bio}</p>
            </div>
            <Image src={`/profilePictures${profile.profilePicture}`} alt="Profile image" width={200} height={200} />
            <div>
                <h3>Trips</h3>
                {trips.length > 0 ? (
                    trips.map(trip => (
                        <div key={trip.trip_id}>
                            <h4>{trip.title}</h4>
                            <p>Start Date: {trip.start_date}</p>
                            <p>End Date: {trip.end_date}</p>
                            <p>Price: {trip.price}</p>
                            <div>
                                <h5>Images</h5>
                                {trip.images.length > 0 ? (
                                    <Image
                                        src={`/trip_img/${trip.images[0]}`}
                                        alt={`Image of ${trip.title}`}
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <p>No images for this trip</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No trips found</p>
                )}
            </div>
            <div>
                <h3>About {profile.firstname}</h3>
                <p>From {profile.country}</p>
                <p>Age {profile.age}</p>
                <p>Experience {profile.exp}</p>
            </div>
            <div>
                <h3>Boat</h3>
                <p>Ship ??</p>
                <p>Model ??</p>
                <p>Year ??</p>
                <p>Length ??</p>
            </div>
        </div>
    );
}
