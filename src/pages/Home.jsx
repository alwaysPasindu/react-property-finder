import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaRegBuilding, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your Dream Home in Sri Lanka</h1>
          <p>Find the perfect property that matches your lifestyle and preferences</p>
          <div className="hero-buttons">
            <Link to="/properties" className="btn btn-primary">
              <FaSearch /> Browse Properties
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Properties</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Cities</span>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose PropertyFinder</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaHome />
            </div>
            <h3>Wide Selection</h3>
            <p>Explore our extensive collection of properties across Sri Lanka</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Smart Search</h3>
            <p>Find your perfect property with our advanced search filters</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Verified Listings</h3>
            <p>All properties are verified and from trusted sources</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaUserTie />
            </div>
            <h3>Expert Support</h3>
            <p>Get assistance from our team of real estate experts</p>
          </div>
        </div>
      </section>

      <section className="property-types">
        <h2>Explore Property Types</h2>
        <div className="type-cards">
          <div className="type-card houses">
            <div className="type-content">
              <FaHome className="type-icon" />
              <h3>Houses</h3>
              <p>Find your perfect family home</p>
              <Link to="/properties?type=house" className="btn btn-outline">View Houses</Link>
            </div>
          </div>
          <div className="type-card apartments">
            <div className="type-content">
              <FaRegBuilding className="type-icon" />
              <h3>Apartments</h3>
              <p>Modern living in the city</p>
              <Link to="/properties?type=flat" className="btn btn-outline">View Apartments</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Start your property search journey with PropertyFinder today</p>
          <Link to="/properties" className="btn btn-primary">Start Searching</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
