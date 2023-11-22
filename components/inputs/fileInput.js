import "./inputs.css";

function FileInputField({ label, type, value, onChange }) {
    return (
        <div>
            <h3>{label}</h3>
            <input type={type} value={value} onChange={onChange} />
        </div>
    );
}

export default FileInputField;
