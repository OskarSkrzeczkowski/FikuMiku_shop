import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Loader2, SearchX } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
                
                if (!response.ok) throw new Error('Błąd pobierania wyników');
                
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Nie udało się załadować wyników wyszukiwania.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                <div className="mb-10 border-l-4 border-orange-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Wyniki wyszukiwania</h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                        Szukana fraza: <span className="text-orange-500">"{query}"</span>
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-slate-700">Szukanie zabawek...</h2>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 font-bold py-12">{error}</div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => {
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
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <SearchX className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Nic nie znaleźliśmy</h2>
                        <p className="text-gray-500 font-medium max-w-md">
                            Przykro nam, ale nie mamy w sklepie zabawek pasujących do słowa "{query}". Spróbuj wpisać inną nazwę.
                        </p>
                        <Link to="/" className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg shadow-blue-200">
                            WRÓĆ DO SKLEPU
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};