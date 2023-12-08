"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TextInputField from "@/components/inputs/textInputField";

export default function UpdateTripPage() {
    const params = useParams();
    const tripParam = params;
    console.log("tripParam", tripParam.edit);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startpoint, setStartPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [price, setPrice] = useState("");
    const [crew_capacity, setCrewCapacity] = useState("");
    const [rules, setRules] = useState("");

    useEffect(() => {
        // Fetch the existing trip data for pre-filling the form
        if (tripParam) {
            fetchTrip();
        }
    }, [tripParam]);

    const fetchTrip = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/getTrip.php/${tripParam.edit}`);
            const result = await response.json();
            console.log("result trips", result);

            // Check if the result is an object or an array
            if (Array.isArray(result) && result.length > 0) {
                // Update state values using individual setState functions
                const tripData = result[0]; // Assuming the API returns an array with one trip
                setTitle(tripData.title);
                setDescription(tripData.description);
                setStartPoint(tripData.startpoint);
                setDestination(tripData.destination);
                setStartDate(new Date(tripData.start_date));
                setEndDate(new Date(tripData.end_date));
                setPrice(tripData.price);
                setCrewCapacity(tripData.crew_capacity);
                setRules(tripData.rules);
            } else {
                console.error("Unexpected data format for trips:", result);
            }
        } catch (error) {
            console.error("Error fetching trips data:", error);
        }
    };

    const handleUpdateTrip = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("startpoint", startpoint);
            formData.append("destination", destination);
            formData.append("start_date", format(start_date, "yyyy-MM-dd"));
            formData.append("end_date", format(end_date, "yyyy-MM-dd"));
            formData.append("price", price);
            formData.append("crew_capacity", crew_capacity);
            formData.append("rules", rules);
            const response = await fetch(`/backend/phpScripts/updateTrip.php`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Update result:", result);
        } catch (error) {
            console.error("Error updating trip:", error);
        }
    };
    console.log("trip", title);
    return (
        <div>
            <h2>Update Trip</h2>
            <form onSubmit={handleUpdateTrip}>
                <TextInputField label={"Title"} type="text" value={title} onChange={e => setTitle(e.target.value)} />
                <TextInputField
                    label={"Description"}
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <TextInputField
                    label={"Startpoint"}
                    type="text"
                    value={startpoint}
                    onChange={e => setStartPoint(e.target.value)}
                />
                <TextInputField
                    label={"Destination"}
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                />
                <div>
                    <h3>Start date</h3>
                    <DatePicker
                        className="date"
                        dateFormat="dd/MM/yy"
                        selected={start_date}
                        onChange={date => setStartDate(date)}
                    />
                </div>
                <div>
                    <h3>End date</h3>
                    <DatePicker
                        className="date"
                        dateFormat="dd/MM/yy"
                        selected={end_date}
                        onChange={date => setEndDate(date)}
                    />
                </div>
                <TextInputField label={"Price"} type="text" value={price} onChange={e => setPrice(e.target.value)} />
                <TextInputField
                    label={"Crew capacity"}
                    type="text"
                    value={crew_capacity}
                    onChange={e => setCrewCapacity(e.target.value)}
                />
                <div>
                    <h3>Rules</h3>
                    <textarea className="rules" type="text" value={rules} onChange={e => setRules(e.target.value)} />
                </div>
                <button type="submit">Update Trip</button>
            </form>
        </div>
    );
}
