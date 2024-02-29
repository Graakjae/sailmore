"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SimpleButton from "@/components/buttons/SimpleButton";
import "./createtrip.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import { useAuth } from "../authContext";
export default function CreateTripPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startPoint, setStartPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState("");
    const [crewCapacity, setCrewCapacity] = useState("");
    const [rules, setRules] = useState("");
    const [tripImages, setTripImages] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const userID = useAuth().userId;

    const isFormValid = () => {
        return (
            title.trim() !== "" &&
            startPoint.trim() !== "" &&
            destination.trim() !== "" &&
            startDate instanceof Date &&
            !isNaN(startDate) &&
            endDate instanceof Date &&
            !isNaN(endDate) &&
            price.trim() !== "" &&
            crewCapacity.trim() !== ""
        );
    };

    const handleCreateTrip = async () => {
        try {
            if (!isFormValid()) {
                setError("Please fill out all fields.");
                return;
            }
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("startpoint", startPoint);
            formData.append("destination", destination);
            formData.append("start_date", format(startDate, "yyyy-MM-dd"));
            formData.append("end_date", format(endDate, "yyyy-MM-dd"));
            formData.append("price", price);
            formData.append("crew_capacity", crewCapacity);
            formData.append("rules", rules);
            tripImages.forEach((image, index) => {
                formData.append(`trip_img[${index}]`, image);
            });

            const response = await fetch("/backend/phpScripts/createTrip.php", {
                method: "POST",
                body: formData
            });

            const data = await response.text();
            console.log(data); // Log the response from the server
            if (data === "Trip registered successfully") {
                router.push(`/profile/captain/${userID}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAddTripImage = e => {
        const selectedFiles = e.target.files;

        // Check if any files are selected
        if (selectedFiles.length === 0) {
            setError(null);
            return;
        }

        // Check file size for each selected file
        const maxSize = 10 * 1024 * 1024; // 10 MB (adjust as needed)
        const invalidFiles = Array.from(selectedFiles).filter(
            file => file.size > maxSize || !file.type.match(/image.*/)
        );

        if (invalidFiles.length > 0) {
            setError(
                `Some files are invalid. Make sure each file is an image and less than ${maxSize / (1024 * 1024)} MB.`
            );
            return;
        }

        // Files are valid, proceed
        setError(null);

        // Add selected files to the array
        setTripImages(Array.from(selectedFiles));
    };

    return (
        <div className="flexBox">
            <div className="signupWrapper">
                <div>
                    <h2>Create a Trip</h2>
                    <div className="grid">
                        <TextInputField
                            label="Title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <div>
                            <h3>Description</h3>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className="descriptionTextarea"
                            />
                        </div>
                        <TextInputField
                            label="Start Point"
                            type="text"
                            value={startPoint}
                            onChange={e => setStartPoint(e.target.value)}
                        />
                        <TextInputField
                            label="Destination"
                            type="text"
                            value={destination}
                            onChange={e => setDestination(e.target.value)}
                        />
                        <div>
                            <h3>Start Date</h3>
                            <DatePicker
                                dateFormat="dd/MM/yy"
                                placeholder="DD/MM/YYYY"
                                selected={startDate}
                                onChange={date => setStartDate(date || new Date())}
                                className="input"
                            />
                        </div>
                        <div>
                            <h3>End Date</h3>
                            <DatePicker
                                dateFormat="dd/MM/yy"
                                placeholder="DD/MM/YYYY"
                                selected={endDate}
                                onChange={date => setEndDate(date || new Date())}
                                className="input"
                            />
                        </div>
                        <TextInputField
                            label="Price per day €"
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <TextInputField
                            label="Crew Capacity"
                            type="number"
                            value={crewCapacity}
                            onChange={e => setCrewCapacity(e.target.value)}
                        />
                        <div>
                            <h3>Rules</h3>
                            <textarea
                                value={rules}
                                onChange={e => setRules(e.target.value)}
                                className="descriptionTextarea"
                            />
                        </div>
                        <div className="boat-picture-upload">
                            <h3>Images</h3>
                            <input
                                type="file"
                                onChange={handleAddTripImage}
                                placeholder=" "
                                multiple
                                className="add-img-button"
                                name="trip_img[]"
                            />
                        </div>
                    </div>
                    {tripImages.map((image, index) => (
                        <img
                            key={index}
                            className="trip_img"
                            src={URL.createObjectURL(image)}
                            alt={`Image ${index + 1} of the trip`}
                        />
                    ))}
                    <SimpleButton text="Create Trip" onClick={handleCreateTrip} />
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
}
