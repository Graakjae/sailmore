"use client";
import React, { useState } from "react";

function FilterComponent({ applyFilter, data }) {
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");

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
        (experienceFilter === "all" || item.experience === experienceFilter) &&
        (ageFilter === "all" || item.age === ageFilter)
      );
    });
  }

  function handleApplyFilter() {
    const filteredData = filterData();
    applyFilter(filteredData);
  }

  function resetFilters(e) {
    e.preventDefault();
    if (experienceFilter || ageFilter) {
      setExperienceFilter(null);
      setAgeFilter(null);
      document.querySelector(".filter-form").reset();
    }
  }

  return (
    <div className="filter">
      <form className="filter-form">
        <label>Experience: </label>
        <select
          defaultValue="none"
          value={experienceFilter}
          onChange={function (e) {
            handleExperienceChange(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="no-experience">No Experience</option>
          <option value="inexperience">Inexperienced</option>
          <option value="experienced">Experienced</option>
          <option value="expert">Expert</option>
        </select>

        <label>Age: </label>
        <select
          value={ageFilter}
          onChange={function (e) {
            handleAgeChange(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="55-100">55+</option>
        </select>
        <button onClick={handleApplyFilter}>Search</button>
      </form>
      <button onClick={resetFilters}>Reset filters</button>
    </div>
  );
}

function ParentComponent() {
  const handleFilter = (filteredData) => {
    // Use the filtered data as needed
    console.log(filteredData);
  };

  // Mock data for example
  const data = [];

  return (
    <div>
      <FilterComponent applyFilter={handleFilter} data={data} />
      {/* Render other components */}
    </div>
  );
}

export default ParentComponent;
