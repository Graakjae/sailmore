import "./inputs.css";

function FileInputField({ label, type, value, onChange, button }) {
    return (
        <label className="file-input-container">
            <div className="fileFlexBox">
                <h3 className="label">{label}</h3>
                <p>{button}</p>
            </div>
            <input type={type} value={value} onChange={onChange} className="file-input" accept=".jpg, .jpeg, .png" />
        </label>
    );
}

export default FileInputField;
