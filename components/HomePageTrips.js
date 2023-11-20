
function Trip({ destination, description, imageSrc }) {
    return (
        <div className="trip">
        <img src={imageSrc} alt={`Trip to ${destination}`} className="trip-image" />
        <div className="trip-details">
            <h3>Southern France to Italy</h3>
            <p>July 30th - Aug. 15th</p>
            <p>51€/day</p>
        </div>
    </div>
    );
}

export default Trip;