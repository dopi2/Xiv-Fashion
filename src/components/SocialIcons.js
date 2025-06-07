import React from 'react';
import { motion } from 'framer-motion';
import '../styles/SocialIcons.css';

const SocialIcons = ({ color = '#333', size = 24, animate = true }) => {
  const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div 
      className="social-icons"
      initial={animate ? "hidden" : "visible"}
      animate="visible"
      variants={containerVariants}
    >
      {/* Instagram Icon */}
      <motion.a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        variants={animate ? iconVariants : {}}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </motion.a>
      
      {/* Twitter/X Icon */}
      <motion.a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        variants={animate ? iconVariants : {}}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      </motion.a>
      
      {/* Facebook Icon */}
      <motion.a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="social-icon"
        variants={animate ? iconVariants : {}}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </motion.a>
    </motion.div>
  );
};

export default SocialIcons;