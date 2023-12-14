"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { CalculateAge } from "components/CalculateAge";
import "./crew-profile.css";
import { useAuth } from "@/app/authContext";
import SignOut from "@/components/SignOut";

export default function CrewProfilePage() {
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
                <div className="left-wrapper">
                    <h2 className="section-title">
                        {firstName} {lastName}
                    </h2>
                    <Image
                        priority
                        src={`/profilePictures/${profilePicture}`}
                        alt="Profile image"
                        width={400}
                        height={400}
                        className="profilePicture-mobile"
                    />
                    <p className="bio">{bio}</p>
                </div>
                    <div className="infoContainer-mobile">
                        <div className="infoWrapper">
                            <h3 className="section-title">About {firstName}</h3>
                            <p>{CalculateAge(age)} years old</p>
                            <p>From {country}</p>
                            <p>{exp}</p>
                        </div>
                    </div>
                    <div className="buttonWrapper-mobile">
                                <Link href={`/profile/captain/${params.captain}/edit`}>
                                    <button>Edit profile</button>
                                </Link>
                            </div>  
                <div className="signout-div-mobile">
                    {authId === params.captain && <SignOut />}
                </div>
                <div className="right-wrapper">
                    <Image
                        className="profilePicture"
                        src={`/profilePictures/${profilePicture}`}
                        alt="Profile image"
                        width={400}
                        height={400}
                        priority
                    />
                    <div className="infoContainer">
                        <div className="infoWrapper">
                        <h3 className="section-title">About {firstName}</h3>
                            <p>{CalculateAge(age)} years old</p>
                            <p>From {country}</p>
                            <p>{exp}</p>
                            <div className="buttonWrapper">
                                <Link href={`/profile/crew/${params.crew}/edit`}>
                                    <button>Edit profile</button>
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
