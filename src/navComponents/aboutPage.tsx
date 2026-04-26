import { Heart, ShieldCheck, Sparkles, Smile } from 'lucide-react';

export const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-orange-50 py-16 lg:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase italic">
                        Witaj w <span className="text-orange-500">FikuMiku</span>!
                    </h1>
                    <p className="text-slate-600 font-medium max-w-2xl mx-auto text-lg">
                        Naszą misją jest dostarczanie radości i wspieranie rozwoju dzieci poprzez 
                        mądrą zabawę. Wierzymy, że każda zabawka to początek nowej, wielkiej przygody.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="font-black text-slate-800 mb-2">Z PASJI</h3>
                        <p className="text-sm text-slate-500 font-medium">Kochamy zabawki tak samo mocno jak dzieci.</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="font-black text-slate-800 mb-2">BEZPIECZEŃSTWO</h3>
                        <p className="text-sm text-slate-500 font-medium">Tylko certyfikowane i sprawdzone produkty.</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8" />
                        </div>
                        <h3 className="font-black text-slate-800 mb-2">KREATYWNOŚĆ</h3>
                        <p className="text-sm text-slate-500 font-medium">Stawiamy na zabawki, które uczą i bawią.</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Smile className="w-8 h-8" />
                        </div>
                        <h3 className="font-black text-slate-800 mb-2">UŚMIECH</h3>
                        <p className="text-sm text-slate-500 font-medium">Twoja satysfakcja jest dla nas najważniejsza.</p>
                    </div>

                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white overflow-hidden relative">
                    <div className="relative z-10 max-w-3xl">
                        <h2 className="text-3xl font-black mb-6 italic">Dlaczego FikuMiku?</h2>
                        <div className="space-y-4 text-slate-300 font-medium">
                            <p>
                                FikuMiku powstało z marzenia o stworzeniu miejsca, w którym rodzice mogą znaleźć 
                                wysokiej jakości zabawki od najlepszych światowych producentów w jednym miejscu.
                            </p>
                            <p>
                                Każdy produkt w naszym sklepie jest starannie wybierany. Nie szukamy tysięcy 
                                przypadkowych przedmiotów – szukamy tych, które faktycznie wnoszą wartość do 
                                życia dziecka i wytrzymają lata intensywnej zabawy.
                            </p>
                            <p>
                                Twórcami strony są dwa tajemnicze Oskary.
                            </p>
                        </div>
                    </div>
                   
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};