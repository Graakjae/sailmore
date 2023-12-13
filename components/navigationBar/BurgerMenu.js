"use client";
import "../../styles/NavBar.css";
import SignOut from "../SignOut";
import { usePathname } from "next/navigation";
import Hamburger from "hamburger-react";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";
import LinkComponent from "./LinkComponent";

function BurgerMenu({ loggedIn, burgerMenu, setBurgerMenu, userRole, userId }) {
    const pathName = usePathname();

    let linksToRender;

    if (userRole === "captain") {
        linksToRender = captain(userId);
    } else if (userRole === "crewmember") {
        linksToRender = crewmembers(userId);
    } else {
        linksToRender = loggedout;
    }

    return (
        <div className="absolute">
            <div className={`${burgerMenu ? "burgerMenuOpen" : "burgerMenu"}`}>
                {linksToRender.map((link, index) => (
                    <LinkComponent
                        text={link.text}
                        href={`${link.link}`}
                        className={`burgerMenuLinks`}
                        key={index}
                        onClick={() => setBurgerMenu(false)}
                    />
                ))}
            </div>
            <div
                onClick={() => setBurgerMenu(!burgerMenu)}
                className={`${burgerMenu ? "burgerMenuOpenBg" : "burgerMenu"}`}
            ></div>
            <div className="burgerMenuIcon">
                <Hamburger
                    toggled={burgerMenu}
                    toggle={() => setBurgerMenu(!burgerMenu)}
                    rounded
                    color={burgerMenu || pathName === "/" ? "white" : "black"}
                />
            </div>
        </div>
    );
}
export default BurgerMenu;
