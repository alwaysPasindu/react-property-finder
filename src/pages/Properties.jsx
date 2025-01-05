import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTimes, FaTrash } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import propertiesData from '../data/properties.json';
import '../styles/Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  useEffect(() => {
    setProperties(propertiesData.properties);
    setFilteredProperties(propertiesData.properties);
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleFavorite = (property) => {
    const isFavorite = favorites.some(fav => fav.id === property.id);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== property.id);
    } else {
      newFavorites = [...favorites, property];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(favorites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFavorites(items);
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const removeFavorite = (propertyId) => {
    const newFavorites = favorites.filter(fav => fav.id !== propertyId);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.setItem('favorites', '[]');
  };

  const applyFilters = () => {
    let filtered = properties;

    if (filters.type !== 'any') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }

    if (filters.minBedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.minBedrooms));
    }
    if (filters.maxBedrooms) {
      filtered = filtered.filter(property => property.bedrooms <= parseInt(filters.maxBedrooms));
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(property => property.dateAdded >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(property => property.dateAdded <= filters.dateTo);
    }

    if (filters.postcode) {
      filtered = filtered.filter(property => 
        property.postcode.toLowerCase().startsWith(filters.postcode.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setFilters({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    setFilteredProperties(properties);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="properties-container">
      <div className={`favorites-sidebar ${showFavorites ? 'show' : ''}`}>
        <div className="favorites-header">
          <h3>Favorites</h3>
          <button className="close-favorites" onClick={() => setShowFavorites(false)}>
            <FaTimes />
          </button>
        </div>
        {favorites.length > 0 ? (
          <>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="favorites">
                {(provided) => (
                  <div
                    className="favorites-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {favorites.map((property, index) => (
                      <Draggable
                        key={property.id}
                        draggableId={property.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="favorite-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img src={property.images[0]} alt={property.title} />
                            <div className="favorite-info">
                              <h4>{property.title}</h4>
                              <p>{formatPrice(property.price)}</p>
                            </div>
                            <button
                              className="remove-favorite"
                              onClick={() => removeFavorite(property.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button className="clear-favorites" onClick={clearFavorites}>
              Clear All Favorites
            </button>
          </>
        ) : (
          <p className="no-favorites">No favorites added yet</p>
        )}
      </div>

      <div className="properties-main">
        <section className="search-section">
          <div className="search-header">
            <h2>Search Properties</h2>
            <button
              className="toggle-favorites"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
              <FaHeart />
            </button>
          </div>
          <div className="search-filters">
            <div className="filter-group">
              <label>Property Type</label>
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price Range (LKR)</label>
              <div className="range-inputs">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Bedrooms</label>
              <div className="range-inputs">
                <input
                  type="number"
                  name="minBedrooms"
                  placeholder="Min Bedrooms"
                  value={filters.minBedrooms}
                  onChange={handleFilterChange}
                />
                <input
                  type="number"
                  name="maxBedrooms"
                  placeholder="Max Bedrooms"
                  value={filters.maxBedrooms}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
        <br />
            <div className="filter-group">
              <label>Date Added</label>
              <div className="range-inputs">
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                /> <br />
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-group">
              <label>Postcode Area</label>
              <input
                type="text"
                name="postcode"
                placeholder="e.g., CO7, NU1"
                value={filters.postcode}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-buttons">
              <button onClick={applyFilters} className="btn btn-primary">Apply Filters</button>
              <button onClick={resetFilters} className="btn btn-outline">Reset</button>
            </div>
          </div>
        </section>

        <section className="properties-grid">
          {filteredProperties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.images[0]} alt={property.title} />
                <button
                  className={`favorite-button ${favorites.some(fav => fav.id === property.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(property)}
                >
                  {favorites.some(fav => fav.id === property.id) ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <div className="property-info">
                <h3>{property.title}</h3>
                <p className="property-price">{formatPrice(property.price)}</p>
                <p className="property-details">
                  {property.bedrooms} Bedrooms • {property.bathrooms} Bathrooms • {property.area} sqft
                </p>
                <p className="property-location">{property.postcode}</p>
                <Link to={`/properties/${property.id}`} className="btn btn-primary">
                  View Property
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Properties;
