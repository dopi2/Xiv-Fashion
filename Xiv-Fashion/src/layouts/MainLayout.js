import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="main-content"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </>
  );
};

export default MainLayout;