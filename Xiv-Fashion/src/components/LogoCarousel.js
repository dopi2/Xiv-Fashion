import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LogoCarousel.css';

// SVG logos for fashion brands
const logos = [
  {
    id: 1,
    name: 'Chanel',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M20,10 h10 v20 h-10 z M70,10 h10 v20 h-10 z"/>
        <path d="M35,15 h30 v2 h-30 z M35,25 h30 v2 h-30 z"/>
        <path d="M40,10 c0,0 -5,10 0,20 c5,-10 0,-20 0,-20 z M60,10 c0,0 -5,10 0,20 c5,-10 0,-20 0,-20 z"/>
      </g>
    </svg>`
  },
  {
    id: 2,
    name: 'Gucci',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <circle cx="25" cy="20" r="10"/>
        <circle cx="50" cy="20" r="10"/>
        <circle cx="75" cy="20" r="10"/>
        <circle cx="25" cy="20" r="6" fill="white"/>
        <circle cx="50" cy="20" r="6" fill="white"/>
        <circle cx="75" cy="20" r="6" fill="white"/>
      </g>
    </svg>`
  },
  {
    id: 3,
    name: 'Louis Vuitton',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M20,10 l10,0 l0,20 l-10,0 z M40,10 l10,0 l0,20 l-10,0 z M60,10 l10,0 l0,20 l-10,0 z M80,10 l0,20 l-10,0 l0,-20 z"/>
        <path d="M20,20 l70,0 l0,2 l-70,0 z"/>
      </g>
    </svg>`
  },
  {
    id: 4,
    name: 'Prada',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M20,10 h60 v20 h-60 z M25,15 h50 v10 h-50 z" fill-rule="evenodd"/>
        <path d="M35,15 v10 M45,15 v10 M55,15 v10 M65,15 v10" stroke="#333" stroke-width="1"/>
      </g>
    </svg>`
  },
  {
    id: 5,
    name: 'Versace',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <circle cx="50" cy="20" r="15"/>
        <circle cx="50" cy="20" r="10" fill="white"/>
        <path d="M50,10 L53,17 L60,17 L55,22 L57,30 L50,25 L43,30 L45,22 L40,17 L47,17 Z" fill="#333"/>
      </g>
    </svg>`
  },
  {
    id: 6,
    name: 'Dior',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M20,15 h15 c0,0 10,0 10,5 c0,5 -10,5 -10,5 h-15 z"/>
        <path d="M50,15 h10 v10 h-10 z"/>
        <circle cx="70" cy="20" r="5"/>
        <path d="M80,15 v10 h5 v-10 z"/>
      </g>
    </svg>`
  },
  {
    id: 7,
    name: 'Balenciaga',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M10,15 h15 v2 h-13 v3 h10 v2 h-10 v3 h13 v2 h-15 z"/>
        <path d="M30,15 h5 l5,12 l5,-12 h5 l-7,15 h-6 z"/>
        <path d="M55,15 h15 v2 h-13 v3 h10 v2 h-10 v3 h13 v2 h-15 z"/>
        <path d="M75,15 h15 v2 h-5 v10 h-5 v-10 h-5 z"/>
      </g>
    </svg>`
  },
  {
    id: 8,
    name: 'Fendi',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" width="100" height="40">
      <g fill="#333">
        <path d="M20,10 h10 v20 h-10 z"/>
        <path d="M35,10 h10 v10 h10 v-10 h10 v20 h-10 v-10 h-10 v10 h-10 z"/>
        <path d="M70,10 h10 v20 h-10 z"/>
      </g>
    </svg>`
  }
];

const LogoCarousel = () => {
  // Duplicate logos to create seamless infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="logo-carousel">
      <div className="logo-carousel-inner">
        <motion.div
          className="logo-track"
          animate={{
            x: ["-50%", "0%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          {duplicatedLogos.map((logo) => (
            <div key={`${logo.id}-1`} className="logo-item">
              <div dangerouslySetInnerHTML={{ __html: logo.svg }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoCarousel;