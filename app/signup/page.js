"use client";
import { useState } from "react";
import "../login/login.css";
import "./signup.css";
import SimpleButton from "@/components/buttons/SimpleButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { format, compareAsc } from "date-fns";
import TextInputField from "@/components/inputs/textInputField";
import FileInputField from "@/components/inputs/fileInput";
import { useRouter } from "next/navigation";

export default function signUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const router = useRouter();

    const handleSignup = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("age", format(age, "yyyy-dd-MM")); // Format date to match backend expectations
            formData.append("profilePicture", profilePicture);

            const response = await fetch("/backend/phpScripts/signup.php", {
                method: "POST",
                body: formData
            });

            const data = await response.text();
            console.log(data); // You can handle the response as needed
            if (data === "User registered successfully") {
                console.log("User signed up successfully");
                router.push("/Profile");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleProfilePictureChange = e => {
        const selectedFile = e.target.files[0];

        setProfilePicture(selectedFile);

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
                            <DatePicker dateFormat="dd/MM/yy" selected={age} onChange={date => setAge(date)} />
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
                        <FileInputField label="Profile picture" type="file" onChange={handleProfilePictureChange} />
                        <img
                            className="profilePicture"
                            src={profilePicture ? URL.createObjectURL(profilePicture) : "/defaultProfilePicture.png"}
                            alt="Profile picture"
                        />
                    </div>
                    <SimpleButton text="Create account" onClick={handleSignup} />
                </div>
            </div>
        </div>
    );
}
