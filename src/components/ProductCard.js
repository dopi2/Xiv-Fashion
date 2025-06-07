import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // Destructure product properties
  const { id, name, price, images, colors, category, tags } = product;
  
  // Handle quick add to cart
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use addToCart function instead of dispatch
    addToCart(
      {
        id,
        name,
        price,
        image: images[0]
      },
      1, // quantity
      'M', // Default size
      colors[0] // Default color
    );
  };
  
  // No image hover effect
  
  // Animation variants
  const cardVariants = {
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div 
      className="product-card"
      variants={cardVariants}
      whileHover="hover"
    >
      <Link to={`/product/${id}`} className="product-link">
        <div className="product-image-container">
          <motion.div 
            className="product-image"
            variants={imageVariants}
          >
            <img 
              src={images[0]} 
              alt={name} 
              className="product-img"
            />
          </motion.div>
          
          {tags && tags.includes('new') && (
            <span className="product-tag new-tag">New</span>
          )}
          
          {tags && tags.includes('sale') && (
            <span className="product-tag sale-tag">Sale</span>
          )}
          
          <button 
            className="quick-add-btn"
            onClick={handleQuickAdd}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
        
        <div className="product-info">
          <div className="product-details">
            <h3 className="product-name">{name}</h3>
            <p className="product-category">{category}</p>
          </div>
          
          <div className="product-price-container">
            <span className="product-price">${price.toFixed(2)}</span>
            
            {/* If product has a sale price */}
            {product.salePrice && (
              <span className="product-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        <div className="product-colors">
          {colors.map((color, index) => (
            <div 
              key={index}
              className="color-swatch"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;