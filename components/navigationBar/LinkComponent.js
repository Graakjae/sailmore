import Link from "next/link";

function LinkComponent({ text, href, className, customkey }) {
    return (
        <div customkey={customkey}>
            <Link href={href} className={className}>
                {text}
            </Link>
        </div>
    );
}

export default LinkComponent;
