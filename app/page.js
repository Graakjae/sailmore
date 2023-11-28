// pages/index.js
"use client";
import "./styles.css";
import Image from "next/image";
import Footer from "/components/Footer";
import HomePageHeader from "/components/HomePageHeader";
import HomePageTrips from "/components/HomePageTrips";
import LoggedIn from "@/components/loggedIn";
import HomePageCrew from "@/components/HomePageCrew";
import ExploreTripsButton from "@/components/buttons/ExploreTripsButton";
import MoreCrewMembersButton from "@/components/buttons/MoreCrewMembersButton";
function HomePage() {
    return (
        <div>
            <Image src="/Båd_billede.png" alt="Site Logo" className="backgroundImage" width={1000} height={1000} />
            <LoggedIn />
            <br></br>
            <HomePageHeader />
            <br></br>
            <HomePageTrips />
            <br></br>
            <ExploreTripsButton />
            <br></br>
            <HomePageCrew />
            <br></br>
            <MoreCrewMembersButton />
            <br></br>
            <Footer />
        </div>
    );
}
export default HomePage;
