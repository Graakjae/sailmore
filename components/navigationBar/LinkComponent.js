import Link from "next/link";

function LinkComponent({ text, href, className }) {
    return (
        <div>
            <Link href={href} className={className}>
                {text}
            </Link>
        </div>
    );
}

export default LinkComponent;
