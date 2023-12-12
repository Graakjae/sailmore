"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CrewCapacity from "@/components/CrewCapacity";
import CaptainCard from "@/components/CaptainCard";
import Link from "next/link";
import { useAuth } from "@/app/authContext";
import Application from "@/components/SendApplication";
import { calculateAge } from "/components/calculateAge";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./trip.css";
import { nanoid } from "nanoid";
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
    const imageSliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000
    };
    console.log("trip", trip);
    const neededCrew = maxCapacity - acceptedCrew.length;
    const crewNumbers = Array.from({ length: neededCrew }, (_, index) => index + 1);
    console.log(trip);
    return (
        <div className="trip-wrapper">
            <div>
                <div className="image-wrapper">
                    <Slider {...imageSliderSettings} className="slider-wrapper">
                        {images.length === undefined ? (
                            <Image
                                src={`/trip_img/defaultTripImage.jpg`}
                                alt="default"
                                width={1000}
                                height={850}
                                className="trip-image"
                            />
                        ) : (
                            images.map(image => (
                                <div className="slider" key={image.img}>
                                    <Image
                                        src={`/trip_img/${image.img}`}
                                        alt={image.img}
                                        width={1000}
                                        height={850}
                                        className="trip-image"
                                    />
                                </div>
                            ))
                        )}
                    </Slider>
                </div>
                <div className="trip-info">
                    <div className="left-wrapper">
                        <h2 className="trip-title">{trip.title}</h2>
                        <Link href={`/profile/captain/${trip.captain_ID}`} className="captain-wrapper">
                            {trip.profilePicture ? (
                                <Image
                                    src={`/profilePictures/${trip.profilePicture}`}
                                    alt="Profile picture"
                                    width={50}
                                    height={50}
                                    className="profile-picture"
                                />
                            ) : (
                                <Image
                                    src={"/profilePictures/smallProfilePicture.png"}
                                    alt="Profile picture"
                                    width={50}
                                    height={50}
                                    className="profile-picture"
                                />
                            )}

                            <div>
                                <p>
                                    {trip.firstname} {trip.lastname}
                                </p>
                                <div className="review">
                                    <Image src={`/icons/icon_star.png`} alt="Star" width={20} height={20} />
                                    <p>Review: 4,6 - 24 Reviews </p>
                                </div>
                            </div>
                        </Link>

                        <p>{trip.description}</p>
                        {/* <CrewCapacity capacity={trip.crew_capacity} trip={trip} /> */}
                        <div className="rules">
                            <Image src={`/icons/icon_rules.png`} alt="rules" width={20} height={20} />
                            <p>Rules</p>
                        </div>
                        <p>{trip.rules}</p>
                    </div>

                    <div className="right-wrapper">
                        {userId == trip.captain_ID ? (
                            <Link href={`/trip/edit/${tripParam}`} className="button-end">
                                <div className="edit-btn">
                                    <Image src="/icons/icon_Pen.png" alt="edit" width={15} height={15} />
                                    <p>Edit trip</p>
                                </div>
                            </Link>
                        ) : null}
                        <div className="crew-wrapper">
                            <div className="important-info">
                                <Image src={`/icons/icon_coins.png`} alt="price" width={20} height={20} />
                                <p>{trip.price}€ / day</p>
                            </div>
                            <div className="important-info">
                                <Image src={`/icons/icon_anchor.png`} alt="calendar" width={20} height={20} />
                                <p>
                                    {trip.destination} - {trip.startpoint}
                                </p>
                            </div>
                            <div className="important-info">
                                <Image src={`/icons/icon_calender.png`} alt="calendar" width={20} height={20} />
                                <p>
                                    {trip.start_date} - {trip.end_date}
                                </p>
                            </div>

                            <Application acceptedCrew={acceptedCrew} maxCapacity={maxCapacity} />
                        </div>

                        <div className="crew-wrapper">
                            <h2>
                                Crew: {acceptedCrew.length} / {maxCapacity}
                            </h2>
                            <ul>
                                {acceptedCrew.map(member => (
                                    <div className="crew" key={member.pk_id}>
                                        <Image
                                            src={`/profilePictures/${member.profilePicture}`}
                                            alt={`Image of ${member.firstname}`}
                                            width={30}
                                            height={30}
                                        />
                                        <p>
                                            {member.firstname} {member.lastname}
                                        </p>
                                    </div>
                                ))}
                                {crewNumbers.map(member => (
                                    <div className="crew" key={nanoid()}>
                                        <Image
                                            src={`/profilePictures/smallProfilePicture.png`}
                                            alt={`You?`}
                                            width={30}
                                            height={30}
                                        />
                                        <p>you?</p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
