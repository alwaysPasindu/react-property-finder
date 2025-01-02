import React, { useState } from "react";
import "./SearchForm.css"; // Import the CSS file

const SearchForm = ({ onSearch }) => {
  const [criteria, setCriteria] = useState({
    type: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    postcode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label>Type:</label>
      <select name="type" onChange={handleInputChange}>
        <option value="">Any</option>
        <option value="House">House</option>
        <option value="Flat">Flat</option>
      </select>

      <label>Price Range:</label>
      <div>
        <input
          type="number"
          name="minPrice"
          placeholder="Min"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max"
          onChange={handleInputChange}
        />
      </div>

      <label>Bedrooms:</label>
      <div>
        <input
          type="number"
          name="minBedrooms"
          placeholder="Min"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="maxBedrooms"
          placeholder="Max"
          onChange={handleInputChange}
        />
      </div>

      <label>Postcode:</label>
      <input
        type="text"
        name="postcode"
        placeholder="NW1"
        onChange={handleInputChange}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
