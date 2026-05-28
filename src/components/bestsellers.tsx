import { useState, useEffect } from 'react';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types';

export const Bestsellers = () => {
    const { addToCart } = useCart();
    
    const [bestsellers, setBestsellers] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Błąd pobierania danych');
                
                const data: Product[] = await response.json();
                
            
                const filtered = data
                    .filter(product => product.tag === 'bestsellery')
                    .slice(0, 4);
                    
                setBestsellers(filtered);
            } catch (err) {
                console.error(err);
                setError('Nie udało się załadować bestsellerów.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBestsellers();
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">NASZE BESTSELLERY</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Odkryj zabawki, które pokochały tysiące dzieci. Najwyższa jakość i gwarancja uśmiechu!
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-bold">Ładowanie najlepszych produktów...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 font-bold py-12">{error}</div>
                ) : bestsellers.length === 0 ? (
                    <div className="text-center text-gray-500 font-bold py-12">Brak bestsellerów do wyświetlenia.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bestsellers.map((product) => (
                            <div key={product._id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:scale-105 transition-transform duration-300 flex flex-col">
                                <Link to={`/produkt/${product.slug}`} className="grow flex flex-col">
                                    <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 shrink-0">
                                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="grow">
                                        <h3 className="font-medium text-gray-800 text-sm mb-1">{product.name}</h3>
                                        <p className="font-black text-lg mb-4">
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
                                    <ShoppingCart className="w-4 h-4" />
                                    DODAJ DO KOSZYKA
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};