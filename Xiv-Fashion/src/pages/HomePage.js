import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import products, { getProductsByTag } from '../data/products';
import ProductCard from '../components/ProductCard';
import TrueFocus from '../components/TrueFocus';
import FallingText from '../components/FallingText';
import LogoCarousel from '../components/LogoCarousel';
import SocialIcons from '../components/SocialIcons';
import '../styles/HomePage.css';

const HomePage = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for pagination
  const [currentWeeklyPage, setCurrentWeeklyPage] = useState(1);
  const [currentCollectionsPage, setCurrentCollectionsPage] = useState(1);
  const productsPerPage = 4;
  
  // Get featured products
  const newArrivals = getProductsByTag('new').slice(0, 2);
  const allWeeklyPicks = products.slice(0, 12); // Increased from 8 to 12 for more pagination content
  const allCollections2024 = products.slice(0, 16); // Increased from 12 to 16 for more pagination content
  
  // Get current page products
  const weeklyPicks = allWeeklyPicks.slice(
    (currentWeeklyPage - 1) * productsPerPage,
    currentWeeklyPage * productsPerPage
  );
  
  const collections2024 = allCollections2024.slice(
    (currentCollectionsPage - 1) * productsPerPage,
    currentCollectionsPage * productsPerPage
  );

  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={fadeInUpVariants}
      >
        {/* Animated geometric shapes */}
        <div className="hero-shapes">
          <motion.div 
            className="hero-shape"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="hero-shape"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="hero-shape"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <motion.div
              id='lit'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <SocialIcons color="#333" size={20} />
              </motion.div>
              
              <motion.div 
                className="hero-title-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
               <TrueFocus 
sentence="NEW COLLECTIONS"
manualMode={false}
blurAmount={5}
borderColor="red"
animationDuration={2}
pauseBetweenAnimations={1}
/>
              </motion.div>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Spring / Summer 2025
              </motion.p>
              <motion.p 
                className="hero-paragraph"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Discover our exclusive collection featuring premium materials and cutting-edge designs. Each piece is meticulously crafted to elevate your wardrobe with timeless elegance and contemporary flair.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link to="/products" className="button">Go To Shop</Link>
              </motion.div>
            </div>
            
            <div className="hero-right">
              <motion.div
                className="hero-feature-content"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="feature-title">Elevate Your Style</h2>
                <p className="feature-description">
                  Discover our curated collection of premium fashion essentials designed for the modern individual. 
                  Each piece is crafted with attention to detail and commitment to quality.
                </p>
                <ul className="feature-list">
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="feature-icon">✓</span> Sustainable materials
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <span className="feature-icon">✓</span> Timeless designs
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <span className="feature-icon">✓</span> Ethically produced
                  </motion.li>
                </ul>
                <motion.div
                  className="feature-cta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <Link to="/about" className="text-link">Learn more about our process</Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* Logo Carousel */}
        <LogoCarousel />
        </div>
      </motion.section>

      {/* New This Week Section */}
      <section className="new-this-week-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="section-title">NEW THIS WEEK<sup>TM</sup></h2>
            <Link to="/products?tag=new" className="view-all">View all</Link>
          </motion.div>
          
          <motion.div 
            className="products-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildrenVariants}
          >
            {weeklyPicks.map(product => (
              <motion.div key={product.id} variants={childVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="pagination"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {Array.from({ length: Math.ceil(allWeeklyPicks.length / productsPerPage) }).map((_, index) => (
              <button 
                key={index} 
                className={`pagination-button ${currentWeeklyPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentWeeklyPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* XIV Collections Section */}
      <section className="collections-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="section-title">XIV COLLECTIONS 2024</h2>
            <div className="collection-filters">
              <button className="filter-button active">All</button>
              <button className="filter-button">T-Shirts</button>
              <button className="filter-button">Shirts</button>
            </div>
          </motion.div>
          
          <motion.div 
            className="collections-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildrenVariants}
          >
            {collections2024.map(product => (
              <motion.div key={product.id} variants={childVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="pagination"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {Array.from({ length: Math.ceil(allCollections2024.length / productsPerPage) }).map((_, index) => (
              <button 
                key={index} 
                className={`pagination-button ${currentCollectionsPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentCollectionsPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <motion.section 
        className="design-philosophy-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
      >
        <div className="container">
          <h2 className="section-title">OUR APPROACH TO FASHION DESIGN</h2>
          <p className="philosophy-text">
            At XIV Fashion, we blend minimalism with functionality to create timeless wardrobe essentials. Our design philosophy centers on clean lines, quality materials, and the belief that less is more.
          </p>
          
          <div className="philosophy-images">
            <motion.div 
              className="philosophy-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <img src="https://i.pinimg.com/736x/9f/2c/d2/9f2cd2aa24f3e2f6d56f41b1b882d44d.jpg" alt="Design philosophy" />
            </motion.div>
            <motion.div 
              className="philosophy-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img src="https://i.pinimg.com/736x/e5/dd/f5/e5ddf5f357329c51ca9707dfc61edade.jpg" alt="Design philosophy" />
            </motion.div>
            <motion.div 
              className="philosophy-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img src="https://i.pinimg.com/736x/f8/a6/38/f8a6383ee35903c977d2dc21dbad3699.jpg" alt="Design philosophy" />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <h2 className="section-title">WHAT OUR CUSTOMERS SAY</h2>
          </motion.div>
          
          <motion.div 
            className="testimonials-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildrenVariants}
          >
            <motion.div className="testimonial-card" variants={childVariants}>
              <div className="testimonial-content">
                <p>"The quality of XIV Fashion's clothing is exceptional. I've been a loyal customer for years and have never been disappointed."</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src="https://i.pinimg.com/736x/09/4f/a7/094fa78f0cc91e544b2358de0692cb49.jpg" alt="Customer" />
                  </div>
                  <div className="testimonial-info">
                    <h4>Sarah Johnson</h4>
                    <p>Loyal Customer</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="testimonial-card" variants={childVariants}>
              <div className="testimonial-content">
                <p>"I love how versatile these pieces are. They easily transition from day to night and always make me feel confident."</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src="https://i.pinimg.com/736x/51/04/30/510430574b86cedc4cc23a36ce8bf92d.jpg" alt="Customer" />
                  </div>
                  <div className="testimonial-info">
                    <h4>Michael Chen</h4>
                    <p>Fashion Enthusiast</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="testimonial-card" variants={childVariants}>
              <div className="testimonial-content">
                <p>"The attention to detail in every garment is remarkable. These are investment pieces that stand the test of time."</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    <img src="https://i.pinimg.com/736x/a7/d9/a0/a7d9a0427d09caad72b8723954addeb0.jpg" alt="Customer" />
                  </div>
                  <div className="testimonial-info">
                    <h4>Emma Rodriguez</h4>
                    <p>Style Blogger</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Brand Logo Section */}
      <section className="brand-logo-section">
        <div className="container">
          <motion.div 
            className="brand-logo"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/logo.svg" alt="XIV Fashion" width="120" height="60" />
            <div className="brand-qr">
              <span>XIV</span>
              <span>QR</span>
            </div>
            <FallingText
  text={`Discover our curated collection of premium fashion essentials designed to elevate your style and express your unique personality.`}
  highlightWords={["premium", "fashion", "style", "curated", "collection"]}
  highlightClass="highlighted"
  trigger="hover"
  backgroundColor="transparent"
  wireframes={false}
  gravity={0.56}
  fontSize="2rem"
  mouseConstraintStiffness={0.9}
/>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

