
import FilterTrips from '@/components/FilterTrips';

function TripsOverview() {
  const tripList = [
    { id: 1, price: 50 },
    { id: 2, price: 120 },

  ];

  return (
    <div>
      <h1>Trips Overview</h1>
      <FilterTrips tripList={tripList} />
    </div>
  );
}

export default TripsOverview;