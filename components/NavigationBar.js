"use client";
import { useAuth } from "../app/authContext";
import { useRouter } from "next/navigation";

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
        <div>
            <img src="/sailmore_logo.png" alt="Site Logo" />
            <nav>
                <ul>
                    <li>
                        <a href="TripsOverview">Trips</a>
                    </li>
                    <li>
                        <a href="CrewMembers">Travelers</a>
                    </li>
                    <li>
                        <a href="Profile">Profile</a>
                    </li>
                    <li>
                        <a href="login">Login</a>
                    </li>
                    <li>
                        <a href="signup">Signup</a>
                    </li>
                </ul>
            </nav>
            <button onClick={handleSignout}>Sign Out</button>
        </div>
    );
}
export default NavigationsBar;
