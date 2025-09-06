"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

type Project = {
  name: string;
  link: string;
  image: string;
  description: string;
};

type CartItem = Project & { quantity: number };

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: "ADD_ITEM"; payload: Project }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

const CartContext = createContext<
  | {
      state: CartState;
      addItem: (item: Project) => void;
      removeItem: (name: string) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.name === action.payload.name);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.name === action.payload.name
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.name !== action.payload) };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: Project) =>
    dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (name: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: name });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
