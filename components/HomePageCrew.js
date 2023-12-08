"use client";
import React, { useState, useEffect } from "react";

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
    <div>
      <h1>Crew Member List</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {crewmembers.slice(0, 8).map((crewmember, index) => (
          <div
            key={index}
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <p>
              <strong>First Name: </strong> {crewmember.firstname}
            </p>
            <p>
              <strong>Age: </strong> {crewmember.age}
            </p>
            <p>
              <strong>Experience: </strong> {crewmember.exp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewMemberList;
