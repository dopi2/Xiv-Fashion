import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <motion.div 
            className="footer-brand"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <Link to="/">
              <img src="/logo.svg" alt="XIV Fashion" width="120" height="60" />
            </Link>
            <p className="footer-tagline">Minimalist clothing with a modern approach</p>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="footer-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.1 }}
          >
            <h3>Shop</h3>
            <ul>
              <li><Link to="/products?category=new">New Arrivals</Link></li>
              <li><Link to="/products?category=bestsellers">Best Sellers</Link></li>
              <li><Link to="/products?category=tshirts">T-Shirts</Link></li>
              <li><Link to="/products?category=shirts">Shirts</Link></li>
              <li><Link to="/products?category=outerwear">Outerwear</Link></li>
              <li><Link to="/products?category=accessories">Accessories</Link></li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.2 }}
          >
            <h3>Help</h3>
            <ul>
              <li><Link to="/customer-service">Customer Service</Link></li>
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/returns-exchanges">Returns & Exchanges</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.3 }}
          >
            <h3>About</h3>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press</Link></li>
              <li><Link to="/wholesale">Wholesale</Link></li>
              <li><Link to="/stores">Stores</Link></li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-newsletter"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            transition={{ delay: 0.4 }}
          >
            <h3>Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="button">Subscribe</button>
            </form>
          </motion.div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
          <div className="footer-copyright">
            © {currentYear} XIV Fashion. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;