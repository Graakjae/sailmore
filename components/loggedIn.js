// Any component
import { useAuth } from "../app/authContext";

const LoggedIn = () => {
    const { loggedIn, setLoggedIn } = useAuth();

    // Use loggedIn and setLoggedIn as needed

    return <div>{loggedIn ? "Logged In" : "Not Logged In"}</div>;
};

export default LoggedIn;
