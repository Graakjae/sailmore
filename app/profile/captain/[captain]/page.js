"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { calculateAge } from "components/calculateAge";
import SignOut from "@/components/SignOut";
import "./captain-profile.css";
import { useAuth } from "@/app/authContext";

export default function CaptainProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [exp, setExp] = useState("");
    const [age, setAge] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState("defaultProfilePicture.png");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(0);
    const [length, setLength] = useState("");
    const [GPS, setGPS] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [power, setPower] = useState(false);
    const [toilet, setToilet] = useState("");
    const [shower, setShower] = useState(false);
    const [kitchen, setKitchen] = useState(false);
    const [trips, setTrips] = useState([]);
    const params = useParams();
    const authId = useAuth().userId;
    useEffect(() => {
        const userId = params;

        if (userId) {
            fetchProfile(userId);
            fetchProfileTrips(userId);
        }
    }, [params]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/getCaptainProfile.php/${params.captain}`);
            const result = await response.json();
            console.log("result", result);
            setFirstName(result.firstname);
            setLastName(result.lastname);
            setEmail(result.email);
            setCountry(result.country);
            setExp(result.exp);
            setAge(new Date(result.age));
            setBio(result.bio);
            setProfilePicture(result.profilePicture);
            setBrand(result.brand);
            setModel(result.model);
            setYear(result.year);
            setLength(result.length);
            setGPS(result.gps);
            setWifi(result.wifi);
            setPower(result.power);
            setToilet(result.toilet);
            setShower(result.shower);
            setKitchen(result.kitchen);
            // Check if the result is an object or an array
            if (typeof result === "object" && result !== null) {
                // setProfile(result);
                console.log("result", result);
                console.log("lastname", lastName);
            } else {
                console.error("Unexpected data format:", result);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchProfileTrips = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/profileTrips.php/${params.captain}`);
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
        <div className="height">
            <div className="flexBox">
                <div className="firstname">
                    <h2>
                        {firstName} {lastName}
                    </h2>
                    <p>{bio}</p>
                </div>
                <div className="rightWrapper">
                    <Image
                        priority
                        src={`/profilePictures/${profilePicture}`}
                        alt="Profile image"
                        width={400}
                        height={400}
                        className="profilePicture"
                    />
                    <div className="infoContainer">
                        <div className="infoWrapper">
                            <h3>
                                {firstName}, {calculateAge(age)}
                            </h3>
                            <p>From: {country}</p>
                            <p>Experience: {exp}</p>
                            <br />
                        </div>
                        <div className="boatInfoBox">
                            <h3>Boat</h3>
                            <p>Brand: {brand}</p>
                            <p>Model: {model}</p>
                            <p>Year: {year}</p>
                            <p>Length: {length} feet</p>
                            <div className="buttonWrapper">
                                <Link href={`/profile/captain/${params.captain}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="Tripstext">
                    <h3>Trips</h3>
                </div>
                <div className="Tripsitems">
                    {trips.length > 0 ? (
                        <div className="trips-container">
                            {trips.map(trip => (
                                <Link href={`/trip/${trip.trip_id}`} key={trip.trip_id} className="trip-item">
                                    <div>
                                        <div className="tripimg">
                                            {trip.images.length > 0 ? (
                                                <Image
                                                    src={`/trip_img/${trip.images[0]}`}
                                                    alt={`Image of ${trip.title}`}
                                                    width={200}
                                                    height={200}
                                                />
                                            ) : (
                                                <p>No images for this trip</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tripdetails">
                                        <h4>{trip.title}</h4>
                                        <p>Start Date: {trip.start_date}</p>
                                        <p>End Date: {trip.end_date}</p>
                                        <p>Price: {trip.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="notrips">
                            <p>No trips found</p>
                        </div>
                    )}
                </div>
                {authId === params.captain && <SignOut />}
            </div>
        </div>
    );
}
