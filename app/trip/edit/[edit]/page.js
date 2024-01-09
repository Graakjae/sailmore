"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TextInputField from "@/components/inputs/textInputField";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./edit-trip.css";

export default function UpdateTripPage() {
    const params = useParams();
    const tripParam = params;
    const tripID = params.edit;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startpoint, setStartPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [price, setPrice] = useState("");
    const [crew_capacity, setCrewCapacity] = useState("");
    const [rules, setRules] = useState("");
    const [tripImages, setTripImages] = useState([]);
    const [newTripImages, setNewTripImages] = useState([]);
    const [error, setError] = useState(null);
    const userId = useAuth().userId;
    const router = useRouter();
    useEffect(() => {
        if (tripParam) {
            fetchTrip();
        }
    }, [tripParam]);

    const fetchTrip = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/getTrip.php/${tripID}`);
            const result = await response.json();
            // Check if the result is an object or an array
            if (Array.isArray(result) && result.length > 0) {
                // Update state values using individual setState functions
                const tripData = result[0];
                setTitle(tripData.title);
                setDescription(tripData.description);
                setStartPoint(tripData.startpoint);
                setDestination(tripData.destination);
                setStartDate(new Date(tripData.start_date));
                setEndDate(new Date(tripData.end_date));
                setPrice(tripData.price);
                setCrewCapacity(tripData.crew_capacity);
                setRules(tripData.rules);

                setTripImages(tripData.images);
            } else {
                console.error("Unexpected data format for trips:", result);
            }
        } catch (error) {
            console.error("Error fetching trips data:", error);
        }
    };
    console.log("tripImages", tripImages);
    const handleUpdateTrip = async () => {
        try {
            event.preventDefault();
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
            newTripImages.forEach((image, index) => {
                formData.append(`trip_img[${index}]`, image);
            });
            const response = await fetch(`/backend/phpScripts/updateTrip.php/${tripID}`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Response:", result);
            if (result.message === "Trip updated successfully") {
                router.push(`/trip/${tripID}`); // Change the path to the desired page
            }
        } catch (error) {
            console.error("Error updating trip:", error);
        }
    };

    const handleDeleteTrip = async () => {
        try {
            const confirmation = confirm(`Are you sure you want to delete ${title}?`);
            if (confirmation) {
                const response = await fetch(`/backend/phpScripts/deleteTrip.php/${tripID}`, {
                    method: "DELETE"
                });

                console.log("response", response);

                if (response.ok) {
                    const result = await response.json();
                    console.log("Delete result:", result);
                    if (result.success) {
                        // Perform any additional actions upon successful trip deletion
                        console.log("Trip deleted successfully");

                        // Redirect to the home page
                        router.push("/trips");
                    } else {
                        console.error("Error deleting trip:", result.error);
                    }
                }
            } else {
                console.error("Failed to delete trip. HTTP status:", response.status);
            }
        } catch (error) {
            console.error("Error deleting trip:", error);
        }
    };

    const handleDeleteImage = async imageId => {
        try {
            const confirmation = window.confirm("Are you sure you want to delete this image?");
            if (confirmation) {
                const response = await fetch(`/backend/phpScripts/deleteImageFromTrip.php/${imageId}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    const result = await response.json();

                    if (result.success) {
                        // Perform any additional actions upon successful image deletion
                        console.log("Image deleted successfully");

                        // Update the UI by removing the deleted image element from the DOM
                        const deletedImageElement = document.getElementById(`image_${imageId}`);
                        if (deletedImageElement) {
                            deletedImageElement.remove();
                        }
                    } else {
                        console.error("Error deleting image:", result.error);
                    }
                } else {
                    console.error("Failed to delete image. HTTP status:", response.status);
                }
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleFileChange = e => {
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
        console.log("selectedFiles", selectedFiles);
        // Files are valid, proceed
        setError(null);

        // Add selected files to the array
        setNewTripImages(Array.from(selectedFiles));
    };
    console.log("newTripImages", newTripImages);
    console.log("tripImages", rules);
    return (
        <div className="flex-container">
            <div className="edit-wrapper">
                <div className="inner-container">
                    <h2>Update Trip</h2>

                    <form onSubmit={handleUpdateTrip}>
                        <TextInputField
                            label={"Title"}
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
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
                        <TextInputField
                            label={"Price"}
                            type="text"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <TextInputField
                            label={"Crew capacity"}
                            type="text"
                            value={crew_capacity}
                            onChange={e => setCrewCapacity(e.target.value)}
                        />
                        <div>
                            <h3>Rules</h3>
                            <textarea
                                className="rules"
                                type="text"
                                value={rules}
                                onChange={e => setRules(e.target.value)}
                            />
                        </div>
                        <div className="picture-upload">
                            <label htmlFor="imageInput">
                                <h3>Add Images</h3>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="add-img-button"
                                onChange={handleFileChange}
                            />
                        </div>
                        {tripImages.map((image, index) => (
                            <div className="trip-img" key={index}>
                                <Image
                                    src={`http://frederikgraakjaer.dk/public/trip_img/${image.img}`}
                                    alt={`${image.img}`}
                                    width={200}
                                    height={200}
                                />
                                <div className="delete-img" onClick={() => handleDeleteImage(image.pk_id)}>
                                    <img src="/cross.png" alt="Delete Image" />
                                </div>
                            </div>
                        ))}
                        {newTripImages.map((image, index) => (
                            <Image
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1} of the trip`}
                                width={200}
                                height={200}
                            />
                        ))}
                        <button type="submit" className="updatetrip">
                            Update Trip
                        </button>
                    </form>
                    <button onClick={handleDeleteTrip} className="delete-btn">
                        Delete Trip
                    </button>
                </div>
            </div>
        </div>
    );
}
