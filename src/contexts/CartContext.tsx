import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    decrementQuantity: (_id: string) => void; 
    removeFromCart: (_id: string) => void;    
    totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item => 
                    item._id === product._id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const decrementQuantity = (_id: string) => { 
        setItems((prevItems) =>
            prevItems
                .map((item) =>
                    item._id === _id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) 
        );
    };

    const removeFromCart = (_id: string) => { 
        setItems((prevItems) => prevItems.filter((item) => item._id !== _id));
    };

    const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, decrementQuantity, removeFromCart, totalItemsCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};