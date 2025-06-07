import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import '../styles/WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Wishlist
        </motion.h1>
        
        {wishlistItems.length === 0 ? (
          <motion.div 
            className="empty-wishlist"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2>Your wishlist is empty</h2>
            <p>Browse our collections and add your favorite items to your wishlist.</p>
            <Link to="/products" className="button">Shop Now</Link>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="wishlist-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist</p>
            </motion.div>
            
            <motion.div 
              className="wishlist-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {wishlistItems.map((item, index) => (
                <motion.div 
                  key={`${item.id}-${index}`} 
                  className="wishlist-item"
                  variants={itemVariants}
                >
                  <ProductCard product={item} />
                  <button 
                    className="remove-from-wishlist"
                    onClick={() => removeFromWishlist(index)}
                    aria-label="Remove from wishlist"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;