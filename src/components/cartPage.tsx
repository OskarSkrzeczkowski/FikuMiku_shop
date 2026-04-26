import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import photo2 from '../../public/photo2.jpg';
import photo4 from '../../public/photo4.jpg';

/* Symulacja danych koszyka */
const CART_ITEMS = [
    { id: 1, name: "Klocki drewniane", price: 29.99, img: `${photo2}`, quantity: 1, slug: "klocki-drewniane" },
    { id: 4, name: "Gitara dla dzieci", price: 59.99, img: `${photo4}`, quantity: 1, slug: "gitara-dla-dzieci" },
];

export const CartPage = () => {
    const subtotal = CART_ITEMS.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 15.00;
    const total = subtotal + shipping;

    const hasItems = CART_ITEMS.length > 0;

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                
                <div className="mb-10 border-l-4 border-orange-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        Twój Koszyk <ShoppingBag className="text-orange-500 w-7 h-7" />
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                        Sprawdź swoje zamówienie przed finalizacją
                    </p>
                </div>

                {hasItems ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        
                        {/* Lista produktów */}
                        <div className="lg:col-span-2 space-y-4">
                            {CART_ITEMS.map((item) => (
                                <div key={item.id} className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="flex-grow text-center md:text-left">
                                        <Link to={`/produkt/${item.slug}`} className="font-black text-slate-800 hover:text-blue-500 transition-colors uppercase italic">
                                            {item.name}
                                        </Link>
                                        <p className="text-slate-400 text-xs font-bold mt-1">Cena jednostkowa: {item.price.toFixed(2)} PLN</p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                        <button className="p-1 hover:text-blue-500 transition-colors cursor-pointer"><Minus className="w-4 h-4" /></button>
                                        <span className="font-black text-slate-800 min-w-[20px] text-center">{item.quantity}</span>
                                        <button className="p-1 hover:text-blue-500 transition-colors cursor-pointer"><Plus className="w-4 h-4" /></button>
                                    </div>

                                    <div className="text-right min-w-[100px]">
                                        <p className="font-black text-slate-900">{(item.price * item.quantity).toFixed(2)} PLN</p>
                                    </div>

                                    <button className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Podsumowanie */}
                        <div className="lg:col-span-1 sticky top-24">
                            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
                                <h2 className="text-xl font-black mb-6 italic uppercase tracking-wider text-orange-400">Podsumowanie</h2>
                                
                                <div className="space-y-4 text-sm font-bold border-b border-white/10 pb-6 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Wartość produktów:</span>
                                        <span>{subtotal.toFixed(2)} PLN</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Dostawa:</span>
                                        <span>{shipping.toFixed(2)} PLN</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-xs font-black uppercase text-slate-400">Do zapłaty:</span>
                                    <span className="text-3xl font-black text-white">{total.toFixed(2)} PLN</span>
                                </div>

                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 group cursor-pointer">
                                    PRZEJDŹ DO KASY
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[10px] text-slate-400 text-center mt-6 font-medium">
                                    Najniższa cena z ostatnich 30 dni: {subtotal.toFixed(2)} PLN
                                </p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-orange-200" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">Twój koszyk jest pusty</h2>
                        <p className="text-slate-500 font-bold mb-8">Czas dodać do niego trochę radości!</p>
                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-md">
                            WRÓĆ NA ZAKUPY
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};