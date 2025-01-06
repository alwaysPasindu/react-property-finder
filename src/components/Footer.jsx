import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EliteEstates.lk</h3>
          <p>Your trusted partner in finding the perfect property in Sri Lanka.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/properties">Properties</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>123 Main Street</p>
          <p>Colombo, Sri Lanka</p>
          <p>Email: info@eliteestates.lk</p>
          <p>Phone: +94 11 234 5678</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/profile.php?id=100022030594134&mibextid=ZbWKwL" target="_blank"><FaFacebook /></a>
            <a href="https://x.com/alwaysPasindu?s=09&mx=2" target="_blank"><FaTwitter /></a>
            <a href="https://www.instagram.com/always.pasindu" target="_blank"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/alwayspasindu/" target="_blank"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EliteEstates.lk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
