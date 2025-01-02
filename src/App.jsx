import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from "./components/PropertyDetails";
import Favorites from "./components/Favorites";
import propertiesData from "./data/properties.json";

const App = () => {
  const [properties] = useState(propertiesData.properties || []);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleSearch = (criteria) => {
    const results = properties.filter((property) => {
      const matchesType = criteria.type
        ? property.type === criteria.type
        : true;
      const matchesPrice =
        (criteria.minPrice ? property.price >= criteria.minPrice : true) &&
        (criteria.maxPrice ? property.price <= criteria.maxPrice : true);
      const matchesBedrooms =
        (criteria.minBedrooms
          ? property.bedrooms >= criteria.minBedrooms
          : true) &&
        (criteria.maxBedrooms
          ? property.bedrooms <= criteria.maxBedrooms
          : true);
      const matchesPostcode = criteria.postcode
        ? property.location
            .toLowerCase()
            .includes(criteria.postcode.toLowerCase())
        : true;

      return matchesType && matchesPrice && matchesBedrooms && matchesPostcode;
    });

    setFilteredProperties(results);
  };

  const handleViewDetails = (id) => {
    const property = properties.find((property) => property.id === id);
    setSelectedProperty(property);
  };

  const handleAddFavorite = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDropOnFavorites = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    handleAddFavorite(property);
  };

  const handleDropOnProperties = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    handleRemoveFavorite(property.id);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {selectedProperty ? (
        <PropertyDetails property={selectedProperty} />
      ) : (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnProperties}
            style={{ margin: "16px 0" }}
          >
            <h3>Properties</h3>
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewDetails}
                onAddFavorite={handleAddFavorite}
              />
            ))}
          </div>
        </div>
      )}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnFavorites}
        style={{
          border: "2px dashed #ccc",
          padding: "16px",
          marginTop: "16px",
          borderRadius: "8px",
        }}
      >
        <h3>Your Favorites</h3>
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
};

export default App;
