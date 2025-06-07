import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cartItems: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

// Create context
const CartContext = createContext(initialState);

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      
      // Check if item already exists in cart with same size and color
      const existingItemIndex = state.cartItems.findIndex(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );
      
      let updatedCartItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      } else {
        // Add new item to cart
        updatedCartItems = [
          ...state.cartItems,
          {
            ...product,
            quantity,
            selectedSize,
            selectedColor,
          },
        ];
      }
      
      // Calculate new totals
      const subtotal = calculateSubtotal(updatedCartItems);
      const shipping = calculateShipping(subtotal);
      const total = subtotal + shipping;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const updatedCartItems = state.cartItems.filter(
        (item, index) => index !== action.payload.index
      );
      
      // Calculate new totals
      const subtotal = calculateSubtotal(updatedCartItems);
      const shipping = calculateShipping(subtotal);
      const total = subtotal + shipping;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { index, quantity } = action.payload;
      
      // Don't allow quantity less than 1
      if (quantity < 1) return state;
      
      const updatedCartItems = state.cartItems.map((item, i) => {
        if (i === index) {
          return { ...item, quantity };
        }
        return item;
      });
      
      // Calculate new totals
      const subtotal = calculateSubtotal(updatedCartItems);
      const shipping = calculateShipping(subtotal);
      const total = subtotal + shipping;
      
      return {
        ...state,
        cartItems: updatedCartItems,
        subtotal,
        shipping,
        total,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...initialState
      };
      
    case 'LOAD_CART':
      return {
        ...action.payload
      };
      
    default:
      return state;
  }
};

// Helper functions
const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const calculateShipping = (subtotal) => {
  // Free shipping over $150
  return subtotal >= 150 ? 0 : 10;
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Add item to cart
  const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, selectedSize, selectedColor },
    });
  };
  
  // Remove item from cart
  const removeFromCart = (index) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { index },
    });
  };
  
  // Update item quantity
  const updateQuantity = (index, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { index, quantity },
    });
  };
  
  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};