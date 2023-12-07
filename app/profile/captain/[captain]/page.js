"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function captainProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [exp, setExp] = useState("");
  const [age, setAge] = useState(new Date());
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
  const [trips, setTrips] = useState([]);
  const params = useParams();

  useEffect(() => {
    const userId = params;

    if (userId) {
      fetchProfile(userId);
      fetchProfileTrips(userId);
    }
  }, [params]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `/backend/phpScripts/getCaptainProfile.php/${params.captain}`
      );
      const result = await response.json();
      console.log("result", result);
      setFirstName(result.firstname);
      setLastName(result.lastname);
      setEmail(result.email);
      setCountry(result.country);
      setExp(result.exp);
      setBio(result.bio);
      setProfilePicture(result.profilePicture);
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

  const fetchProfileTrips = async () => {
    try {
      const response = await fetch(
        `/backend/phpScripts/profileTrips.php/${params.captain}`
      );
      const result = await response.json();
      console.log("result trips", result);

      // Check if the result is an object or an array
      if (Array.isArray(result)) {
        setTrips(result);
      } else {
        console.error("Unexpected data format for trips:", result);
      }
    } catch (error) {
      console.error("Error fetching trips data:", error);
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", day: "2-digit", month: "2-digit" };
    return new Intl.DateTimeFormat("de", options).format(age);
  };

  return (
    <div className="height">
      <div className="flexBox">
        <div className="bio">
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
        <div className="rigthWrapper">
          <Image
            src={`/profilePictures/${profilePicture}`}
            alt="Profile image"
            width={400}
            height={400}
          />
          <div className="infoWrapper">
            <h3>
              {firstName}, {formatDate(age)}
            </h3>
            <p>From {country}</p>
            <p>{exp}</p>
            <p>{bio}</p>
          </div>
        </div>
      </div>
      <div className="infoWrapper">
        <h3>Boat</h3>
        <p>
          {brand} {model}
        </p>
        <p>Year {year}</p>
        <p>Length: {length} feet</p>
      </div>
      <Link href={`/profile/captain/${params.captain}/edit`}>
        <button>Edit</button>
      </Link>
      <div>
        <h3>Trips</h3>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip.trip_id}>
              <div>
                <h5>Images</h5>
                {trip.images.length > 0 ? (
                  <Image
                    src={`/trip_img/${trip.images[0]}`}
                    alt={`Image of ${trip.title}`}
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No images for this trip</p>
                )}
              </div>
              <h4>{trip.title}</h4>
              <p>Start Date: {trip.start_date}</p>
              <p>End Date: {trip.end_date}</p>
              <p>Price: {trip.price}</p>
            </div>
          ))
        ) : (
          <p>No trips found</p>
        )}
      </div>
    </div>
  );
}
