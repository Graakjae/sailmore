"use client";
import Link from "next/link";
import { useAuth } from "../app/authContext";
import { useRouter } from "next/navigation";
import "../styles/NavBar.css";
function NavigationsBar() {
    const { loggedIn, setLoggedIn } = useAuth();
    const router = useRouter();
    const handleSignout = async () => {
        try {
            const response = await fetch("/backend/phpScripts/logout.php");

            if (response.ok) {
                console.log("Logout successful");
                setLoggedIn(false); // Update client-side state
                router.push("/login"); // Redirect to the login page or any other desired page
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className="navBarWrapper">
            <Link href="/">
                <img src="/sailmore_logo.png" alt="Site Logo" />
            </Link>
            <nav className="navLinks">
                <Link className="navLink" href="TripsOverview">
                    Trips
                </Link>
                <Link className="navLink" href="CrewMembers">
                    Travelers
                </Link>
                {loggedIn && (
                    <Link className="navLink" href="TripsOverview">
                        Your Trips
                    </Link>
                )}
                {loggedIn && (
                    <Link className="navLink" href="Applications">
                        Applications
                    </Link>
                )}
                {loggedIn && (
                    <Link className="navLink" href="Profile">
                        Profile
                    </Link>
                )}
                {loggedIn ? null : (
                    <Link className="navLink" href="login">
                        Login
                    </Link>
                )}
                {loggedIn ? null : (
                    <Link className="navLink" href="signup">
                        Signup
                    </Link>
                )}
            </nav>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    );
}
export default NavigationsBar;
