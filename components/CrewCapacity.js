export default function CrewCapacity({capacity}) {
    const crewBoxStyle = {
        border: '1px solid #000',
        padding: '10px',
        margin: '10px',
        backgroundColor: '#f0f0f0',
    };

    return (
        <div>
            <div style={crewBoxStyle}>
                <p>{capacity}</p>
            </div>
        </div>
    );
}