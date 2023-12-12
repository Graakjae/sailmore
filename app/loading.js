"use client";
import { Oval } from "react-loader-spinner";
import "./styles.css";

export default function Loading() {
    return (
        <div className="loading">
            <Oval
                height={60}
                width={60}
                color="#049DBF"
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#81BBC8"
                strokeWidth={4}
                strokeWidthSecondary={4}
            />
        </div>
    );
}
