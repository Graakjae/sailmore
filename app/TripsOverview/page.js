import TripCard from "../../components/TripCard";
import FilterTrips from "../../components/FilterTrips";
import "./tripsoverview.css";

export default function TripsOverview() {
    return (
        <div>
            <FilterTrips />
            <TripCard />
        </div>
    )
}