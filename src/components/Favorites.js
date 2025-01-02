import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, onAddFavorite, onRemoveFavorite }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    onAddFavorite(property);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allows the drop event
  };

  const handleRemoveDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData("property"));
    onRemoveFavorite(property.id);
  };

  return (
    <div>
      <h3>Your Favorites</h3>
      <div
        className="favorites-drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div
              key={fav.id}
              className="favorite-item"
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("property", JSON.stringify(fav))
              }
              onDrop={handleRemoveDrop}
            >
              <p>
                {fav.type} - £{fav.price}
              </p>
              <p>{fav.location}</p>
              <p>{fav.description}</p>
              <button onClick={() => onRemoveFavorite(fav.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No favorites yet. Drag properties here to add them!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
