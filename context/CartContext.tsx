'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  emoji: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'TOGGLE_CART'; payload?: boolean };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isOpen: action.payload !== undefined ? action.payload : !state.isOpen };
    default:
      return state;
  }
}

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getQuantity: (id: string) => number;
  toggleCart: (isOpen?: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('dragonfly-cart');
    if (savedCart) {
      try {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      } catch (e) {
        console.error('Failed to parse cart from local storage');
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('dragonfly-cart', JSON.stringify(state.items));
    }
  }, [state.items, isMounted]);

  const totalItems = React.useMemo(() => state.items.reduce((total, item) => total + item.quantity, 0), [state.items]);

  const addItem = React.useCallback((item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item }), []);
  const removeItem = React.useCallback((id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } }), []);
  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  }, []);
  const clearCart = React.useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const isInCart = React.useCallback((id: string) => state.items.some(item => item.id === id), [state.items]);
  const getQuantity = React.useCallback((id: string) => state.items.find(item => item.id === id)?.quantity || 0, [state.items]);
  const toggleCart = React.useCallback((isOpen?: boolean) => dispatch({ type: 'TOGGLE_CART', payload: isOpen }), []);

  const value = React.useMemo(() => ({
    items: state.items,
    totalItems,
    isOpen: state.isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
    toggleCart,
  }), [state.items, totalItems, state.isOpen, addItem, removeItem, updateQuantity, clearCart, isInCart, getQuantity, toggleCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
