"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import FileInputField from "@/components/inputs/fileInput";
import SimpleButton from "@/components/buttons/SimpleButton";
import SwitchToggle from "@/components/inputs/toggle";
import { useRouter } from "next/navigation";
import "./style.css";
export default function editCaptainProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [exp, setExp] = useState("");
    const [expError, setExpError] = useState(null);
    const [profilePicture, setProfilePicture] = useState();
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
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const userId = params;

        if (userId) {
            fetchProfile(userId);
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
            setPassword(result.password);
            setCountry(result.country);
            setExp(result.exp);
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
            setProfilePicture(result.profilePicture);
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

    const handleSaveClick = async () => {
        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("bio", bio);
            formData.append("country", country);
            formData.append("exp", exp);
            formData.append("profilePicture", profilePicture);
            // Check if password fields are not empty and match before appending
            if (password !== "" && passwordConfirmation !== "") {
                if (password !== passwordConfirmation) {
                    setError("Passwords do not match.");
                    return;
                } else {
                    formData.append("password", password);
                    formData.append("passwordConfirmation", passwordConfirmation);
                }
            }

            const response = await fetch(`/backend/phpScripts/updateCaptainProfile.php`, {
                method: "POST",
                body: formData
            });

            const result = await response.text();
            console.log("Update result:", result);

            fetchProfile(params);
        } catch (error) {
            console.error("Error updating profile:", error);
        }

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

            fetchProfile(params);
        } catch (error) {
            console.error("Error updating boat:", error);
        } finally {
            router.push(`/profile/captain/${params.captain}`);
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

    return (
        <div>
            <div>
                <div className="edit-profile-section">
                    <div className="profilesection">
                        <div className="profilepicture">
                            <FileInputField label="Profile picture" type="file" onChange={handleProfilePictureChange} />
                            {profilePicture ? (
                                <Image
                                    className="editProfilePicture"
                                    src={previewUrl || `/profilePictures/${profilePicture}`}
                                    alt="Profile picture"
                                    width={300}
                                    height={300}
                                />
                            ) : (
                                <Image
                                    className="editProfilePicture"
                                    src={previewUrl || "/profilePictures/defaultProfilePicture.png"}
                                    alt="Profile picture"
                                    width={300}
                                    height={300}
                                />
                            )}
                            <br />
                            <span className="file-name">{profilePicture ? profilePicture.name : ""}</span>
                        </div>
                        <TextInputField
                            label={"First name"}
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <TextInputField
                            label={"Last name"}
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        <TextInputField
                            label={"Country"}
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                        <div>
                            <h3 htmlFor="exp">Experience</h3>
                            <select
                                defaultValue="none"
                                id="exp"
                                onChange={e => {
                                    setExp(e.target.value);
                                    setExpError(null); // Clear experience error when a new option is selected
                                }}
                            >
                                <option value="none" disabled hidden>
                                    Select Experience
                                </option>
                                <option value="No experience">No Experience</option>
                                <option value="Inexperienced sailor">Inexperienced sailor</option>
                                <option value="Experienced sailor">Experienced sailor</option>
                                <option value="Expert sailor">Expert sailor</option>
                            </select>
                            {expError && <p className="error-message">{expError}</p>}
                        </div>

                        <div className="bio-section">
                            <h3 className="biotext">Bio</h3>
                            <textarea value={bio} onChange={e => setBio(e.target.value)} className="bioInput" />
                        </div>
                        <TextInputField
                            label={"E-mail"}
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {showPasswordFields ? (
                            <div className="password-fields">
                                <TextInputField
                                    label={"Password"}
                                    type="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <TextInputField
                                    label="Confirm Password"
                                    type="password"
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                />
                            </div>
                        ) : (
                            <button className="change-password-button" onClick={() => setShowPasswordFields(true)}>
                                Change password
                            </button>
                        )}
                    </div>
                    <div className="boat-edit-section">
                        <h3>Boat info: </h3>
                        <TextInputField
                            label={"Boat brand"}
                            type="text"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />
                        <TextInputField
                            label={"Model"}
                            type="text"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                        <TextInputField
                            label={"Year"}
                            type="number"
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                        <TextInputField
                            label={"Length"}
                            type="number"
                            value={length}
                            onChange={e => setLength(e.target.value)}
                        />
                        <TextInputField
                            label={"Toilet"}
                            type="number"
                            value={toilet}
                            onChange={e => setToilet(e.target.value)}
                        />
                        <div className="togglebutton">
                            <SwitchToggle text={"GPS"} onChange={() => setGPS(!GPS)} value={GPS} />
                            <SwitchToggle text={"Shower"} onChange={() => setShower(!shower)} value={shower} />
                            <SwitchToggle text={"Kitchen"} onChange={() => setKitchen(!kitchen)} value={kitchen} />
                            <SwitchToggle text={"Wifi"} onChange={() => setWifi(!wifi)} value={wifi} />
                            <SwitchToggle text={"Power"} onChange={() => setPower(!power)} value={power} />
                        </div>
                        <SimpleButton text={"Save"} onClick={handleSaveClick} />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
