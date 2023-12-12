"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import FileInputField from "@/components/inputs/fileInput";
import SimpleButton from "@/components/buttons/SimpleButton";
import { useRouter } from "next/navigation";
import "./style.css";

export default function editCrewProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [exp, setExp] = useState("");
    const [profilePicture, setProfilePicture] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const router = useRouter();
    const [expError, setExpError] = useState(null);

    useEffect(() => {
        const userId = params;

        if (userId) {
            fetchProfile(userId);
        }
    }, [params]);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/backend/phpScripts/getCrewProfile.php/${params.crew}`);
            const result = await response.json();
            console.log("result", result);
            setFirstName(result.firstname);
            setLastName(result.lastname);
            setEmail(result.email);
            setPassword(result.password);
            setCountry(result.country);
            setExp(result.exp);
            setBio(result.bio);
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
            formData.append("password", password);
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

            const response = await fetch(`/backend/phpScripts/updateCrewProfile.php`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Update result:", result);

            fetchProfile(params);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            router.push(`/profile/crew/${params.crew}`);
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
                <div className="background"></div>
                <div className="editWrapper">
                    <div>
                        <div>
                            <FileInputField
                                label="Profile picture"
                                type="file"
                                onChange={handleProfilePictureChange}
                                button={"Edit picture"}
                            />
                            {profilePicture && typeof profilePicture === "string" ? (
                                <img
                                    className="editProfilePicture"
                                    src={previewUrl || `/profilePictures/${profilePicture}`}
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
                            <label htmlFor="exp">Experience</label>
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
                        <div>
                            <h3>Bio</h3>
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
                            <button onClick={() => setShowPasswordFields(true)}>Edit</button>
                        )}
                        <SimpleButton text={"Save"} onClick={handleSaveClick} />
                        <Image
                            src="/cross.png"
                            alt="Close edit"
                            width={20}
                            height={20}
                            className="closeEdit"
                            onClick={() => router.push(`/profile/crew/${params.crew}`)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
