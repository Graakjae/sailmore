"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CrewCapacity from "@/components/CrewCapacity";
import CaptainCard from "@/components/CaptainCard";
import Link from "next/link";
import { useAuth } from "@/app/authContext";
import Application from "@/components/SendApplication";

export default function TripPage() {
    const [trip, setTrip] = useState({});
    const [acceptedCrew, setAcceptedCrew] = useState([]);
    const [maxCapacity, setMaxCapacity] = useState(0);
    const { trip: tripParam } = useParams();
    const userId = useAuth().userId;

    console.log(useAuth().userId);
    useEffect(() => {
        if (tripParam) {
            fetchTrip(tripParam);
            fetchAcceptedCrew(tripParam);
        }
    }, [tripParam]);

    const fetchTrip = async tripId => {
        try {
            const response = await fetch(`/backend/phpScripts/getAllTripInfo.php?trip=${tripId}`);
            const result = await response.json();

            if (typeof result === "object" && result !== null) {
                setTrip(result);
                setMaxCapacity(result.crew_capacity);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const [images, setImages] = useState([]);

    useEffect(() => {
        if (tripParam) {
            fetchImages(tripParam);
        }
    }, [tripParam]);

    const fetchImages = async tripId => {
        try {
            const response = await fetch(`/backend/phpScripts/getImages.php?trip=${tripId}`);
            const result = await response.json();

            if (typeof result === "object" && result !== null) {
                setImages(result);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAcceptedCrew = async tripId => {
        try {
            const response = await fetch(`/backend/phpScripts/acceptedCrew.php?trip=${tripId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();

            if (result.success) {
                setAcceptedCrew(result.acceptedCrew);
            } else {
                console.error(`Error fetching accepted crew data: ${result.error}`);
            }
        } catch (error) {
            console.error(`Error fetching accepted crew data: ${error}`);
        }
    };
    console.log(trip);
    return (
        <div>
            <div key={trip.id}>
                <h2>Thumbnail</h2>
                {userId == trip.captain_ID ? (
                    <Link href={`/Trip/edit/${tripParam}`}>
                        <button>Edit trip</button>
                    </Link>
                ) : null}
                <Image src={`/trip_img/${trip.img}`} alt={`Image of ${trip.title}`} width={100} height={100} />
                <h3>Other images</h3>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={`/trip_img/${image.img}`}
                        alt={`Image of ${image.title}`}
                        width={100}
                        height={100}
                    />
                ))}
                <h4>{trip.title}</h4>
                <p>
                    {trip.start_date} - {trip.end_date}
                </p>
                <p>
                    {trip.startpoint} to {trip.destination}
                </p>
                <p>Description: {trip.description}</p>
                <p>Price: {trip.price}</p>
                <Application acceptedCrew={acceptedCrew} maxCapacity={maxCapacity} />
                <CrewCapacity capacity={trip.crew_capacity} trip={trip} />
                <p>Rules: {trip.rules}</p>
                <div>
                    <CaptainCard
                        profilePicture={trip.profilePicture}
                        firstname={trip.firstname}
                        lastname={trip.lastname}
                        age={trip.age}
                        brand={trip.brand}
                        model={trip.model}
                        year={trip.year}
                        length={trip.length}
                        toilet={trip.toilet}
                        shower={trip.shower}
                        kitchen={trip.kitchen}
                        gps={trip.gps}
                        wifi={trip.wifi}
                        power={trip.power}
                        outlets={trip.outlets}
                    />
                </div>
                <div>
                    <h2>Accepted Crew</h2>
                    <p>
                        Crew Capacity: {acceptedCrew.length} / {maxCapacity}
                    </p>
                    <ul>
                        {acceptedCrew.map(member => (
                            <div key={member.pk_id}>
                                <li>
                                    {member.firstname} {member.lastname}
                                </li>
                                <Image
                                    src={`/profilePictures/${member.profilePicture}`}
                                    alt={`Image of ${member.firstname}`}
                                    width={100}
                                    height={100}
                                />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
