"use client";
import Link from "next/link";
import { useAuth } from "../../app/authContext";
import "../../styles/NavBar.css";
import SignOut from "../SignOut";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Hamburger from "hamburger-react";
import BurgerMenu from "./BurgerMenu";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";
import WebNav from "./WebNav";

function NavigationsBar() {
    const { loggedIn, setLoggedIn } = useAuth();
    const pathName = usePathname();
    const [burgerMenu, setBurgerMenu] = useState(false);
    const [userRole, setUserRole] = useState("none");
    console.log(userRole);
    console.log(loggedIn);

    useEffect(() => {
        if (loggedIn) {
            fetch("/backend/phpScripts/checkRole.php")
                .then(response => response.json())
                .then(data => setUserRole(data.role))
                .catch(error => console.error("Error fetching user role:", error));
        }
        if (!loggedIn) {
            setUserRole("none");
        }
    }, [loggedIn]);

    return (
        <div className="navWrapper">
            <Link href="/">
                <img
                    src={`${pathName === "/" ? "/sailmore_logo.png" : "/sailmore_logo_sort.png"}`}
                    alt="Site Logo"
                    className="logo"
                />
            </Link>
            <BurgerMenu loggedIn={loggedIn} burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} userRole={userRole} />
            <WebNav loggedIn={loggedIn} userRole={userRole} />
        </div>
    );
}
export default NavigationsBar;
