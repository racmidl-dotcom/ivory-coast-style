import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQty: (productId: string, quantity: number, size?: string, color?: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kassa.cart.v1";

const sameLine = (a: CartItem, productId: string, size?: string, color?: string) =>
  a.productId === productId && a.size === size && a.color === color;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addItem: (item, quantity = 1) =>
      setItems((prev) => {
        const idx = prev.findIndex((p) => sameLine(p, item.productId, item.size, item.color));
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
          return copy;
        }
        return [...prev, { ...item, quantity }];
      }),
    removeItem: (productId, size, color) =>
      setItems((prev) => prev.filter((p) => !sameLine(p, productId, size, color))),
    updateQty: (productId, quantity, size, color) =>
      setItems((prev) =>
        prev.map((p) =>
          sameLine(p, productId, size, color) ? { ...p, quantity: Math.max(1, quantity) } : p
        )
      ),
    clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.quantity * i.price, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
