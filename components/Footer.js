import { usePathname } from "next/navigation";
import { captain, crewmembers, loggedout } from "@/constants/navLinks";
import Link from "next/link";
import { useAuth } from "@/app/authContext";
import "../styles/Footer.css";
function Footer({}) {
    const { loggedIn, userRole, userId } = useAuth();
    let linksToRender;

    if (userRole === "captain") {
        linksToRender = captain(userId);
    } else if (userRole === "crewmember") {
        linksToRender = crewmembers(userId);
    } else {
        linksToRender = loggedout;
    }
    return (
        <footer>
            {linksToRender.map(link => (
                <div>
                    <Link href={`${link.link}`} className="footer-text">
                        {link.text}
                    </Link>
                </div>
            ))}
        </footer>
    );
}
export default Footer;
