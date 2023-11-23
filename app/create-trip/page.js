"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import SimpleButton from "@/components/buttons/SimpleButton";
import "./createtrip.css";
import "react-datepicker/dist/react-datepicker.css";

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

    const handleCreateTrip = () => {
        // Handle the creation of the trip using the entered data
        console.log("Creating trip:", {
            title,
            description,
            startPoint,
            destination,
            startDate,
            endDate,
            price,
            crewCapacity,
            rules,
        });
    };

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
                    </div>

                    <SimpleButton text="Create Trip" onClick={handleCreateTrip} />
                </div>
            </div>
        </div>
    );
}
