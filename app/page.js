// pages/index.js
"use client";
import { useEffect, useState } from "react";
import getData from "../backend/api/getData"; // Import getData function
import NavigationsBar from "/components/NavigationBar";
import Footer from "/components/Footer";
import HomePageHeader from "/components/HomePageHeader";
import HomePageTrips from "/components/HomePageTrips";


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
            <br></br>
            <HomePageHeader />
            <br></br>
            <HomePageTrips />
            <br></br>
            <Footer />
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
