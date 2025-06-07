import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/OrderSuccessPage.css';

const OrderSuccessPage = () => {
  // Generate a random order number
  const orderNumber = `XIV-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
  
  const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 10, 
        delay: 0.3 
      } 
    }
  };
  
  const pathVariants = {
    initial: { pathLength: 0 },
    animate: { 
      pathLength: 1, 
      transition: { 
        duration: 0.8, 
        ease: "easeInOut", 
        delay: 0.5 
      } 
    }
  };

  return (
    <div className="order-success-page">
      <div className="container">
        <motion.div 
          className="success-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div className="success-icon" variants={checkmarkVariants}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <motion.circle 
                cx="40" 
                cy="40" 
                r="36" 
                fill="none" 
                stroke="#000" 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path 
                d="M28 40L36 48L52 32" 
                fill="none" 
                stroke="#000" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                variants={pathVariants}
              />
            </svg>
          </motion.div>
          
          <motion.h1 className="success-title" variants={itemVariants}>
            Thank you for your order!
          </motion.h1>
          
          <motion.p className="success-message" variants={itemVariants}>
            Your order has been received and is now being processed.
            We've sent a confirmation email to your registered email address.
          </motion.p>
          
          <motion.div className="order-info" variants={itemVariants}>
            <div className="order-info-item">
              <span className="info-label">Order Number:</span>
              <span className="info-value">{orderNumber}</span>
            </div>
            
            <div className="order-info-item">
              <span className="info-label">Order Date:</span>
              <span className="info-value">{new Date().toLocaleDateString()}</span>
            </div>
            
            <div className="order-info-item">
              <span className="info-label">Estimated Delivery:</span>
              <span className="info-value">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
          
          <motion.div className="success-actions" variants={itemVariants}>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
            <Link to="#" className="btn-secondary">Track Order</Link>
          </motion.div>
          
          <motion.div className="recommended-section" variants={itemVariants}>
            <h2 className="section-title">You might also like</h2>
            
            <div className="recommended-products">
              {/* This would typically be populated from an API or product recommendations */}
              <div className="recommended-product">
                <div className="product-image-container">
                  <img src="/images/product-1.jpg" alt="Recommended Product" className="product-image" />
                </div>
                <h3 className="product-name">Minimalist Tee</h3>
                <p className="product-price">$49.00</p>
              </div>
              
              <div className="recommended-product">
                <div className="product-image-container">
                  <img src="/images/product-2.jpg" alt="Recommended Product" className="product-image" />
                </div>
                <h3 className="product-name">Structured Blazer</h3>
                <p className="product-price">$129.00</p>
              </div>
              
              <div className="recommended-product">
                <div className="product-image-container">
                  <img src="/images/product-3.jpg" alt="Recommended Product" className="product-image" />
                </div>
                <h3 className="product-name">Slim Fit Jeans</h3>
                <p className="product-price">$89.00</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;