import { Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Witaj w FikuMiku!</h2>
                    <p className="text-slate-500 font-medium">Zaloguj się, aby zarządzać swoimi zabawkami</p>
                </div>

                <form className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 ml-1">
                            Adres E-mail
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="email" 
                                placeholder="twoj@email.pl"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 transition-colors font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 ml-1">
                            Hasło
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 transition-colors font-medium"
                            />
                        </div>
                    </div>

                    <button 
                        type="button"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
                    >
                        ZALOGUJ SIĘ
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-100 pt-6">
                    <p className="text-slate-500 text-sm font-medium">
                        Nie masz konta? {' '}
                        <Link to="/rejestracja" className="text-blue-500 font-black hover:underline">
                            Załóż je tutaj
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};