import React, { useState } from 'react';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; 

export const LoginPage = () => {
    const { login } = useAuth(); 
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(false);

        if (!email || !password) {
            setError('Uzupełnij wszystkie pola!');
            return;
        }

        setLoading(true);

        const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Coś poszło nie tak...');
            }

            setSuccess(data.message);
            
            if (isLoginMode) {
                login(data.user, data.token);
                
                setEmail('');
                setPassword('');
                
                alert('Zalogowano pomyślnie! Twój token został zapisany.');
                
                window.location.href = '/'; 
            } else {
                setIsLoginMode(true);
                setPassword('');
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
                
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2">
                        {isLoginMode ? 'Witaj w FikuMiku!' : 'Dołącz do FikuMiku!'}
                    </h2>
                    <p className="text-slate-500 font-medium">
                        {isLoginMode ? 'Zaloguj się, aby zarządzać swoimi zabawkami' : 'Założ konto i zbieraj punkty rabatowe'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-100 text-red-600 font-bold rounded-2xl text-sm text-center">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-100 text-green-600 font-bold rounded-2xl text-sm text-center">
                        {success}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2 ml-1">
                            Adres E-mail
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="twoj@email.pl"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 transition-colors font-medium"
                                disabled={loading}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-400 transition-colors font-medium"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'PRZETWARZANIE...' : isLoginMode ? 'ZALOGUJ SIĘ' : 'ZAREJESTRUJ SIĘ'}
                        {isLoginMode ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-100 pt-6">
                    <p className="text-slate-500 text-sm font-medium">
                        {isLoginMode ? 'Nie masz jeszcze konta?' : 'Masz już konto na FikuMiku?'} {' '}
                        <button 
                            type="button"
                            onClick={() => {
                                setIsLoginMode(!isLoginMode);
                                setError(null);
                                setSuccess(null);
                            }}
                            className="text-blue-500 font-black hover:underline cursor-pointer focus:outline-none"
                        >
                            {isLoginMode ? 'Założ je tutaj' : 'Zaloguj się tutaj'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};