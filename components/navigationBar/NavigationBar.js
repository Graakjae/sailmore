"use client";
import Link from "next/link";
import { useAuth } from "../../app/authContext";
import "../../styles/NavBar.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import WebNav from "./WebNav";

function NavigationsBar() {
    const { loggedIn, setLoggedIn } = useAuth();
    const pathName = usePathname();
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [userRole, setUserRole] = useState("none");
    const [userId, setUserId] = useState(null);
    console.log(userRole);
    console.log(loggedIn);
    console.log(userId);

    useEffect(() => {
        if (loggedIn) {
            fetch("/backend/phpScripts/checkRole.php")
                .then(response => response.json())
                .then(data => {
                    setUserRole(data.role);
                    setUserId(data.userId); // Assuming your response includes a field named userId
                })
                .catch(error => console.error("Error fetching user role and ID:", error));
        }
        if (!loggedIn) {
            setUserRole("none");
            setUserId(null);
        }
    }, [loggedIn]);

    return (
        <div className={`${pathName === "/" ? "navWrapper" : "navWrapperBorderBottom"}`}>
            <Link href="/">
                <img
                    src={`${pathName === "/" ? "/sailmore_logo.png" : "/sailmore_logo_sort.png"}`}
                    alt="Site Logo"
                    className="logo"
                />
            </Link>
            <BurgerMenu
                loggedIn={loggedIn}
                burgerMenu={burgerMenu}
                setBurgerMenu={setBurgerMenu}
                userRole={userRole}
                userId={userId}
            />
            <WebNav loggedIn={loggedIn} userRole={userRole} userId={userId} />
        </div>
    );
}
export default NavigationsBar;
