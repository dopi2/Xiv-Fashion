import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  wishlistItems: [],
};

// Create context
const WishlistContext = createContext(initialState);

// Wishlist reducer
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const { product } = action.payload;
      
      // Check if item already exists in wishlist
      const existingItemIndex = state.wishlistItems.findIndex(
        item => item.id === product.id
      );
      
      // If item already exists, don't add it again
      if (existingItemIndex >= 0) {
        return state;
      }
      
      // Add new item to wishlist
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, product],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (_, index) => index !== action.payload.index
        ),
      };
    }
    
    case 'CLEAR_WISHLIST':
      return {
        ...initialState
      };
      
    case 'LOAD_WISHLIST':
      return {
        ...action.payload
      };
      
    default:
      return state;
  }
};

// Provider component
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state));
  }, [state]);
  
  // Add item to wishlist
  const addToWishlist = (product) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: { product },
    });
  };
  
  // Remove item from wishlist
  const removeFromWishlist = (index) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: { index },
    });
  };
  
  // Clear wishlist
  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };
  
  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};