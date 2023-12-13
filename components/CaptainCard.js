"use client";

const CaptainCard = ({
    profilePicture,
    firstname,
    lastname,
    age,
    brand,
    model,
    year,
    length,
    toilet,
    shower,
    kitchen,
    gps,
    wifi,
    power,
    outlets
}) => {
    return (
        <div className="trip-card">
            <img src={`/profilePictures/${profilePicture}`} className="captain-img" />
            <p>
                {firstname} {lastname}, {age}
            </p>
            <div className="boat-info">
                <h2>The captains boat</h2>
                <p>
                    {brand} {model}
                </p>
                <p>Year {year}</p>
                <p>{length} feet</p>
                <p>Toilets: {toilet}</p>
                <p>Showers: {shower}</p>
                <p>Kitchen: {kitchen}</p>
                <p>GPS: {gps}</p>
                <p>Wi-Fi: {wifi}</p>
                <p>Power: {power}</p>
                <p>Outlets: {outlets}</p>
            </div>
        </div>
    );
};

export default CaptainCard;
