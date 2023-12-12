"use client";
import Link from "next/link";
import { useAuth } from "../../app/authContext";
import "../../styles/NavBar.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import WebNav from "./WebNav";

function NavigationsBar() {
    const { loggedIn, userRole, userId } = useAuth();
    const pathName = usePathname();
    const [burgerMenu, setBurgerMenu] = useState(false);

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
