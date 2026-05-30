import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
    clearCart: () => void;
    items: CartItem[];
    addToCart: (product: Product) => void;
    decrementQuantity: (_id: string) => void;
    removeFromCart: (_id: string) => void;
    totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const syncWithBackend = async (currentItems: CartItem[]) => {
        const token = localStorage.getItem('fiku_miku_token');
        if (!token) return;

        try {
            console.log("Wysyłam aktualizację koszyka do MongoDB...", currentItems);
            await fetch('http://localhost:5000/api/user/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart: currentItems })
            });
        } catch (error) {
            console.error("Błąd zapisu koszyka w chmurze:", error);
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('fiku_miku_token'); 
            if (!token) {
                console.log("Brak tokenu – użytkownik niezalogowany, koszyk lokalny.");
                return;
            }

            try {
                console.log("Pobieram Twój zapisany koszyk z MongoDB...");
                const response = await fetch('http://localhost:5000/api/user/cart', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Koszyk pobrany pomyślnie:", data);
                    setItems(data);
                } else {
                    console.log("Serwer zwrócił błąd przy pobieraniu koszyka:", response.status);
                }
            } catch (error) {
                console.error("Błąd sieci przy pobieraniu koszyka:", error);
            }
        };

        fetchCart();
    }, []);

    const addToCart = (product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(item => item._id === product._id);
            let updatedItems;

            if (existingItem) {
                updatedItems = prevItems.map(item => 
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedItems = [...prevItems, { ...product, quantity: 1 }];
            }

            syncWithBackend(updatedItems);
            return updatedItems;
        });
    };

    const decrementQuantity = (_id: string) => {
        setItems((prevItems) => {
            const updatedItems = prevItems
                .map((item) => item._id === _id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0);

            syncWithBackend(updatedItems);
            return updatedItems;
        });
    };

    const removeFromCart = (_id: string) => {
        setItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item._id !== _id);
            
            syncWithBackend(updatedItems);
            return updatedItems;
        });
    };
    const clearCart = () => {
        setItems([]);
    };

    const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, decrementQuantity, removeFromCart, totalItemsCount, clearCart }}>
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