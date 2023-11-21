"use client";
import React, { useState } from 'react';

const FilterComponent = ({ applyFilter }) => {
  const [priceRange, setPriceRange] = useState('');
  const [durationRange, setDurationRange] = useState('');

  const handleFilterClick = () => {
    // You can pass the selected filters to the parent component or perform filtering logic here
    applyFilter({ price: priceRange, duration: durationRange });
  };

  return (
    <div>
      <button onClick={handleFilterClick}>Apply Filter</button>
      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
        <option value="">Select Price Range</option>
        <option value="1-20">$1 - $20</option>
        <option value="21-50">$21 - $50</option>
        <option value="51-100">$51 - $100</option>
      </select>
      <select value={durationRange} onChange={(e) => setDurationRange(e.target.value)}>
        <option value="">Select Duration Range</option>
        <option value="1-7">1 - 7 days</option>
        <option value="8-30">8 - 30 days</option>
        <option value="31-60">31 - 60 days</option>
      </select>
    </div>
  );
};

// Example parent component using FilterComponent
const App = () => {
  const handleFilter = (filters) => {
    // Implement filtering logic based on selected filters
    console.log('Applying filter:', filters);
    // You can update state or perform other actions based on the selected filters
  };

  return (
    <div>
      <FilterComponent applyFilter={handleFilter} />
      {/* Render other components */}
    </div>
  );
};

export default App;