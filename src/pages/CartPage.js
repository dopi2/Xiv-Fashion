import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal + shipping - discount;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      
      if (newQuantity <= 0) {
        // Remove item if quantity becomes 0
        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1) {
          removeFromCart(index);
        }
      } else {
        // Update quantity
        const index = cartItems.findIndex(item => item.id === id);
        if (index !== -1) {
          updateQuantity(index, newQuantity);
        }
      }
    }
  };
  
  // Handle remove item
  const handleRemoveItem = (id) => {
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
      removeFromCart(index);
    }
  };
  
  // Handle promo code application
  const handleApplyPromo = () => {
    // Simple promo code logic - in a real app, this would validate against a database
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.1); // 10% discount
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
    }
  };
  
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
    <div className="cart-page">
      <div className="container">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            className="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <svg id='simp' width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Your cart is currently empty.</p>
            <Link to="/products" className="button">Continue Shopping</Link>
          </motion.div>
        ) : (
          <div className="cart-container">
            <motion.div 
              className="cart-items"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="cart-header">
                <span className="header-product">Product</span>
                <span className="header-price">Price</span>
                <span className="header-quantity">Quantity</span>
                <span className="header-total">Total</span>
              </div>
              
              {cartItems.map(item => (
                <motion.div 
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="cart-item"
                  variants={itemVariants}
                >
                  <div className="item-product">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-meta">
                        Size: {item.size} | Color: <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                      </p>
                      <button 
                        className="remove-item"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  
                  {/* <div className="item-quantity">
                    <div className="quantity-selector">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div> */}
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="cart-summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              {promoApplied && (
                <div className="summary-row discount">
                  <span>Discount (WELCOME10)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="promo-code">
                <input 
                  type="text" 
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="promo-input"
                />
                <button 
                  className="promo-button"
                  onClick={handleApplyPromo}
                >
                  Apply
                </button>
              </div>
              
              {promoApplied && (
                <div className="promo-success">
                  Promo code applied successfully!
                </div>
              )}
              
              <Link to="/checkout" className="checkout-button">
                Proceed to Checkout
              </Link>
              
              <div className="secure-checkout">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M8 1L2 4v4c0 4.4 2.6 7.4 6 8 3.4-.6 6-3.6 6-8V4L8 1zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
                </svg>
                Secure Checkout
              </div>
              
              <div className="payment-methods">
                <span>We Accept:</span>
                <div className="payment-icons">
                  <span className="payment-icon">Visa</span>
                  <span className="payment-icon">MC</span>
                  <span className="payment-icon">Amex</span>
                  <span className="payment-icon">PayPal</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;