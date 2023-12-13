"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const CrewMemberList = () => {
  const [crewmembers, setCrewmembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/backend/phpScripts/getCrew.php");
      const result = await response.json();
      setCrewmembers(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="crewmember-component">
      <div className="crewmember-list">
        {crewmembers.map((crewmember, index) => (
          <div key={index} className="crewmember-card">
            <Image
              src={`/profilePictures/${crewmember.profilePicture}`}
              alt="Profile image"
              width={150}
              height={150}
              className="crewmember-img"
            />
            <p className="name-and-age">
              {crewmember.firstname} {crewmember.lastname}, {crewmember.age}
            </p>
            <p className="crew-country">{crewmember.country}</p>
            <p className="crew-exp">{crewmember.exp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewMemberList;
