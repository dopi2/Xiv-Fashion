import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import '../styles/CheckoutPage.css';

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    saveInfo: false,
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    agreeTerms: false
  });
  
  // Current checkout step
  const [currentStep, setCurrentStep] = useState('information');
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Calculate order summary - with null checks
  const cartItems = state?.cartItems || [];
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Temporarily disabled: Redirect if cart is empty or state is undefined
    // if (!state || !state.cartItems || state.cartItems.length === 0) {
    //   navigate('/cart');
    // }
  }, [/* state, navigate */]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    // Different validation based on current step
    if (currentStep === 'information') {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    } else if (currentStep === 'payment') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.expiry) newErrors.expiry = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'Security code is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission for each step
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (currentStep === 'information') {
        setCurrentStep('shipping');
      } else if (currentStep === 'shipping') {
        setCurrentStep('payment');
      } else if (currentStep === 'payment') {
        // Process order
        handlePlaceOrder();
      }
    }
  };
  
  // Handle going back to previous step
  const handleBack = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('information');
    } else if (currentStep === 'payment') {
      setCurrentStep('shipping');
    }
  };
  
  // Handle placing order
  const handlePlaceOrder = () => {
    // In a real app, this would send the order to a backend API
    // For now, we'll just clear the cart and redirect to a success page
    
    // Show loading state or processing animation here
    setTimeout(() => {
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to success page
      navigate('/order-success');
    }, 1500);
  };
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <motion.div 
          className="checkout-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo-link">
            <img src="/logo.svg" alt="XIV Fashion" width="80" height="40" />
          </Link>
          
          <div className="checkout-steps">
            <div className={`step ${currentStep === 'information' ? 'active' : ''} ${currentStep === 'shipping' || currentStep === 'payment' ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-name">Information</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${currentStep === 'shipping' ? 'active' : ''} ${currentStep === 'payment' ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-name">Shipping</span>
            </div>
            <div className="step-divider"></div>
            <div className={`step ${currentStep === 'payment' ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-name">Payment</span>
            </div>
          </div>
        </motion.div>
        
        <div className="checkout-container">
          <div className="checkout-main">
            <motion.div 
              key={currentStep}
              className="checkout-form-container"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <form onSubmit={handleSubmit} className="checkout-form">
                {currentStep === 'information' && (
                  <div className="checkout-section">
                    <h2 className="section-title">Contact Information</h2>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <h2 className="section-title">Shipping Address</h2>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={errors.firstName ? 'error' : ''}
                        />
                        {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={errors.lastName ? 'error' : ''}
                        />
                        {errors.lastName && <div className="error-message">{errors.lastName}</div>}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="country">Country/Region</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={errors.country ? 'error' : ''}
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                      {errors.country && <div className="error-message">{errors.country}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error' : ''}
                      />
                      {errors.address && <div className="error-message">{errors.address}</div>}
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={errors.city ? 'error' : ''}
                        />
                        {errors.city && <div className="error-message">{errors.city}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="state">State/Province</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={errors.postalCode ? 'error' : ''}
                        />
                        {errors.postalCode && <div className="error-message">{errors.postalCode}</div>}
                      </div>
                    </div>
                    
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                      />
                      <label htmlFor="saveInfo">Save this information for next time</label>
                    </div>
                    
                    <div className="form-actions">
                      <Link to="/cart" className="back-link">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path d="M6.7 8l3.6 3.6-1.4 1.4L4 8l4.9-4.9 1.4 1.4L6.7 8z" />
                        </svg>
                        Return to cart
                      </Link>
                      <button type="submit" className="continue-button">Continue to shipping</button>
                    </div>
                  </div>
                )}
                
                {currentStep === 'shipping' && (
                  <div className="checkout-section">
                    <h2 className="section-title">Shipping Method</h2>
                    
                    <div className="shipping-options">
                      <div className="shipping-option">
                        <input
                          type="radio"
                          id="standard"
                          name="shippingMethod"
                          value="standard"
                          checked
                          onChange={() => {}}
                        />
                        <label htmlFor="standard">
                          <div className="shipping-option-info">
                            <span className="shipping-option-name">Standard Shipping</span>
                            <span className="shipping-option-time">3-5 business days</span>
                          </div>
                          <span className="shipping-option-price">
                            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                          </span>
                        </label>
                      </div>
                      
                      <div className="shipping-option">
                        <input
                          type="radio"
                          id="express"
                          name="shippingMethod"
                          value="express"
                          disabled
                        />
                        <label htmlFor="express" className="disabled">
                          <div className="shipping-option-info">
                            <span className="shipping-option-name">Express Shipping</span>
                            <span className="shipping-option-time">1-2 business days</span>
                          </div>
                          <span className="shipping-option-price">$15.00</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button type="button" className="back-link" onClick={handleBack}>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path d="M6.7 8l3.6 3.6-1.4 1.4L4 8l4.9-4.9 1.4 1.4L6.7 8z" />
                        </svg>
                        Return to information
                      </button>
                      <button type="submit" className="continue-button">Continue to payment</button>
                    </div>
                  </div>
                )}
                
                {currentStep === 'payment' && (
                  <div className="checkout-section">
                    <h2 className="section-title">Payment Method</h2>
                    
                    <div className="payment-methods">
                      <div className="payment-method">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                        />
                        <label htmlFor="credit-card">
                          <span>Credit Card</span>
                          <div className="payment-icons">
                            <span className="payment-icon">Visa</span>
                            <span className="payment-icon">MC</span>
                            <span className="payment-icon">Amex</span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="payment-method">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                        />
                        <label htmlFor="paypal">
                          <span>PayPal</span>
                        </label>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="card-details">
                        <div className="form-group">
                          <label htmlFor="cardNumber">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            className={errors.cardNumber ? 'error' : ''}
                          />
                          {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="cardName">Name on Card</label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={errors.cardName ? 'error' : ''}
                          />
                          {errors.cardName && <div className="error-message">{errors.cardName}</div>}
                        </div>
                        
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="expiry">Expiry Date</label>
                            <input
                              type="text"
                              id="expiry"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className={errors.expiry ? 'error' : ''}
                            />
                            {errors.expiry && <div className="error-message">{errors.expiry}</div>}
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="cvv">Security Code</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              placeholder="CVV"
                              className={errors.cvv ? 'error' : ''}
                            />
                            {errors.cvv && <div className="error-message">{errors.cvv}</div>}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="form-checkbox terms-checkbox">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={errors.agreeTerms ? 'error' : ''}
                      />
                      <label htmlFor="agreeTerms">
                        I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
                      </label>
                    </div>
                    {errors.agreeTerms && <div className="error-message terms-error">{errors.agreeTerms}</div>}
                    
                    <div className="form-actions">
                      <button type="button" className="back-link" onClick={handleBack}>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <path d="M6.7 8l3.6 3.6-1.4 1.4L4 8l4.9-4.9 1.4 1.4L6.7 8z" />
                        </svg>
                        Return to shipping
                      </button>
                      <button type="submit" className="place-order-button">Place Order</button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
          
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="order-item">
                    <div className="item-image-container">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <span className="item-quantity">{item.quantity}</span>
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-meta">
                        Size: {item.size} | Color: <span className="color-dot" style={{ backgroundColor: item.color }}></span>
                      </p>
                    </div>
                    <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;