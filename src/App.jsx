import React, { useState } from "react";
import PropertySearch from "./components/PropertySearch";
import PropertyCard from "./components/PropertyCard";
import FavouriteList from "./components/FavouriteList";
import data from "./data.json"; // Import your property data

const App = () => {
  const [properties, setProperties] = useState(data);
  const [favourites, setFavourites] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (searchParams) => {
    setSearchParams(searchParams);
    const filteredProperties = data.filter((property) => {
      return (
        (!searchParams.type || property.type.toLowerCase().includes(searchParams.type.toLowerCase())) &&
        (!searchParams.minPrice || property.price >= searchParams.minPrice) &&
        (!searchParams.maxPrice || property.price <= searchParams.maxPrice) &&
        (!searchParams.minBedrooms || property.bedrooms >= searchParams.minBedrooms) &&
        (!searchParams.maxBedrooms || property.bedrooms <= searchParams.maxBedrooms) &&
        (!searchParams.startDate || new Date(property.dateAdded) >= new Date(searchParams.startDate)) &&
        (!searchParams.endDate || new Date(property.dateAdded) <= new Date(searchParams.endDate)) &&
        (!searchParams.postcode || property.postcode.startsWith(searchParams.postcode))
      );
    });
    setProperties(filteredProperties);
  };

  const addFavourite = (property) => {
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (property) => {
    setFavourites(favourites.filter(fav => fav.id !== property.id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <div>
      <h1>Estate Agent App</h1>
      <PropertySearch onSearch={handleSearch} />
      <FavouriteList favourites={favourites} onRemove={removeFavourite} onClear={clearFavourites} />
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddFavourite={addFavourite}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
