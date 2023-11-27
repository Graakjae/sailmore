import Link from "next/link";
import "../../styles/NavBar.css";
import { usePathname } from "next/navigation";
import LinkComponent from "./LinkComponent";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";

function NavigationsBar({ loggedIn, setLoggedIn, userRole }) {
    const pathName = usePathname();

    return (
        <nav className="navLinks">
            {userRole === "captain" &&
                captain.map((link, index) => (
                    <LinkComponent
                        text={link.text}
                        href={link.link}
                        className={`${pathName === "/" ? "navLink" : "navLink2"}`}
                        customkey={index}
                    />
                ))}
            {userRole === "crewmember" &&
                crewmembers.map((link, index) => (
                    <LinkComponent
                        text={link.text}
                        href={link.link}
                        className={`${pathName === "/" ? "navLink" : "navLink2"}`}
                        key={index}
                    />
                ))}
            {userRole === "none" &&
                !loggedIn &&
                loggedout.map((link, index) => (
                    <LinkComponent
                        text={link.text}
                        href={link.link}
                        className={`${pathName === "/" ? "navLink" : "navLink2"}`}
                        key={index}
                    />
                ))}
        </nav>
    );
}
export default NavigationsBar;
