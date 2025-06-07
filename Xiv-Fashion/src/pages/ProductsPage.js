import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import products, { getProductsByCategory, getProductsByTag } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  const initialTag = queryParams.get('tag');
  
  // State for filters and products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [activeTag, setActiveTag] = useState(initialTag || null);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  
  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategory && activeCategory !== 'all') {
      result = getProductsByCategory(activeCategory);
    }
    
    // Apply tag filter if present
    if (activeTag) {
      result = getProductsByTag(activeTag);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, activeTag, sortBy, priceRange]);
  
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
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <motion.div 
          className="products-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">Shop All Products</h1>
          <p className="products-count">{filteredProducts.length} products</p>
        </motion.div>
        
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle">
          <button 
            className="filter-toggle-btn"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          
          <div className="sort-dropdown-mobile">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="products-container">
          {/* Filters Sidebar */}
          <motion.aside 
            className={`filters-sidebar ${isFilterOpen ? 'open' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="filter-section">
              <h3 className="filter-title">Categories</h3>
              <ul className="filter-list">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="filter-section">
              <h3 className="filter-title">Price Range</h3>
              <div className="price-range-inputs">
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-range-slider"
                />
                <div className="price-range-values">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="filter-section">
              <h3 className="filter-title">Tags</h3>
              <div className="tag-buttons">
                <button 
                  className={`tag-btn ${activeTag === 'new' ? 'active' : ''}`}
                  onClick={() => setActiveTag(activeTag === 'new' ? null : 'new')}
                >
                  New Arrivals
                </button>
                <button 
                  className={`tag-btn ${activeTag === 'sale' ? 'active' : ''}`}
                  onClick={() => setActiveTag(activeTag === 'sale' ? null : 'sale')}
                >
                  Sale
                </button>
                <button 
                  className={`tag-btn ${activeTag === 'bestseller' ? 'active' : ''}`}
                  onClick={() => setActiveTag(activeTag === 'bestseller' ? null : 'bestseller')}
                >
                  Bestsellers
                </button>
              </div>
            </div>
            
            <button 
              className="reset-filters-btn"
              onClick={() => {
                setActiveCategory('all');
                setActiveTag(null);
                setPriceRange([0, 500]);
              }}
            >
              Reset Filters
            </button>
          </motion.aside>
          
          {/* Products Grid */}
          <div className="products-grid-container">
            <div className="products-top-bar">
              <div className="view-options">
                <button className="view-option-btn active" aria-label="Grid view">
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <rect x="0" y="0" width="8" height="8" />
                    <rect x="10" y="0" width="8" height="8" />
                    <rect x="0" y="10" width="8" height="8" />
                    <rect x="10" y="10" width="8" height="8" />
                  </svg>
                </button>
                <button className="view-option-btn" aria-label="List view">
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <rect x="0" y="0" width="18" height="4" />
                    <rect x="0" y="7" width="18" height="4" />
                    <rect x="0" y="14" width="18" height="4" />
                  </svg>
                </button>
              </div>
              
              <div className="sort-dropdown">
                <label htmlFor="sort-select">Sort by:</label>
                <select 
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + activeTag + sortBy + priceRange.join('-') + currentPage}
                className="products-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filteredProducts.length > 0 ? (
                  // Get current products for pagination
                  filteredProducts
                    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                    .map(product => (
                      <motion.div key={product.id} variants={itemVariants}>
                        <ProductCard product={product} />
                      </motion.div>
                    ))
                ) : (
                  <motion.div className="no-products-message">
                    <p>No products found matching your criteria.</p>
                    <button 
                      className="reset-filters-btn"
                      onClick={() => {
                        setActiveCategory('all');
                        setActiveTag(null);
                        setPriceRange([0, 500]);
                      }}
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {filteredProducts.length > 0 && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => {
                  const pageNumber = index + 1;
                  // Show limited page numbers with ellipsis for better UX
                  if (
                    pageNumber === 1 ||
                    pageNumber === Math.ceil(filteredProducts.length / productsPerPage) ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button 
                        key={pageNumber}
                        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                    (pageNumber === currentPage + 2 && currentPage < Math.ceil(filteredProducts.length / productsPerPage) - 2)
                  ) {
                    return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;