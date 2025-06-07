import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const headerVariants = {
    initial: { backgroundColor: 'rgba(245, 245, 245, 0)' },
    scrolled: { backgroundColor: 'rgba(245, 245, 245, 0.95)', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' }
  };

  const menuVariants = {
    closed: { opacity: 0, x: '-100%' },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      variants={headerVariants}
      animate={isScrolled ? 'scrolled' : 'initial'}
      transition={{ duration: 0.3 }}
    >
      <div className="container header-container">
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <motion.div 
          className="logo"
          variants={logoVariants}
          whileHover="hover"
        >
          <Link to="/">
            <img src="/logo.svg" alt="XIV Fashion" width="120" height="60" />
          </Link>
        </motion.div>

        <nav className="desktop-nav">
          <ul>
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/products" className={location.pathname.includes('/products') ? 'active' : ''}>Collections</Link></li>
            <li><Link to="/products?category=new" className={location.pathname.includes('new') ? 'active' : ''}>New</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <Link to="/wishlist" className="icon-button wishlist-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {wishlistItems && wishlistItems.length > 0 && (
              <motion.span 
                className="wishlist-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={wishlistItems.length}
              >
                {wishlistItems.length}
              </motion.span>
            )}
          </Link>
          
          <Link to="/cart" className="icon-button cart-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {cartItems && cartItems.length > 0 && (
              <motion.span 
                className="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartItems.length}
              >
                {cartItems.length}
              </motion.span>
            )}
          </Link>
          
          <Link to="/account" className="icon-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              className="mobile-nav"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ul>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link to="/products" onClick={() => setIsMenuOpen(false)}>Collections</Link>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link to="/products?category=new" onClick={() => setIsMenuOpen(false)}>New</Link>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link to="/account" onClick={() => setIsMenuOpen(false)}>Account</Link>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
                </motion.li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;