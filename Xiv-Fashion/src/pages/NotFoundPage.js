import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div 
          className="not-found-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1 className="not-found-title" variants={itemVariants}>
            404
          </motion.h1>
          
          <motion.div className="not-found-divider" variants={itemVariants}></motion.div>
          
          <motion.h2 className="not-found-subtitle" variants={itemVariants}>
            Page Not Found
          </motion.h2>
          
          <motion.p className="not-found-message" variants={itemVariants}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
          
          <motion.div className="not-found-actions" variants={itemVariants}>
            <Link to="/" className="btn-primary">Return to Homepage</Link>
            <Link to="/products" className="btn-secondary">Browse Products</Link>
          </motion.div>
          
          <motion.div className="featured-products" variants={itemVariants}>
            <h3 className="featured-title">Featured Products</h3>
            
            <div className="featured-grid">
              <Link to="/products/1" className="featured-item">
                <div className="featured-image-container">
                  <img src="/images/product-1.jpg" alt="Featured Product" className="featured-image" />
                </div>
                <h4 className="featured-name">Minimalist Tee</h4>
                <p className="featured-price">$49.00</p>
              </Link>
              
              <Link to="/products/2" className="featured-item">
                <div className="featured-image-container">
                  <img src="/images/product-2.jpg" alt="Featured Product" className="featured-image" />
                </div>
                <h4 className="featured-name">Structured Blazer</h4>
                <p className="featured-price">$129.00</p>
              </Link>
              
              <Link to="/products/3" className="featured-item">
                <div className="featured-image-container">
                  <img src="/images/product-3.jpg" alt="Featured Product" className="featured-image" />
                </div>
                <h4 className="featured-name">Slim Fit Jeans</h4>
                <p className="featured-price">$89.00</p>
              </Link>
              
              <Link to="/products/4" className="featured-item">
                <div className="featured-image-container">
                  <img src="/images/product-4.jpg" alt="Featured Product" className="featured-image" />
                </div>
                <h4 className="featured-name">Oversized Sweater</h4>
                <p className="featured-price">$79.00</p>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;