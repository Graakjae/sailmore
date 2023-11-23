"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SimpleButton from "@/components/buttons/SimpleButton";
import "./createtrip.css";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function createTripPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startPoint, setStartPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [price, setPrice] = useState("");
    const [crewCapacity, setCrewCapacity] = useState("");
    const [rules, setRules] = useState("");
    const [tripImg, setTripImg] = useState("");
    const [error, setError] = useState(null);

    const handleCreateTrip = async () => {
        try {
            const formData = new FormData();    
            formData.append("title", title);
            formData.append("description", description);
            formData.append("startpoint", startPoint);
            formData.append("destination", destination);
            formData.append("start_date", format(startDate, "yyyy-dd-MM")); // Format date to match backend expectations
            formData.append("end_date", format(endDate, "yyyy-dd-MM"))
            formData.append("price", price);
            formData.append("crew_capacity", crewCapacity);
            formData.append("rules", rules);
            formData.append("trip_img", tripImg);

            const response = await fetch("/backend/phpScripts/createTrip.php", { 
                method: "POST",
                body: formData
            });

            const data = await response.text();
            console.log(data); // Log the response from the server
        } catch (error) {
            console.error("Error:", error);
        }
        router.push("/tripArticle/[id]");
    };

    const handleAddTripImage = e => {
        const selectedFile = e.target.files[0];
        console.log("Selected files:", selectedFile.size);

        // Check file size (maxSize in bytes)
        const maxSize = 2 * 1024 * 1024; // 2 MB (adjust as needed)
        if (selectedFile.size > maxSize) {
            setError('File size must be less than ${maxSize / (1024 * 1024)} MB.');
            return;
        };

        if (!selectedFile.type.match(/image.*/)) {
            setError("File must be an image.");
            return;
        };

        // File is within size limit, proceed
        setError(null);
        setTripImg(selectedFile);

        // Check if a file is selected
        if (!selectedFile) {
            setError(null);
            return;
        }};

    return (
        <div className="flexBox">
            <div className="signupWrapper">
                <div>
                    <h2>Create a Trip</h2>
                    <div className="grid">
                        <div>
                            <h3>Title</h3>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <h3>Description</h3>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="descriptionTextarea"
                            />
                        </div>
                        <div>
                            <h3>Start Point</h3>
                            <input type="text" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} />
                        </div>
                        <div>
                            <h3>Destination</h3>
                            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                        <div>
                            <h3>Start Date</h3>
                            <DatePicker
                                dateFormat="dd/MM/yy"
                                placeholder="DD/MM/YYYY"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                            />
                        </div>
                        <div>
                            <h3>End Date</h3>
                            <DatePicker
                                dateFormat="dd/MM/yy"
                                placeholder="DD/MM/YYYY"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>
                        <div>
                            <h3>Price</h3>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <h3>Crew Capacity</h3>
                            <input type="text" value={crewCapacity} onChange={(e) => setCrewCapacity(e.target.value)} />
                        </div>
                        <div>
                            <h3>Rules</h3>
                            <textarea value={rules} onChange={(e) => setRules(e.target.value)} className="descriptionTextarea" />
                        </div>
                        <div>
                            <h3>Boat image</h3>
                            <input type="file" onChange={handleAddTripImage} placeholder="" />
                        </div>
                        <img
                            className="trip_img"
                            src={tripImg ? URL.createObjectURL(tripImg) : ""}
                            alt="Image(s) of the trip"
                        />
                    </div>
                    <SimpleButton text="Create Trip" onClick={handleCreateTrip} />
                </div>
            </div>
        </div>
    );
};