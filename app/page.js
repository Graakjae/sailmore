// pages/index.js
"use client";
import NavigationsBar from "/components/NavigationBar";
import Footer from "/components/Footer";
import HomePageHeader from "/components/HomePageHeader";
import HomePageTrips from "/components/HomePageTrips";
import LoggedIn from "@/components/loggedIn";

function HomePage() {
    return (
        <div>
            <NavigationsBar />
            <LoggedIn />
            <br></br>
            <HomePageHeader />
            <br></br>
            <HomePageTrips />
            <br></br>
            <Footer />
        </div>
    );
}
export default HomePage;
