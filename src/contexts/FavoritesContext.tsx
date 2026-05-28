import { createContext, useContext, useState, type ReactNode } from 'react';
import type { FavoriteItem } from '../types';

interface FavoritesContextType {
    favorites: FavoriteItem[];
    toggleFavorite: (product: FavoriteItem) => void;
    isFavorite: (_id: string) => boolean; // ZMIANA: oczekuje stringa
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const toggleFavorite = (product: FavoriteItem) => {
        setFavorites((prev) => {

            const exists = prev.find(item => item._id === product._id);
            if (exists) {

                return prev.filter(item => item._id !== product._id);
            }
            return [...prev, product];
        });
    };

    const isFavorite = (_id: string) => {

        return favorites.some(item => item._id === _id);
    };

    const favoritesCount = favorites.length;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};