import "./inputs.css";

function FileInputField({ label, type, value, onChange }) {
    return (
        <label className="file-input-container">
            <h3>{label}</h3>
            <input type={type} value={value} onChange={onChange} className="file-input" accept=".jpg, .jpeg, .png" />
        </label>
    );
}

export default FileInputField;
