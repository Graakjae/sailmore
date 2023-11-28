"use client";
import { useState, useEffect } from "react";
import TextInputField from "@/components/inputs/textInputField";
import SimpleButton from "@/components/buttons/SimpleButton";
import { useRouter } from "next/navigation";

export default function EditProfile({ user }) {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(new Date(user.age));
    const router = useRouter();

    const handleUpdateProfile = async () => {
        try {
            // FormData is used for sending files in a POST request
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("age", format(age, "yyyy-dd-MM")); // Format date to match backend expectations

            const response = await fetch("/backend/phpScripts/updateProfile.php", {
                method: "POST",
                body: formData
            });

            const data = await response.text();
            console.log(data); // You can handle the response as needed
            if (data === "Profile updated successfully") {
                console.log("Profile updated successfully");
                router.push("/Profile"); // Redirect to the profile page after updating
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Edit Your Profile</h2>
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
                    <DatePicker className="date" dateFormat="dd/MM/yy" selected={age} onChange={date => setAge(date)} />
                </div>
            </div>
            <SimpleButton text="Update Profile" onClick={handleUpdateProfile} />
        </div>
    );
}
