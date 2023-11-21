import "./buttons.css";
function SimpleButton({ text, onClick }) {
    return (
        <div className="buttonCenter">
            <button onClick={onClick} className="simp-btn">
                {text}
            </button>
        </div>
    );
}

export default SimpleButton;
