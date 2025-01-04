import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import propertiesData from '../data/properties.json';
import 'react-tabs/style/react-tabs.css';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const propertyData = propertiesData.properties.find(p => p.id === parseInt(id));
    if (propertyData) {
      setProperty(propertyData);
      setMainImage(propertyData.images[0]);
      // Check if property is in favorites
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.some(fav => fav.id === propertyData.id));
    }
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== property.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(property);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('si-LK', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details">
      <div className="property-header">
        <h1>{property.title}</h1>
        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
          <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>
      </div>

      <div className="image-gallery">
        <div className="main-image">
          <img src={mainImage} alt={property.title} />
        </div>
        <div className="thumbnails">
          {property.images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${mainImage === image ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(image)}
            >
              <img src={image} alt={`${property.title} - ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="property-summary">
        <div className="price">{formatPrice(property.price)}</div>
        <div className="key-details">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.area} sqft</span>
          <span>{property.postcode}</span>
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location</Tab>
        </TabList>

        <TabPanel>
          <div className="description-panel">
            <p>{property.longDescription}</p>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="floor-plan-panel">
            <img src={property.floorPlan} alt="Floor Plan" />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="map-panel">
            <iframe
              title="Property Location"
              width="100%"
              height="450"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${property.location.lat},${property.location.lng}`}
              allowFullScreen
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
