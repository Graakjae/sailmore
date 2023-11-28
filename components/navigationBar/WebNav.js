import Link from "next/link";
import "../../styles/NavBar.css";
import { usePathname } from "next/navigation";
import LinkComponent from "./LinkComponent";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";

function NavigationsBar({ loggedIn, setLoggedIn, userRole, userId }) {
    const pathName = usePathname();

    let linksToRender;

    if (userRole === "captain") {
        linksToRender = captain(userId);
    } else if (userRole === "crewmember") {
        linksToRender = crewmembers;
    } else {
        linksToRender = loggedout;
    }

    return (
        <nav className="navLinks">
            {linksToRender.map((link, index) => (
                <LinkComponent
                    text={link.text}
                    href={`${link.link}`}
                    className={`${pathName === "/" ? "navLink" : "navLink2"}`}
                    key={index}
                />
            ))}
        </nav>
    );
}
export default NavigationsBar;
