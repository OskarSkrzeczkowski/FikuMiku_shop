import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, Baby, Rocket, GraduationCap, Shapes, Sparkles, Clock, Star } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
    { name: 'Marki', path: '/marki' },
    { name: 'O nas', path: '/onas' },
    { name: 'Kontakt', path: '/kontakt' },
]

/*Komponent paska nawigacji */
export const HeaderTop = () => {

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const cartItemsCount = 3;

const categories = [
    { name: '0-2 LATA', icon: <Baby className="w-4 h-4" />, path: '/sklep/kategoria/0-2' },
    { name: '3-5 LAT', icon: <Rocket className="w-4 h-4" />, path: '/sklep/kategoria/3-5' },
    { name: '6+ LAT', icon: <GraduationCap className="w-4 h-4" />, path: '/sklep/kategoria/6plus' },
    { name: 'EDUKACYJNE', icon: <Shapes className="w-4 h-4" />, path: '/sklep/kategoria/edukacyjne' },
];

const newsItems = [
    { name: 'Dostawa z tego tygodnia', icon: <Clock className="w-4 h-4" />, path: '/sklep/nowosc/ostatnie' },
    { name: 'Bestsellery miesiąca', icon: <Star className="w-4 h-4" />, path: '/sklep/nowosc/bestsellery' },
    { name: 'Nadchodzące hity', icon: <Sparkles className="w-4 h-4" />, path: '/sklep/nowosc/zapowiedzi' },
];
    return (
        <header className="bg-blue-400 text-white shadow-md">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                
                <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
                    <span className="text-2xl font-black text-white drop-shadow-sm">
                        Fiku<span className="text-orange-200">Miku</span>
                    </span>
                </Link>

                <nav className="hidden lg:flex gap-5 font-bold text-sm items-center">
                    
                    {/*Zakladka kategorie, lista do kategorii*/}
                    <div 
                         className="relative flex items-center group"
                         onMouseEnter={() => setOpenMenu('categories')}
                         onMouseLeave={() => setOpenMenu(null)}
                    >

                    <button className="flex items-center gap-1 hover:text-orange-200 transition h-full py-4 tracking-wider cursor-pointer">
                    Kategorie
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'categories' ? 'rotate-180' : ''}`} />
                    </button>

                    {openMenu === 'categories' && (
                        <div className="absolute top-full left-0 w-64 bg-white rounded-b-2xl shadow-2xl py-3 border-t-0 border border-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                            {categories.map((cat) => (
                                <Link 
                                    key={cat.name} 
                                    to={cat.path}
                                    className="flex items-center gap-4 px-5 py-3 hover:bg-blue-50 hover:text-blue-600 transition group/item"
                                >
                                    <div className="p-2 bg-blue-50 rounded-xl text-blue-500 group-hover/item:bg-blue-100 transition-colors">
                                        {cat.icon}
                                    </div>
                                        <span className="font-bold text-xs">{cat.name}</span>
                                </Link>
                            ))}
                        </div>
                        )}
                    </div>
                    
                    {/*Zakladka nowości, lista do przeglądu nowości itp. */}
                    <div 
                        className="relative flex items-center group"
                        onMouseEnter={() => setOpenMenu('news')}
                        onMouseLeave={() => setOpenMenu(null)}
                    >

                    <button className="flex items-center gap-1 hover:text-orange-200 transition h-full py-4 tracking-wider cursor-pointer">
                    Nowości
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMenu === 'news' ? 'rotate-180' : ''}`} />
                    </button>

                    {openMenu === 'news' && (

                        <div className="absolute top-full left-0 w-64 bg-white rounded-b-2xl shadow-2xl py-3 border-t-0 border border-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                            {newsItems.map((item) => (
                                <Link 
                                    key={item.name} 
                                    to={item.path}
                                    className="flex items-center gap-4 px-5 py-3 hover:bg-orange-50 hover:text-orange-600 transition group/item"
                                >
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
                        <Link 
                            key={link.name} 
                            to={link.path} 
                            className="hover:text-blue-200 transition"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    
                    <div className="relative hidden md:block">
                        <input 
                            type="text" 
                            placeholder="Szukaj..." 
                            className="py-1.5 pl-4 pr-10 rounded-full text-white-800 w-56 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-blue-300" 
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-white bg-white/20 hover:bg-blue-400 rounded-full p-1 transition">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-5 text-[11px] font-bold tracking-wide">
                        <Link to="/logowanie" className="flex flex-col items-center hover:text-blue-200 transition">
                            <User className="w-5 h-5 mb-0.5" />
                            <span>Konto</span>
                        </Link>
                        
                        <Link to="/ulubione" className="flex flex-col items-center hover:text-blue-200 transition">
                            <Heart className="w-5 h-5 mb-0.5" />
                            <span>Lista</span>
                        </Link>
                        
                        <Link to="/koszyk" className="flex flex-col items-center hover:text-blue-200 transition relative">
                            <ShoppingCart className="w-5 h-5 mb-0.5" />
                            <span>Koszyk</span>
                            
                            {cartItemsCount >= 0 && (
                                <span className="absolute -top-1 -right-2 bg-orange-200 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center border border-white-200">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};