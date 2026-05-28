import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';

export const ProductsPage = () => {
    const { type, value } = useParams();
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites(); 

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                
                if (!response.ok) throw new Error('Błąd pobierania danych');
                
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Nie udało się załadować produktów. Sprawdź, czy serwer działa.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <h2 className="text-xl font-bold text-slate-700">Ładowanie zabawek z bazy danych...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-500 font-bold">
                {error}
            </div>
        );
    }

    // 4. Filtrowanie prawdziwych danych
    const filteredProducts = products.filter(product => {
        if (type === 'kategoria') return product.category === value;
        if (type === 'nowosc') return product.tag === value;
        return true; 
    });

    const pageTitle = type === 'kategoria' ? `Kategoria: ${value?.toUpperCase()}` : type === 'nowosc' ? `Nowości: ${value?.toUpperCase()}` : 'Wszystkie produkty';

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                <div className="mb-10 border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{pageTitle}</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">Znaleziono produktów: {filteredProducts.length}</p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => {
                            // ZMIANA: Szukamy w ulubionych po _id
                            const isFav = isFavorite(product._id); 

                            return (
                                <div key={product._id} className="group relative bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(product);
                                        }}
                                        className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all cursor-pointer"
                                    >
                                        <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                                    </button>

                                    <Link to={`/produkt/${product.slug}`} className="grow flex flex-col">
                                        <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 shrink-0">
                                            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="grow">
                                            <h3 className="font-medium text-gray-800 text-sm mb-1">{product.name}</h3>
                                            <p className="font-black text-lg mb-4 text-slate-900">
                                                {product.price.toFixed(2).replace('.', ',')} PLN
                                            </p>
                                        </div>
                                    </Link>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); 
                                            addToCart(product);
                                        }}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 mt-auto cursor-pointer"
                                    >
                                        <ShoppingCart className="w-4 h-4" /> DODAJ DO KOSZYKA
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                        <h2 className="text-xl font-black text-slate-800 mb-2">Brak produktów</h2>
                        <Link to="/" className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">WRÓĆ DO SKLEPU</Link>
                    </div>
                )}
            </div>
        </div>
    );
};