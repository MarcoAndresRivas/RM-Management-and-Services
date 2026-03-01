import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotals: () => { totalItems: number; totalPrice: number };
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id
                                ? { ...i, quantity: i.quantity + item.quantity }
                                : i
                        )
                    };
                }
                return { items: [...state.items, item] };
            }),

            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id)
            })),

            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                )
            })),

            clearCart: () => set({ items: [] }),

            getTotals: () => {
                const { items } = get();
                return items.reduce(
                    (totals, item) => ({
                        totalItems: totals.totalItems + item.quantity,
                        totalPrice: totals.totalPrice + (item.price * item.quantity),
                    }),
                    { totalItems: 0, totalPrice: 0 }
                );
            },
        }),
        {
            name: 'ecommerce-cart-storage',
        }
    )
)
