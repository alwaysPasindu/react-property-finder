import React from "react";
import "./PropertyDetails.css"; // Import the CSS file

const PropertyDetails = ({ property }) => {
  if (!property) return <p>Property not found.</p>;

  return (
    <div className="property-details">
      <h2>{property.type}</h2>
      <img src={property.picture} alt={property.type || "Property"} />
      <p>{property.description}</p>
      <p>Price: £{property.price}</p>
      <p>Location: {property.location}</p>
      <a href={property.url} target="_blank" rel="noopener noreferrer">
        More details
      </a>
    </div>
  );
};

export default PropertyDetails;
