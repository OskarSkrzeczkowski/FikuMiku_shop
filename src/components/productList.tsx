import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import photo3  from '../assets/photo3.jpg';
import photo4 from '../assets/photo4.jpg';

const FAVORITE_PRODUCTS = [
    { id: 1, name: "Klocki drewniane", price: "29,99 PLN", img: `${photo4}`, slug: "klocki-drewniane" },
    { id: 3, name: "Układanka Edukacyjna", price: "29,99 PLN", img: `${photo3}`, slug: "ukladanka-edukacyjna" },
];

export const FavoritesPage = () => {
    const hasFavorites = FAVORITE_PRODUCTS.length > 0;

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="border-l-4 border-red-500 pl-6">
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                            Twoja Lista Życzeń 
                        </h1>
                        <p className="text-slate-500 font-bold text-sm mt-1">
                            Produkty, które skradły Twoje serce
                        </p>
                    </div>
                    <Link to="/" className="flex items-center text-sm font-black text-blue-500 hover:gap-3 transition-all gap-2 uppercase">
                        <ArrowLeft className="w-4 h-4" /> Kontynuuj zakupy
                    </Link>
                </div>

                {hasFavorites ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FAVORITE_PRODUCTS.map((product) => (
                            <div key={product.id} className="group relative bg-white p-4 rounded-3xl border-2 border-slate-50 hover:border-red-100 hover:shadow-xl hover:shadow-red-50 transition-all duration-300 cursor-pointer">
                                
                                <button className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-white shadow-sm transition-all cursor-pointer">
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <Link to={`/produkt/${product.slug}`}>
                                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-100">
                                        <img 
                                            src={product.img} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-red-500 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="font-black text-lg text-slate-900 mb-4">{product.price}</p>
                                </Link>

                                <button className="w-full bg-slate-900 hover:bg-blue-500 text-white font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                                    <ShoppingCart className="w-4 h-4" />
                                    DODAJ DO KOSZYKA
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Heart className="w-10 h-10 text-slate-200" />
                        </div>
                        <h2 className="text-xl font-black text-slate-800 mb-2">Twoja lista jest pusta</h2>
                        <p className="text-slate-500 font-medium mb-8">Nie masz jeszcze żadnych ulubionych produktów.</p>
                        <Link 
                            to="/" 
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-8 py-4 rounded-2xl transition-transform active:scale-95"
                        >
                            PRZEGLĄDAJ SKLEP
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};