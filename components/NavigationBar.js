"use client";
import Link from "next/link";
import { useAuth } from "../app/authContext";
import "../styles/NavBar.css";
import SignOut from "./SignOut";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function NavigationsBar() {
    const { loggedIn, setLoggedIn } = useAuth();
    const pathName = usePathname();
    return (
        <div className="navBarWrapper">
            <Link href="/">
                <img
                    src={`${pathName === "/" ? "/sailmore_logo.png" : "/sailmore_logo_sort.png"}`}
                    alt="Site Logo"
                    className="logo"
                />
            </Link>
            <nav className="navLinks">
                <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="TripsOverview">
                    Trips
                </Link>
                <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="CrewMembers">
                    Travelers
                </Link>
                {loggedIn && (
                    <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="TripsOverview">
                        Your Trips
                    </Link>
                )}
                {loggedIn && (
                    <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="Applications">
                        Applications
                    </Link>
                )}
                {loggedIn && (
                    <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="Profile">
                        Profile
                    </Link>
                )}
                {loggedIn && <SignOut />}
                {loggedIn ? null : (
                    <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="login">
                        Login
                    </Link>
                )}
                {loggedIn ? null : (
                    <Link className={`${pathName === "/" ? "navLink" : "navLink2"}`} href="signup">
                        Signup
                    </Link>
                )}
            </nav>
        </div>
    );
}
export default NavigationsBar;
