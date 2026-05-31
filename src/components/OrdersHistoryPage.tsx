import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { type Order } from '../types';
import { Calendar, Package, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrdersHistoryPage = () => {
    const { user } = useAuth(); 
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.email) {
                setLoading(false);
                return;
            }

            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/orders/user/${user.email}`);
                
                if (!response.ok) throw new Error('Nie udało się pobrać historii zamówień');
                
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error("Błąd ładowania zamówień:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const toggleExpand = (id: string) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    const getStatusTranslation = (status: string) => {
        switch (status) {
            case 'pending': return { text: 'Oczekujące', color: 'bg-amber-50 text-amber-700 border-amber-200' };
            case 'processing': return { text: 'W realizacji', color: 'bg-blue-50 text-blue-700 border-blue-200' };
            case 'completed': return { text: 'Zakończone', color: 'bg-green-50 text-green-700 border-green-200' };
            default: return { text: status, color: 'bg-slate-50 text-slate-700 border-slate-200' };
        }
    };

    if (!user) {
        return (
            <div className="bg-slate-50 min-h-screen py-24 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm">
                    <h2 className="text-xl font-black text-slate-800 uppercase mb-2">Zaloguj się</h2>
                    <p className="text-slate-500 font-bold mb-6 text-sm">Musisz być zalogowany, aby zobaczyć historię swoich zamówień.</p>
                    <Link to="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-8 py-3 rounded-xl transition-all text-sm">ZALOGUJ SIĘ</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-10 border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                        Twoje Zamówienia <Package className="text-blue-500 w-7 h-7" />
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                        Przeglądaj historię swoich zakupów w sklepie FikuMiku
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12 font-bold text-slate-400">Ładowanie historii zamówień...</div>
                ) : orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const isExpanded = expandedOrderId === order._id;
                            const status = getStatusTranslation(order.status);
                            const orderDate = new Date(order.createdAt).toLocaleDateString('pl-PL', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            });

                            return (
                                <div key={order._id} className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden transition-all">
                                    <div 
                                        onClick={() => order._id && toggleExpand(order._id)}
                                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{orderDate}</span>
                                            </div>
                                            <div className="font-black text-slate-800 text-sm sm:text-base">
                                                ID: <span className="font-mono text-slate-500 font-medium">{order._id}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6">
                                            <div className="text-left sm:text-right">
                                                <div className="text-xs font-black text-slate-400 uppercase">Wartość</div>
                                                <div className="font-black text-lg text-orange-500">{order.totalPrice.toFixed(2)} PLN</div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border-2 ${status.color}`}>
                                                {status.text}
                                            </span>
                                            {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400 hidden sm:block" /> : <ChevronDown className="w-5 h-5 text-slate-400 hidden sm:block" />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="border-t-2 border-slate-50 p-6 bg-slate-50/30 space-y-6">
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Zakupione zabawki</h4>
                                                <div className="bg-white rounded-2xl border-2 border-slate-100 divide-y divide-slate-50 overflow-hidden">
                                                    {order.items.map((item) => (
                                                        <div key={item._id} className="p-4 flex items-center gap-4">
                                                            <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-xl border" />
                                                            <div className="grow">
                                                                <div className="font-black text-slate-800 text-sm uppercase">{item.name}</div>
                                                                <div className="text-xs font-bold text-slate-400">Ilość: {item.quantity} x {item.price.toFixed(2)} PLN</div>
                                                            </div>
                                                            <div className="font-black text-sm text-slate-900">{(item.price * item.quantity).toFixed(2)} PLN</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                                                <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 space-y-1">
                                                    <div className="font-black text-slate-400 uppercase tracking-wider mb-1">Dane Odbiorcy</div>
                                                    <div>{order.customer.fullName}</div>
                                                    <div>Tel: {order.customer.phone}</div>
                                                    <div>Email: {order.customer.email}</div>
                                                </div>
                                                <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 space-y-1">
                                                    <div className="font-black text-slate-400 uppercase tracking-wider mb-1">Adres dostawy</div>
                                                    <div>{order.customer.address}</div>
                                                    <div>{order.customer.postalCode} {order.customer.city}</div>
                                                    <div className="text-blue-500 font-black mt-1 uppercase text-[10px]">
                                                        Metoda: {order.customer.deliveryMethod === 'courier' ? 'Kurier' : order.customer.deliveryMethod === 'parcel_locker' ? 'Paczkomat' : 'Odbiór osobisty'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"><ShoppingBag className="w-10 h-10 text-slate-300" /></div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase">Brak zamówień</h2>
                        <p className="text-slate-500 font-bold mb-8">Nie złożyłeś jeszcze żadnego zamówienia w naszym sklepie.</p>
                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-md">ZACZNIJ ZAKUPY</Link>
                    </div>
                )}
            </div>
        </div>
    );
};