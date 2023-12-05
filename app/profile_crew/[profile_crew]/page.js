"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import FileInputField from "@/components/inputs/fileInput";
import SimpleButton from "@/components/buttons/SimpleButton";
import SwitchToggle from "@/components/inputs/toggle";

export default function crewProfilePage() {

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCoúntry] = useState("");
  const [exp, setExp] = useState("");
  const [age, setAge] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState();
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const userId = params;

    if (userId) {
      fetchProfile(userId);
    }
  }, [params]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `/backend/phpScripts/getCrewProfile.php/${params.profile_crew}`
      );
      const result = await response.json();
      console.log("result", result);
      setFirstName(result.firstname);
      setLastName(result.lastname);
      setCoúntry(result.country)
      setExp(result.exp);
      setBio(result.bio);
      // Check if the result is an object or an array
      if (typeof result === "object" && result !== null) {
        setProfile(result);
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
      // FormData is used for sending files in a POST request
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("exp", exp);
      formData.append("bio", bio);
      formData.append("profilePicture", profilePicture);
      const response = await fetch(`/backend/phpScripts/updateCrewProfile.php`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Update result:", result);

      setIsEditing(false);
      fetchProfile(params);
    } catch (error) {
      console.error("Error updating profile:", error);
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
            <p>{bio}</p>
          </div>
        <div className="rigthWrapper">
          <Image
            src={`/profilePictures/${profilePicture}`}
            alt="Profile image"
            width={400}
            height={400}
          />
            <div className="infoWrapper">
              <h3>About {firstName}</h3>
              <p>From {country}</p>
              <p>Birthday {formatDate(age)}</p>
              <p>Experience {exp}</p>
            </div>
        </div>
      </div>
      {isEditing ? (
        <div>
          <div className="background"></div>
          <div className="editWrapper">
            <div>
              <TextInputField
                label={"First name"}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInputField
                label={"Last name"}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <div>
                <h3>Bio</h3>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bioInput"
                />
              </div>
              <div>
                <FileInputField
                  label="Profile picture"
                  type="file"
                  onChange={handleProfilePictureChange}
                  button={"Edit picture"}
                />
                {profile.profilePicture &&
                typeof profile.profilePicture === "string" ? (
                  <img
                    className="editProfilePicture"
                    src={
                      previewUrl || `/profilePictures/${profile.profilePicture}`
                    }
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
                <span className="file-name">
                  {profilePicture ? profilePicture.name : ""}
                </span>
              </div>
              <SimpleButton text={"Save"} onClick={handleSaveClick} />
              <Image
                src="/cross.png"
                alt="Close edit"
                width={20}
                height={20}
                className="closeEdit"
                onClick={() => setIsEditing(false)}
              />

              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </div>
  );
}