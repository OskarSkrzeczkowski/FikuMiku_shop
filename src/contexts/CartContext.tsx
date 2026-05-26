import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number; 
    img: string;
    quantity: number;
    slug: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    decrementQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        console.log('--- DODAWANIE DO KOSZYKA START ---');
        console.log('Kliknięty produkt:', product);
        setItems((prevItems) => {
            console.log('Obecny stan koszyka (przed zmianą):', prevItems);
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                console.log('Produkt już jest, zwiększam ilość');
                return prevItems.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const decrementQuantity = (id: number) => {
        setItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) 
        );
    };

    const removeFromCart = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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