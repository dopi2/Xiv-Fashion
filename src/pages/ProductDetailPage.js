import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import products, { getRelatedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  
  // Find the product by ID
  const product = products.find(p => p.id === id);
  
  // State for product options
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  
  // Get related products
  const relatedProducts = product ? getRelatedProducts(product.id, product.category) : [];
  
  // Set initial selected options
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Handle 404 if product not found
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="button">Back to Products</Link>
      </div>
    );
  }
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      },
      quantity,
      selectedSize,
      selectedColor
    );
    
    // Show success message or navigate to cart
    // For now, we'll navigate to cart
    navigate('/cart');
  };
  
  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };
  
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <motion.div 
          className="product-breadcrumbs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">Home</Link> / 
          <Link to="/products">Products</Link> / 
          <Link to={`/products?category=${product.category}`}>{product.category}</Link> / 
          <span>{product.name}</span>
        </motion.div>
        
        <div className="product-detail-container">
          {/* Product Images */}
          <motion.div 
            className="product-images"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="main-image-container">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="main-image"
              />
            </div>
            
            {/* <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`${product.name} - View ${index + 1}`} />
                </div>
              ))}
            </div> */}
          </motion.div>
          
          {/* Product Info */}
          <motion.div 
            className="product-info"
            initial="hidden"
            animate="visible"
            variants={slideUp}
          >
            <div className="product-info-header">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-category">{product.category}</p>
              
              <div className="product-price">
                ${product.price.toFixed(2)}
                {product.salePrice && (
                  <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <div className="product-options">
              <div className="option-section">
                <h3 className="option-title">Color</h3>
                <div className="color-options">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === color ? 'active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
                <p className="selected-option">Selected: {selectedColor}</p>
              </div>
              
              <div className="option-section">
                <h3 className="option-title">Size</h3>
                <div className="size-options">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="size-guide-link">Size Guide</p>
              </div>
              
              <div className="option-section">
                <h3 className="option-title">Quantity</h3>
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <p className="stock-status">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <button 
                className="wishlist-btn"
                onClick={() => addToWishlist(product)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Add to Wishlist
              </button>
            </div>
            
            <div className="product-meta">
              <p><strong>SKU:</strong> {product.id.toString().padStart(6, '0')}</p>
              <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
            </div>
            
            <div className="product-tabs">
              <div className="tab-buttons">
                <button 
                  className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  className="tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'details' && (
                    <div className="details-tab">
                      <p className="product-description">{product.description}</p>
                      <ul className="product-features">
                        {product.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'shipping' && (
                    <div className="shipping-tab">
                      <h4>Shipping Information</h4>
                      <p>Free standard shipping on all orders over $100. Delivery time is typically 3-5 business days.</p>
                      <p>Express shipping available for an additional fee.</p>
                      
                      <h4>Returns & Exchanges</h4>
                      <p>We accept returns within 30 days of purchase. Items must be unworn with original tags attached.</p>
                      <p>For more information, please see our full <a href="#">Returns Policy</a>.</p>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="reviews-tab">
                      <div className="review-summary">
                        <div className="rating">
                          <span className="rating-value">4.5</span>
                          <div className="stars">
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star half-filled">★</span>
                          </div>
                          <span className="review-count">12 reviews</span>
                        </div>
                      </div>
                      
                      <button className="write-review-btn">Write a Review</button>
                      
                      <div className="review-list">
                        <div className="review-item">
                          <div className="review-header">
                            <div className="reviewer-name">John D.</div>
                            <div className="review-date">June 15, 2023</div>
                          </div>
                          <div className="review-rating">
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star">★</span>
                          </div>
                          <div className="review-content">
                            <p>Great quality and fits perfectly. The material is comfortable and the design is exactly as pictured.</p>
                          </div>
                        </div>
                        
                        <div className="review-item">
                          <div className="review-header">
                            <div className="reviewer-name">Sarah M.</div>
                            <div className="review-date">May 22, 2023</div>
                          </div>
                          <div className="review-rating">
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                            <span className="star filled">★</span>
                          </div>
                          <div className="review-content">
                            <p>Absolutely love this! The quality exceeded my expectations and shipping was fast.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Related Products */}
        {/* <section className="related-products-section">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            You May Also Like
          </motion.h2>
          
          <motion.div 
            className="related-products-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </section> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;