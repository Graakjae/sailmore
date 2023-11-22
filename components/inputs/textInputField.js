import "./inputs.css";

function TextInputField({ label, type, value, onChange }) {
    return (
        <div>
            <h3>{label}</h3>
            <input className="textInput" type={type} value={value} onChange={onChange} />
        </div>
    );
}

export default TextInputField;
