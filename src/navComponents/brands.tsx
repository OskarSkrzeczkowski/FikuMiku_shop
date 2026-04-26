import { ToyBrick , Puzzle , Car, Box, Panda, ChessKing, Castle, MirrorRound} from 'lucide-react';

const BRANDS = [
    { id: 1, name: "LEGO", icon: <ToyBrick className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 2, name: "Fisher-Price", icon: <Panda className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 3, name: "Mattel", icon: <Car className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 4, name: "Hasbro", icon: <ChessKing className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 5, name: "Playmobil", icon: <Box className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 6, name: "Trefl", icon: <Puzzle className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 7, name: "Cobi", icon: <Castle className="w-5 h-5 text-blue-500 fill-blue-50" /> },
    { id: 8, name: "Barbie", icon: <MirrorRound className="w-5 h-5 text-blue-500 fill-blue-50" /> },
];

export const BrandsPage = () => {
    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                <div className="mb-12 border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-black text-slate-900 uppercase">
                        Nasze Marki
                    </h1>
                    <p className="text-slate-500 font-bold text-sm mt-1">
                        Współpracujemy z najlepszymi producentami zabawek
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {BRANDS.map((brand) => (
                        <div 
                            key={brand.id} 
                            className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-200 transition-all group cursor-pointer"
                        >
                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                {brand.icon}
                            </div>
                            <span className="font-black text-slate-800 uppercase text-sm">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-blue-50 rounded-3xl text-center">
                    <p className="text-slate-600 font-bold text-sm">
                        Chcesz zobaczyć więcej? Już wkrótce dodamy pełną listę naszych partnerów!
                    </p>
                </div>

            </div>
        </div>
    );
};