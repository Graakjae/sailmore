"use client";
import TripCard from "@/components/HomePageTrips";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import FileInputField from "@/components/inputs/fileInput";
import "./profile-captain.css";
import SimpleButton from "@/components/buttons/SimpleButton";
import SwitchToggle from "@/components/inputs/toggle";

export default function CaptainProfilePage() {
    const [profile, setProfile] = useState({});
    const [trips, setTrips] = useState([]);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingBoat, setIsEditingBoat] = useState(false);
    const [tripTitle, setTripTitle] = useState("");
    const [tripDescription, setTripDescription] = useState("");
    const [tripStartPoint, setTripStartPoint] = useState("");
    const [tripDestination, setTripDestination] = useState("");
    const [tripStartDate, setTripStartDate] = useState(new Date());
    const [tripEndDate, setTripEndDate] = useState(new Date());
    const [tripPrice, setTripPrice] = useState("");
    const [tripCrewCapacity, setTripCrewCapacity] = useState("");
    const [tripRules, setTripRules] = useState("");
    const [isEditingTrip, setIsEditingTrip] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
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
    const [age, setAge] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();

    console.log("user", params.profile_captain);

    useEffect(() => {
        const userId = params;

        if (userId) {
            fetchProfile(userId);
            fetchProfileTrips(userId);
        }
    }, [params]);
    
    const handleTripEdit = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("title", tripTitle);
            formData.append("description", tripDescription);
            formData.append("startpoint", tripStartPoint);
            formData.append("destination", tripDestination);
            formData.append("start_date", format(tripStartDate, "yyyy-MM-dd"));
            formData.append("end_date", format(tripEndDate, "yyyy-MM-dd"));
            formData.append("price", tripPrice);
            formData.append("crew_capacity", tripCrewCapacity);
            formData.append("rules", tripRules);

            const response = await fetch(`/backend/phpScripts/updateTrip.php`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Update result:", result);

            setIsEditingTrip(false);
            fetchProfileTrips(params.profile_captain);
        } catch (error) {
            console.error("Error updating trip:", error);
        }
    };
    const fetchProfile = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/profile.php/${params.profile_captain}`);
            const result = await response.json();
            console.log("result", result);
            setFirstName(result.firstname);
            setLastName(result.lastname);
            setBio(result.bio);
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
                setProfile(result);
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

    const handleSaveClick = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("bio", bio);
            formData.append("profilePicture", profilePicture);
            const response = await fetch(`/backend/phpScripts/updateProfile.php`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Update result:", result);

            setIsEditing(false);
            fetchProfile(params);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleBoatEdit = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("brand", brand);
            formData.append("model", model);
            formData.append("year", year);
            formData.append("length", length);
            formData.append("toilet", toilet);
            formData.append("shower", shower);
            formData.append("gps", GPS);
            formData.append("wifi", wifi);
            formData.append("power", power);
            formData.append("kitchen", kitchen);
            const response = await fetch(`/backend/phpScripts/updateBoat.php`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Update result:", result);

            setIsEditingBoat(false);
            fetchProfile(params);
        } catch (error) {
            console.error("Error updating boat:", error);
        }
    };

    const handleProfilePictureChange = e => {
        const selectedFile = e.target.files[0];
        console.log("Selected files:", selectedFile.size);

        // Check file size (maxSize in bytes)
        const maxSize = 10 * 1024 * 1024; // 2 MB (adjust as needed)
        if (selectedFile.size > maxSize) {
            setError(`File size must be less than ${maxSize / (1024 * 1024)} MB.`);
            return;
        }

        if (!selectedFile.type.match(/image.*/)) {
            setError("File must be an image.");
            return;
        }

        // File is within size limit, proceed
        setError(null);
        setProfilePicture(selectedFile);

        // Check if a file is selected
        if (!selectedFile) {
            setError(null);
            return;
        }

        // Display a preview of the selected image
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
    };
    const formatDate = date => {
        const options = { year: "numeric", day: "2-digit", month: "2-digit" };
        return new Intl.DateTimeFormat("de", options).format(age);
    };
    console.log("Profile age:", formatDate(profile.age));
    console.log("gps:", power);
    return (
        <div className="height">
            {isEditing ? (
                <div>
                    <div className="background"></div>
                    <div className="editWrapper">
                        <div>
                            <TextInputField
                                label={"First name"}
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextInputField
                                label={"Last name"}
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <div>
                                <h3>Bio</h3>
                                <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="bioInput" />
                            </div>
                            <div>
                                <FileInputField
                                    label="Profile picture"
                                    type="file"
                                    onChange={handleProfilePictureChange}
                                    button={"Edit picture"}
                                />
                                {profile.profilePicture && typeof profile.profilePicture === "string" ? (
                                    <img
                                        className="editProfilePicture"
                                        src={previewUrl || `/profilePictures/${profile.profilePicture}`}
                                        alt="Profile picture"
                                    />
                                ) : (
                                    <img
                                        className="editProfilePicture"
                                        src={previewUrl || "/defaultProfilePicture.png"}
                                        alt="Profile picture"
                                    />
                                )}
                                <br />
                                <span className="file-name">{profilePicture ? profilePicture.name : ""}</span>
                            </div>
                            <SimpleButton text={"Save"} onClick={handleSaveClick} />
                            <Image
                                src="/cross.png"
                                alt="Close edit"
                                width={20}
                                height={20}
                                className="closeEdit"
                                onClick={() => setIsEditing(false)}
                            />
    
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            {isEditingBoat && (
                <div>
                    <div className="background"></div>
                    <div className="editWrapper">
                        <div>
                            <h3>Boat info</h3>
                            <TextInputField
                                label={"Boat name"}
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <TextInputField
                                label={"Model"}
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                            <TextInputField
                                label={"Year"}
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                            <TextInputField
                                label={"Length"}
                                type="number"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                            <TextInputField
                                label={"Toilet"}
                                type="number"
                                value={toilet}
                                onChange={(e) => setToilet(e.target.value)}
                            />
    
                            <SwitchToggle text={"GPS"} onChange={() => setGPS(!GPS)} value={GPS} />
                            <SwitchToggle text={"Shower"} onChange={() => setShower(!shower)} value={shower} />
                            <SwitchToggle text={"Kitchen"} onChange={() => setKitchen(!kitchen)} value={kitchen} />
                            <SwitchToggle text={"Wifi"} onChange={() => setWifi(!wifi)} value={wifi} />
                            <SwitchToggle text={"Power"} onChange={() => setPower(!power)} value={power} />
    
                            <SimpleButton text={"Save"} onClick={handleBoatEdit} />
                            <Image
                                src="/cross.png"
                                alt="Close edit"
                                width={20}
                                height={20}
                                className="closeEdit"
                                onClick={() => setIsEditingBoat(false)}
                            />
    
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    </div>
                </div>
            )}
            {isEditingTrip && (
                <div>
                    <div className="background"></div>
                    <div className="editWrapper">
                        <div>
                            <h3>Edit Trip</h3>
                            <TextInputField
                                label={"Title"}
                                type="text"
                                value={tripTitle}
                                onChange={(e) => setTripTitle(e.target.value)}
                            />
                            <TextInputField
                                label={"Description"}
                                type="text"
                                value={tripDescription}
                                onChange={(e) => setTripDescription(e.target.value)}
                            />
                            {/* Add similar TextInputField components for other trip fields */}
                            <DatePicker
                                selected={tripStartDate}
                                onChange={(date) => setTripStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="datePicker"
                            />
                            <DatePicker
                                selected={tripEndDate}
                                onChange={(date) => setTripEndDate(date)}
                                dateFormat="yyyy-MM-dd"
                                className="datePicker"
                            />
                            <TextInputField
                                label={"Price"}
                                type="number"
                                value={tripPrice}
                                onChange={(e) => setTripPrice(e.target.value)}
                            />
                            <TextInputField
                                label={"Crew Capacity"}
                                type="number"
                                value={tripCrewCapacity}
                                onChange={(e) => setTripCrewCapacity(e.target.value)}
                            />
                            <TextInputField
                                label={"Rules"}
                                type="text"
                                value={tripRules}
                                onChange={(e) => setTripRules(e.target.value)}
                            />
    
                            <SimpleButton text={"Save"} onClick={handleTripEdit} />
                            <Image
                                src="/cross.png"
                                alt="Close edit"
                                width={20}
                                height={20}
                                className="closeEdit"
                                onClick={() => setIsEditingTrip(false)}
                            />
    
                            {error && <p className="error-message">{error}</p>}
                        </div>
                    </div>
                </div>
            )}
    
            <div className="flexBox">
                <div className="leftWrapper">
                    <div className="bio">
                        <h2>
                            {profile.firstname} {profile.lastname}
                        </h2>
                        <p>{profile.bio}</p>
                    </div>
                    <div>
                        <h3>Trips</h3>
                        {trips.length > 0 ? (
                            trips.map((trip) => (
                                <div key={trip.trip_id}>
                                    <h4>{trip.title}</h4>
                                    <p>Start Date: {trip.start_date}</p>
                                    <p>End Date: {trip.end_date}</p>
                                    <p>Price: {trip.price}</p>
                                    <button onClick={() => setIsEditingTrip(true)}>Edit Trip</button>
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
                </div>
                <div className="rightWrapper">
                    <Image
                        src={`/profilePictures/${profile.profilePicture}`}
                        alt="Profile image"
                        width={400}
                        height={400}
                    />
                    <div>
                        <div className="infoWrapper">
                            <h3>About {profile.firstname}</h3>
                            <p>From {profile.country}</p>
                            <p>Birthday {formatDate(profile.age)}</p>
                            <p>Experience {profile.exp}</p>
                        </div>
                        <div className="infoWrapper">
                            <h3>Boat</h3>
                            <p>Ship {profile.brand}</p>
                            <p>Model {profile.model}</p>
                            <p>Year {profile.year}</p>
                            <p>Length {profile.length}</p>
                            <button onClick={() => setIsEditingBoat(true)}>Edit boat</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}