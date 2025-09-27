"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem, purchased?: string[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, purchased: string[] = []) => {
        // ✅ prevent adding if already purchased
        if (purchased.includes(item.id)) {
          console.log(`[cartStore] Item ${item.id} already purchased, skipping add.`);
          return;
        }

        const items = get().items;
        const existing = items.find((i) => i.id === item.id);

        if (existing) {
          // increase quantity if not purchased
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" } // ✅ persists in localStorage
  )
);
