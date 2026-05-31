import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, Baby, Rocket, GraduationCap, Shapes, Sparkles, Clock, Star, LogOut, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext'; 
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';

const NAV_LINKS = [
    { name: 'Marki', path: '/marki' },
    { name: 'O nas', path: '/onas' },
    { name: 'Kontakt', path: '/kontakt' },
];

export const HeaderTop = () => {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const { user, logout } = useAuth(); 
    const { totalItemsCount, clearCart } = useCart();
    const { favoritesCount, clearFavorites } = useFavorites();

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (searchTerm.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsSearching(true);
            try {
                const response = await fetch(`http://localhost:5000/api/products/search?q=${searchTerm}`);
                if (response.ok) {
                    const data = await response.json();
                    setSuggestions(data.slice(0, 5));
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error("Błąd podpowiedzi wyszukiwania:", error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearchSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/szukaj?q=${searchTerm}`);
            setShowSuggestions(false);
            setSearchTerm('');
        }
    };

    const handleLogout = () => {
        logout();         
        clearCart();      
        clearFavorites(); 
    };

    const categories = [
        { name: '0-2 LATA', icon: <Baby className="w-4 h-4" />, path: '/sklep/kategoria/0-2#pasek-kategorii' },
        { name: '3-5 LAT', icon: <Rocket className="w-4 h-4" />, path: '/sklep/kategoria/3-5#pasek-kategorii' },
        { name: '6+ LAT', icon: <GraduationCap className="w-4 h-4" />, path: '/sklep/kategoria/6plus#pasek-kategorii' },
        { name: 'EDUKACYJNE', icon: <Shapes className="w-4 h-4" />, path: '/sklep/kategoria/edukacyjne#pasek-kategorii' },
    ];

    const newsItems = [
        { name: 'Dostawa z tego tygodnia', icon: <Clock className="w-4 h-4" />, path: '/sklep/nowosc/ostatnie' },
        { name: 'Bestsellery miesiąca', icon: <Star className="w-4 h-4" />, path: '/sklep/nowosc/bestsellery' },
        { name: 'Nadchodzące hity', icon: <Sparkles className="w-4 h-4" />, path: '/sklep/nowosc/zapowiedzi' },
    ];

    return (
        <header className="bg-blue-400 text-white shadow-md relative z-50">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                
                <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
                    <span className="text-2xl font-black text-white drop-shadow-sm">
                        Fiku<span className="text-orange-200">Miku</span>
                    </span>
                </Link>

                <nav className="hidden lg:flex gap-5 font-bold text-sm items-center">
                    <div 
                         className="relative flex items-center group"
                         onMouseEnter={() => setOpenMenu('categories')}
                         onMouseLeave={() => setOpenMenu(null)}
                    >
                        <button 
                            onClick={() => {
                                if (window.location.pathname === '/') {
                                    document.getElementById('pasek-kategorii')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    navigate('/#pasek-kategorii');
                                }
                                    setOpenMenu(null);
                            }}
                            className="flex items-center gap-1 hover:text-orange-200 transition h-full py-4 tracking-wider cursor-pointer"
                        >
                            Kategorie
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'categories' ? 'rotate-180' : ''}`} />
                        </button>

                        {openMenu === 'categories' && (
                            <div className="absolute top-full left-0 w-64 bg-white rounded-b-2xl shadow-2xl py-3 border-t-0 border border-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                                {categories.map((cat) => (
                                    <Link key={cat.name} to={cat.path} className="flex items-center gap-4 px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition group/item">
                                        <div className="p-2 bg-blue-50 rounded-xl text-blue-500 group-hover/item:bg-blue-100 transition-colors">
                                            {cat.icon}
                                        </div>
                                        <span className="font-bold text-xs">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div 
                        className="relative flex items-center group"
                        onMouseEnter={() => setOpenMenu('news')}
                        onMouseLeave={() => setOpenMenu(null)}
                    >
                        <button 
                            onClick={() => {
                                if (window.location.pathname === '/') {
                                    document.getElementById('bestsellery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    navigate('/#bestsellery');
                                }
                                setOpenMenu(null);
                            }}
                            className="flex items-center gap-1 hover:text-orange-200 transition h-full py-4 tracking-wider cursor-pointer"
                        >
                            Nowości
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'news' ? 'rotate-180' : ''}`} />
                        </button>

                        {openMenu === 'news' && (
                            <div className="absolute top-full left-0 w-64 bg-white rounded-b-2xl shadow-2xl py-3 border-t-0 border border-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                                {newsItems.map((item) => (
                                    <Link key={item.name} to={item.path} className="flex items-center gap-4 px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition group/item">
                                        <div className="p-2 bg-orange-50 rounded-xl text-orange-500 group-hover/item:bg-orange-100 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="font-bold text-xs">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {NAV_LINKS.map((link) => (
                        <Link key={link.name} to={link.path} className="hover:text-blue-200 transition">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    
                    <form 
                        ref={searchRef} 
                        onSubmit={handleSearchSubmit} 
                        className="relative hidden md:block"
                    >
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true) }}
                            placeholder="Szukaj zabawek..." 
                            className="py-2 pl-4 pr-10 rounded-full text-slate-800 w-64 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white shadow-inner transition-all placeholder:text-slate-400" 
                        />
                        <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 cursor-pointer text-white bg-orange-400 hover:bg-orange-500 rounded-full p-1.5 transition">
                            <Search className="w-4 h-4" />
                        </button>

                        {showSuggestions && searchTerm.length >= 2 && (
                            <div className="absolute top-full mt-3 left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                                {isSearching ? (
                                    <div className="p-6 flex justify-center items-center gap-3 text-slate-400 font-bold text-sm">
                                        <Loader2 className="w-5 h-5 animate-spin" /> Szukam...
                                    </div>
                                ) : suggestions.length > 0 ? (
                                    <div className="flex flex-col">
                                        {suggestions.map((item) => (
                                            <Link 
                                                key={item._id} 
                                                to={`/produkt/${item.slug}`}
                                                onClick={() => {
                                                    setShowSuggestions(false);
                                                    setSearchTerm('');
                                                }}
                                                className="flex items-center gap-3 p-3 hover:bg-blue-50 transition border-b border-slate-50 last:border-0"
                                            >
                                                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="text-xs font-bold text-slate-800 truncate">{item.name}</span>
                                                    <span className="text-[11px] font-black text-orange-500">{item.price.toFixed(2).replace('.', ',')} PLN</span>
                                                </div>
                                            </Link>
                                        ))}
                                        <button 
                                            type="button"
                                            onClick={() => handleSearchSubmit()}
                                            className="w-full bg-slate-50 p-3 text-xs font-black text-blue-500 hover:bg-blue-100 transition text-center border-t border-slate-100 cursor-pointer"
                                        >
                                            ZOBACZ WSZYSTKIE WYNIKI
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center">
                                        <p className="text-slate-500 text-sm font-bold mb-1">Brak wyników</p>
                                        <p className="text-xs text-slate-400">Spróbuj wpisać inną nazwę.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                    
                    <div className="flex items-center gap-5 text-[11px] font-bold tracking-wide">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/zamowienia" 
                                    className="text-orange-200 font-black uppercase tracking-wider hover:text-orange-100 hover:underline transition"
                                    title="Zobacz historię zamówień"
                                >
                                    Cześć, {user.email.split('@')[0]}!
                                </Link>
                                <button onClick={handleLogout} className="flex flex-col items-center hover:text-orange-200 transition cursor-pointer">
                                    <LogOut className="w-5 h-5 mb-0.5" />
                                    <span>Wyloguj</span>
                                </button>
                            </div>
                        ) : (
                            <Link to="/logowanie" className="flex flex-col items-center hover:text-blue-200 transition">
                                <User className="w-5 h-5 mb-0.5" />
                                <span>Konto</span>
                            </Link>
                        )}
                        
                        <Link to="/ulubione" className="flex flex-col items-center hover:text-blue-200 transition relative">
                            <Heart className="w-5 h-5 mb-0.5" />
                            <span>Lista</span>
                            {favoritesCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border border-white-200">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>
                        
                        <Link to="/koszyk" className="flex flex-col items-center hover:text-blue-200 transition relative">
                            <ShoppingCart className="w-5 h-5 mb-0.5" />
                            <span>Koszyk</span>
                            {totalItemsCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-orange-200 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border border-white-200">
                                    {totalItemsCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};