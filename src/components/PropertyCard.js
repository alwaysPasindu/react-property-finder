import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property, onViewDetails, onAddFavorite }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("property", JSON.stringify(property));
  };

  return (
    <div className="property-card" draggable onDragStart={handleDragStart}>
      <img src={property.picture} alt={property.type || "Property"} />
      <h3>{property.type}</h3>
      <p>{property.description}</p>
      <p>Price: £{property.price}</p>
      <p>Location: {property.location}</p>
      <button onClick={() => onViewDetails(property.id)}>View Details</button>
      <button className="add-favorite" onClick={() => onAddFavorite(property)}>
        Add to Favorites
      </button>
    </div>
  );
};

export default PropertyCard;
