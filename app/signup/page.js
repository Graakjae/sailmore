"use client";
import { useState } from "react";
import "../login/login.css";
import "./signup.css";
import SimpleButton from "@/components/buttons/SimpleButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import TextInputField from "@/components/inputs/textInputField";
import FileInputField from "@/components/inputs/fileInput";
import { useRouter } from "next/navigation";
import { useAuth } from "../authContext";

export default function signUp() {
  const [exp, setExp] = useState("none");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("none");
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useAuth();
  const [expError, setExpError] = useState(null);

  const isFormValid = () => {
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      passwordConfirmation.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      password === passwordConfirmation
    );
  };

  const handleSignup = async () => {
    try {
      if (role === "none") {
        setError("Please select a role.");
        return;
      }
      if (exp === "none") {
        setExpError("Please select experience.");
        return;
      }

      if (!isFormValid()) {
        setError("Please fill out all fields and ensure passwords match.");
        return;
      }

      setError(null); // Clear previous error messages

      // FormData is used for sending files in a POST request
      const formData = new FormData();
      formData.append("exp", exp);
      formData.append("country", country);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("age", format(age, "yyyy-MM-dd"));
      formData.append("profilePicture", profilePicture);
      formData.append("role", role);

      const response = await fetch("/backend/phpScripts/signup.php", {
        method: "POST",
        body: formData,
      });

            const data = await response.text();
            console.log(data); // You can handle the response as needed
            if (data === "User registered successfully") {
                console.log("User signed up successfully");
                setLoggedIn(true);
                router.push("/");
            } else {
                setError(data); // Display error message if signup fails
            }
        } catch (error) {
            console.error("Error:", error);
            setError("An unexpected error occurred.");
        }
    };

  const handleProfilePictureChange = (e) => {
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
        <div className="flexBox">
            <div className="signupWrapper">
                <div>
                    <h2>Sign up here</h2>

                    <div className="grid">
                        <TextInputField
                            label="First name"
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <TextInputField
                            label="Last name"
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                        <div>
                            <h3>Date of birth</h3>
                            <DatePicker
                                className="date"
                                dateFormat="dd/MM/yy"
                                selected={age}
                                onChange={date => setAge(date)}
                            />
                        </div>
                        <TextInputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextInputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <TextInputField
                            label="Confirm Password"
                            type="password"
                            value={passwordConfirmation}
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        <TextInputField
                            label="Country"
                            type="country"
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
                        <div>
                            <h3 htmlFor="role" className="select">
                                Select Role:
                            </h3>
                            <select id="role" defaultValue="none" onChange={e => setRole(e.target.value)}>
                                <option value="none" disabled hidden>
                                    Select a role
                                </option>
                                <option value="captains">Captain</option>
                                <option value="crewmember">Crew</option>
                            </select>
                        </div>
                    </div>
                    <div className="flexBox">
                        <div>
                            <FileInputField label="Profile picture" type="file" onChange={handleProfilePictureChange} />
                            <img
                                className="profilePicture"
                                src={
                                    profilePicture
                                        ? URL.createObjectURL(profilePicture)
                                        : "/profilePictures/defaultProfilePicture.png"
                                }
                                alt="Profile picture"
                            />
                            <span className="file-name">{profilePicture ? profilePicture.name : ""}</span>
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <SimpleButton text="Create account" onClick={handleSignup} />
                </div>
            </div>
        </div>
    );
}
