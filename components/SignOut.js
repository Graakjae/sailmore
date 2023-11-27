import { useAuth } from "@/app/authContext";
import { useRouter } from "next/navigation";
function SignOut() {
    const { setLoggedIn } = useAuth();
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
    return <button onClick={handleSignout}>Sign Out</button>;
}
export default SignOut;