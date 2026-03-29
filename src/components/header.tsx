import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
    { name: 'Marki', path: '/marki' },
    { name: 'Oferty', path: '/oferty' },
    { name: 'Kontakt', path: '/przewodnik' },
]

export const HeaderTop = () => {

    const cartItemsCount = 0;

    return (
        <header className="bg-blue-400 text-white shadow-md">
            <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
                
                <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
                    <span className="text-2xl font-black text-white drop-shadow-sm">
                        Fiku<span className="text-orange-200">Miku</span>
                    </span>
                </Link>

                <nav className="hidden lg:flex gap-5 font-bold text-sm items-center">
                    
                    <div className="flex items-center cursor-pointer hover:text-blue-200 transition group">
                        <span>Nowości</span>
                        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
                    </div>
                    
                    <div className="flex items-center cursor-pointer hover:text-blue-200 transition group">
                        <span>Kategorie</span>
                        <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
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
                        <Link to="/konto" className="flex flex-col items-center hover:text-blue-200 transition">
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