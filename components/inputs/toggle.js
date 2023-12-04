"use client";
import Switch from "@mui/material/Switch";
import "./inputs.css";
import { useState } from "react";
function SwitchToggle({ text, onChange, value }) {
    return (
        <div className="">
            <label>{text}</label>
            <Switch onChange={onChange} checked={value} />
        </div>
    );
}

export default SwitchToggle;
