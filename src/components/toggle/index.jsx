import React from "react";
import "./toggle.css"

const Toggle = ({ className = "", label = "", icon, readOnly, disabled = false, value = false, onChange = () => {} }) => (
    <div
        className={`CustomToggle${disabled ? " disabled" : ""}${className ? ` ${className}` : ""}`}
        onClick={() => {
            if (!disabled && !readOnly) {
                onChange();
            }
        }}
    >
        <div className="CustomToggle Box">
            <input type="checkbox" className="CustomToggle Box togglebox py-2" readOnly checked={value} />
            <span className={`${value ? "CustomToggle Box checkmarked" : "CustomToggle Box checkmark"}`} />
        </div>
        {icon && <img className="ml-10" style={{ width: "22px", height: "22px" }} src={icon} />}
        {label !== "" && <label className={`CustomToggle label ${value ? " highlight" : ""}`}>{label}</label>}
    </div>
);

export default Toggle;
