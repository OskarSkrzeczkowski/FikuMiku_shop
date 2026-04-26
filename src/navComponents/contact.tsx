import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage = () => {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                
                <div className="mb-12 border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 uppercase">
                        Kontakt
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                        Masz pytania? Chętnie na nie odpowiemy!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    <div className="space-y-8">
                        <p className="text-slate-600 font-medium">
                            Jesteśmy do Twojej dyspozycji od poniedziałku do piątku w godzinach 8:00 - 16:00. 
                            Skontaktuj się z nami telefonicznie, mailowo lub odwiedź nas osobiście.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase">Zadzwoń do nas</p>
                                    <p className="font-black text-slate-800">+48 465 324 976</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase">Napisz e-mail</p>
                                    <p className="font-black text-slate-800">sklep@fikumiku.pl</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-400 uppercase">Odwiedź nas</p>
                                    <p className="font-black text-slate-800">ul. Chrobrego 23, 62-200 Gniezno</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Twoje Imię</label>
                                <input 
                                    type="text" 
                                    placeholder="Jan Kowalski"
                                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 transition-colors font-medium text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">E-mail</label>
                                <input 
                                    type="email" 
                                    placeholder="twoj@email.pl"
                                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 transition-colors font-medium text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase mb-1 ml-1">Wiadomość</label>
                                <textarea 
                                    rows={4}
                                    placeholder="W czym możemy pomóc?"
                                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-400 transition-colors font-medium text-sm resize-none"
                                ></textarea>
                            </div>
                            <button 
                                type="button"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black py-4 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-sm"
                            >
                                <Send className="w-4 h-4" />
                                WYŚLIJ WIADOMOŚĆ
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};