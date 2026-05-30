import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { FavoriteItem } from '../types';

interface FavoritesContextType {
    clearFavorites: () => void;
    favorites: FavoriteItem[];
    toggleFavorite: (product: FavoriteItem) => void;
    isFavorite: (_id: string) => boolean;
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const syncWithBackend = async (currentFavorites: FavoriteItem[]) => {
        const token = localStorage.getItem('fiku_miku_token');
        if (!token) return;

        try {
            console.log("Synchronizuję ulubione z bazą...", currentFavorites);
            await fetch('http://localhost:5000/api/user/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ favorites: currentFavorites })
            });
        } catch (error) {
            console.error("Błąd zapisu ulubionych w chmurze:", error);
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('fiku_miku_token'); 
            if (!token) return; // Jeśli użytkownik nie jest zalogowany

            try {
                const response = await fetch('http://localhost:5000/api/user/favorites', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data);
                }
            } catch (error) {
                console.error("Błąd sieci przy pobieraniu ulubionych:", error);
            }
        };

        fetchFavorites();
    }, []);

    const toggleFavorite = (product: FavoriteItem) => {
        setFavorites((prev) => {
            const exists = prev.find(item => item._id === product._id);
            let updatedFavorites;
            
            if (exists) {
                updatedFavorites = prev.filter(item => item._id !== product._id);
            } else {
                updatedFavorites = [...prev, product];
            }

            syncWithBackend(updatedFavorites);
            return updatedFavorites;
        });
    };

    const isFavorite = (_id: string) => {
        return favorites.some(item => item._id === _id);
    };
    
    const clearFavorites = () => {
        setFavorites([]);
    };
    
    const favoritesCount = favorites.length;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount, clearFavorites }}>
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