
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import type { ShippingDetails, Order } from '../types';

export const CartPage = () => {
    const { items, addToCart, decrementQuantity, removeFromCart, clearCart } = useCart();
    
    const [step, setStep] = useState<'cart' | 'checkout' | 'confirm'>('cart');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState<string>('');

    const [formData, setFormData] = useState<ShippingDetails>({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        deliveryMethod: 'courier'
    });


    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const getShippingCost = () => {
        if (items.length === 0 || formData.deliveryMethod === 'pickup') return 0.00;
        if (formData.deliveryMethod === 'parcel_locker') return 12.00;
        return 15.00;
    };

    const shipping = getShippingCost();
    const total = subtotal + shipping;
    const hasItems = items.length > 0;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderPayload: Order = {
            customer: formData,
            items: items,
            totalPrice: total,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('fiku_miku_token');

            const response = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(orderPayload)
            });

            if (!response.ok) throw new Error('Błąd serwera podczas składania zamówienia');

            const result = await response.json();
            
            setOrderId(result.orderId);
        
            clearCart();
            
            setStep('confirm');
        } catch (error) {
            alert('Wystąpił problem z zapisem zamówienia. Spróbuj ponownie.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (step === 'cart') {
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <div key={item._id} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border shrink-0">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="grow text-center sm:text-left">
                                            <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight mb-1">{item.name}</h3>
                                            <p className="text-sm font-bold text-slate-400">Cena: {item.price.toFixed(2)} PLN</p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border-2 border-slate-100">
                                            <button onClick={() => decrementQuantity(item._id)} className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shadow-sm">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-black text-slate-800 px-2 min-w-[20px] text-center">{item.quantity}</span>
                                            <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-lg bg-white border flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shadow-sm">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="text-center sm:text-right shrink-0 min-w-[100px]">
                                            <p className="font-black text-xl text-slate-900">{(item.price * item.quantity).toFixed(2)} PLN</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-red-500 transition-colors p-2 cursor-pointer">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm relative overflow-hidden">
                                <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight mb-6 pb-4 border-b-2 border-slate-50">Podsumowanie</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between font-bold text-slate-600"><span>Wartość koszyka:</span><span className="text-slate-800">{subtotal.toFixed(2)} PLN</span></div>
                                    <div className="flex justify-between font-bold text-slate-600"><span>Dostawa (od):</span><span className="text-slate-800">{shipping.toFixed(2)} PLN</span></div>
                                    <div className="border-t-2 border-dashed border-slate-100 pt-4 flex justify-between items-baseline"><span className="font-black text-lg text-slate-800 uppercase">Do zapłaty:</span><span className="font-black text-3xl text-orange-500">{total.toFixed(2)} PLN</span></div>
                                </div>
                                <button onClick={() => setStep('checkout')} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-3 group uppercase tracking-wider cursor-pointer">
                                    PRZEJDŹ DO KASY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-[10px] text-slate-400 text-center mt-6 font-medium">Najniższa cena z ostatnich 30 dni: {subtotal.toFixed(2)} PLN</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                            <div className="bg-orange-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"><ShoppingBag className="w-10 h-10 text-orange-200" /></div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">Twój koszyk jest pusty</h2>
                            <p className="text-slate-500 font-bold mb-8">Czas dodać do niego trochę radości!</p>
                            <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-md">WRÓĆ NA ZAKUPY</Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (step === 'checkout') {
        return (
            <div className="bg-slate-50 min-h-screen py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8 border-l-4 border-blue-500 pl-6">
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Dane do dostawy</h1>
                        <p className="text-slate-500 font-bold text-sm mt-1">Wypełnij formularz, aby sfinalizować zamówienie</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm space-y-5">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Imię i nazwisko / Firma</label>
                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Jan Kowalski" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Adres E-mail</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="jan@kowalski.pl" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Numer telefonu</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="123456789" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Ulica, numer domu i mieszkania</label>
                                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Kolorowa 12 m. 4" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Miasto</label>
                                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Gniezno" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Kod pocztowy</label>
                                    <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="62-200" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2 ml-1">Sposób dostawy</label>
                                <select name="deliveryMethod" value={formData.deliveryMethod} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 focus:bg-white transition-all font-bold text-sm text-slate-800 appearance-none cursor-pointer">
                                    <option value="courier">Kurier DPD / InPost (15.00 PLN)</option>
                                    <option value="parcel_locker">Paczkomaty InPost 24/7 (12.00 PLN)</option>
                                    <option value="pickup">Odbiór osobisty w Gnieźnie (0.00 PLN)</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t-2 border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button type="button" onClick={() => setStep('cart')} className="text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer">Wróć do koszyka</button>
                                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 disabled:bg-slate-300 text-white font-black py-4 px-10 rounded-2xl shadow-md transition-all uppercase tracking-wider cursor-pointer">
                                    {isSubmitting ? 'ZAPISYWANIE...' : 'ZŁÓŻ ZAMÓWIENIE'}
                                </button>
                            </div>
                        </form>

                        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 p-8 shadow-sm">
                            <h3 className="font-black text-xl text-slate-800 uppercase mb-4">Twoje produkty</h3>
                            <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 pr-2 mb-6">
                                {items.map(item => (
                                    <div key={item._id} className="py-3 flex justify-between items-center text-sm">
                                        <span className="font-bold text-slate-700 truncate max-w-[180px]">{item.name} <span className="text-slate-400">x{item.quantity}</span></span>
                                        <span className="font-black text-slate-900">{(item.price * item.quantity).toFixed(2)} PLN</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3 pt-4 border-t-2 border-slate-50 font-bold text-slate-600 text-sm">
                                <div className="flex justify-between"><span>Produkty:</span><span>{subtotal.toFixed(2)} PLN</span></div>
                                <div className="flex justify-between"><span>Dostawa:</span><span>{shipping.toFixed(2)} PLN</span></div>
                                <div className="flex justify-between items-baseline pt-2 border-t border-dashed text-slate-900"><span className="font-black uppercase text-base">Razem:</span><span className="font-black text-2xl text-orange-500">{total.toFixed(2)} PLN</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'confirm') {
        return (
            <div className="bg-slate-50 min-h-screen py-20">
                <div className="container mx-auto px-4 max-w-xl text-center">
                    <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl relative overflow-hidden">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100 shadow-inner">
                            <ShieldCheck className="w-10 h-10 animate-bounce" />
                        </div>
                        
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">Sukces!</h1>
                        <h2 className="text-xl font-bold text-green-600 mb-6 uppercase">Zamówienie zostało złożone</h2>
                        
                        <p className="text-slate-500 font-medium text-sm mb-8 leading-relaxed">
                            Dziękujemy za zakupy w <span className="font-black text-blue-500">FikuMiku</span>! Twoje zgłoszenie zostało bezpiecznie zapisane w naszej bazie danych. 
                        </p>

                        <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-left space-y-3 text-sm mb-8">
                            <div className="flex justify-between border-b pb-2"><span className="font-bold text-slate-400 uppercase text-xs">Numer zamówienia:</span><span className="font-mono font-black text-slate-800">{orderId}</span></div>
                            <div className="flex justify-between"><span className="font-bold text-slate-400 uppercase text-xs">Odbiorca:</span><span className="font-bold text-slate-700">{formData.fullName}</span></div>
                            <div className="flex justify-between"><span className="font-bold text-slate-400 uppercase text-xs">Adres dostawy:</span><span className="font-bold text-slate-700 text-right">{formData.address},<br/>{formData.postalCode} {formData.city}</span></div>
                        </div>

                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-md uppercase tracking-wider">
                            Wróć na stronę główną
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};