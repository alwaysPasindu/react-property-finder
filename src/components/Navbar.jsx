import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">EliteEstates.lk</Link>
      </div>
      <button className="nav-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li>
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/properties" 
            className={location.pathname === '/properties' ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Properties
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''} 
            onClick={toggleMenu}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'active' : ''} 
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
