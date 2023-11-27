"use client";
import Link from "next/link";
import { useAuth } from "../../app/authContext";
import "../../styles/NavBar.css";
import SignOut from "../SignOut";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";
import LinkComponent from "./LinkComponent";

function BurgerMenu({ loggedIn, burgerMenu, setBurgerMenu, userRole }) {
    const pathName = usePathname();

    return (
        <div>
            <div className={`${burgerMenu ? "burgerMenuOpen" : "burgerMenu"}`}>
                <div className="burgerInside">
                    {userRole === "crewmember" &&
                        crewmembers.map((link, index) => (
                            <LinkComponent text={link.text} href={`${link.link}`} className={`navLink`} key={index} />
                        ))}
                    {userRole === "captain" &&
                        captain.map((link, index) => (
                            <LinkComponent text={link.text} href={`${link.link}`} className={`navLink`} key={index} />
                        ))}
                    {!loggedIn &&
                        userRole === "none" &&
                        loggedout.map((link, index) => (
                            <LinkComponent text={link.text} href={`${link.link}`} className={`navLink`} key={index} />
                        ))}
                    {loggedIn && <SignOut />}
                </div>
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
