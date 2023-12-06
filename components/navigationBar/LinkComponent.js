import Link from "next/link";

function LinkComponent({ text, href, className, onClick }) {
    return (
        <div>
            <Link href={href} className={className} onClick={onClick}>
                {text}
            </Link>
        </div>
    );
}

export default LinkComponent;
