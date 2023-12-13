"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { calculateAge } from "components/calculateAge";
import "./crew-profile.css";
import { useAuth } from "@/app/authContext";
import SignOut from "@/components/SignOut";
export default function crewProfilePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [exp, setExp] = useState("");
    const [age, setAge] = useState(new Date());
    const [profilePicture, setProfilePicture] = useState("defaultProfilePicture.png");
    const params = useParams();
    const authId = useAuth().userId;
    console.log("params", params);
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
            setCountry(result.country);
            setExp(result.exp);
            setAge(new Date(result.age));
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

    return (
        <div className="height">
            <div className="flexBox">
                <div className="bio">
                    <h2>
                        {firstName} {lastName}
                    </h2>
                    <p>{bio}</p>
                </div>
                <div className="rightWrapper">
                    <Image
                        src={`/profilePictures/${profilePicture}`}
                        alt="Profile image"
                        width={400}
                        height={400}
                        priority
                    />
                    <div className="infoContainer">
                        <div className="infoWrapper">
                            <h3>
                                {firstName}, {calculateAge(age)}
                            </h3>
                            <p>From: {country}</p>
                            <p>Experience: {exp}</p>
                            <div className="buttonWrapper">
                                <Link href={`/profile/crew/${params.crew}/edit`}>
                                    <button>Edit</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {authId === params.crew && <SignOut />}
        </div>
    );
}
