"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TextInputField from "@/components/inputs/textInputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import FileInputField from "@/components/inputs/fileInput";
import SimpleButton from "@/components/buttons/SimpleButton";

export default function crewProfilePage() {
  const [crew, setCrew] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [exp, setExp] = useState("");
  const [age, setAge] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const userId = params;

    if (userId) {
      fetchCrewProfile(userId);
    }
  }, [params]);

  const fetchCrewProfile = async () => {
    try {
      const response = await fetch(
        `/backend/phpScripts/getCrewProfile.php/${params.profile_crew}`
      );
      const result = await response.json();
      setFirstName(result.firstname);
      setLastName(result.lastname);
      setBio(result.bio);
      setExp(result.exp);
      // Check if the result is an object or an array
      if (typeof result === "object" && result !== null) {
        setCrew(result);
        console.log("result", result);
        console.log("lastname", lastname);
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
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("bio", bio);
      formData.append("exp", exp);
      formData.append("profilePicture", profilePicture);
      const response = await fetch(
        `/backend/phpScripts/updateCrewProfile.php`,
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      console.log("Update result:", result);

      setIsEditing(false);
      fetchCrewProfile(params);
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
        <div className="leftWrapper">
          <div className="bio">
            <h2>
              {crew.firstname} {crew.lastname}
            </h2>
            <p>{crew.bio}</p>
          </div>
        </div>
        <div className="rigthWrapper">
          <Image
            src={`/profilePictures/${crew.profilePicture}`}
            alt="Profile image"
            width={400}
            height={400}
          />
          <div>
            <div className="infoWrapper">
              <h3>About {crew.firstname}</h3>
              <p>From {crew.country}</p>
              <p>Birthday: {formatDate(crew.age)}</p>
              <p>Experience: {crew.exp}</p>
            </div>
          </div>
        </div>
      </div>
      {isEditing ? (
        <div>
          <div className="background"></div>
          <div className="editWrapper">
            <div>
              <TextInputField
                label={"Firstname"}
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextInputField
                label={"Lastname"}
                type="text"
                value={lastname}
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
                <h3>Experience</h3>
                <textarea
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  className="expInput"
                />
              </div>
              <div>
                <FileInputField
                  label="Profile picture"
                  type="file"
                  onChange={handleProfilePictureChange}
                  button={"Change picture"}
                />
                {crew.profilePicture &&
                typeof crew.profilePicture === "string" ? (
                  <img
                    className="editProfilePicture"
                    src={
                      previewUrl || `/profilePictures/${crew.profilePicture}`
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