import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About PropertyFinder</h1>
        <p>Your trusted partner in finding the perfect property in Sri Lanka</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, PropertyFinder has been at the forefront of revolutionizing 
            the real estate market in Sri Lanka. We believe in making property hunting 
            a seamless and enjoyable experience for everyone.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To provide a transparent, efficient, and user-friendly platform that connects 
            property seekers with their dream homes while maintaining the highest standards 
            of service and integrity.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-list">
            <div className="feature">
              <h3>Extensive Property Database</h3>
              <p>Access to thousands of verified properties across Sri Lanka</p>
            </div>
            <div className="feature">
              <h3>Expert Support</h3>
              <p>Dedicated team of real estate professionals to assist you</p>
            </div>
            <div className="feature">
              <h3>Advanced Search</h3>
              <p>Powerful search tools to find your perfect property</p>
            </div>
            <div className="feature">
              <h3>Verified Listings</h3>
              <p>All properties are verified for authenticity and accuracy</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value">
              <h3>Transparency</h3>
              <p>We believe in honest and clear communication</p>
            </div>
            <div className="value">
              <h3>Innovation</h3>
              <p>Continuously improving our services</p>
            </div>
            <div className="value">
              <h3>Excellence</h3>
              <p>Maintaining high standards in everything we do</p>
            </div>
            <div className="value">
              <h3>Customer Focus</h3>
              <p>Your satisfaction is our priority</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
