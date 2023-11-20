// pages/index.js
"use client";
import { useEffect, useState } from "react";
import getData from "../backend/api/getData"; // Import getData function
import NavigationsBar from "/components/NavigationBar";

function HomePage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Call your API endpoint
        getData()
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <NavigationsBar />
            <h1>User Data:</h1>
            {data.map(user => (
                <div key={user.id}>
                    <p>ID: {user.id}</p>
                    <p>Name: {user.firstname}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default HomePage;
