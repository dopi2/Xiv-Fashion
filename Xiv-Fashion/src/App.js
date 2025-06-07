import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import WishlistPage from './pages/WishlistPage';

// Context
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AnimatePresence mode="wait">
            <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/account" element={<AccountPage />} />
            </Routes>
          </AnimatePresence>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;