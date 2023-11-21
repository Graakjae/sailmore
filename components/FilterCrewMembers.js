"use client";
import React, { useState } from 'react';

function FilterComponent({ applyFilter, data }) {
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');

  function handleExperienceChange(value) {
    setExperienceFilter(value);
  }

  function handleAgeChange(value) {
    setAgeFilter(value);
  }

  function filterData() {
    if (!data) {
      return [];
    }

    return data.filter(function (item) {
      return (
        (experienceFilter === 'all' || item.experience === experienceFilter) &&
        (ageFilter === 'all' || item.age === ageFilter)
      );
    });
  }

  function handleApplyFilter() {
    const filteredData = filterData();
    applyFilter(filteredData);
  }

  return (
    <div>
      <button onClick={handleApplyFilter}>Apply</button>

      <label>
        Experience:
        <select value={experienceFilter} onChange={function (e) { handleExperienceChange(e.target.value); }}>
          <option value="all">All</option>
          <option value="noExperience">No Experience</option>
          <option value="inexperience">Inexperienced</option>
          <option value="experienced">Experienced</option>
        </select>
      </label>

      <label>
        Age:
        <select value={ageFilter} onChange={function (e) { handleAgeChange(e.target.value); }}>
          <option value="all">All</option>
          {/* Add more age options as needed */}
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          {/* Add more age options as needed */}
        </select>
      </label>
    </div>
  );
}

function ParentComponent() {
  const handleFilter = (filteredData) => {
    // Use the filtered data as needed
    console.log(filteredData);
  };

  // Mock data for example
  const data = [
    { name: 'John', experience: 'experienced', age: '26-35' },
    { name: 'Jane', experience: 'inexperienced', age: '18-25' },
    // Add more data as needed
  ];

  return (
    <div>
      <FilterComponent applyFilter={handleFilter} data={data} />
      {/* Render other components */}
    </div>
  );
}

export default ParentComponent;