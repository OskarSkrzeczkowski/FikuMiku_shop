import { useParams } from "react-router-dom";
import { Truck, ShieldCheck, ArrowLeft, Heart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

/**Komponent, który odpowiada za wyświetlenie intefejsu produktu.**/
export const ProductPage = () => {
  const { slug } = useParams();

  const productName = slug?.replace(/-/g, ' ');

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center text-sm font-bold text-blue-500 hover:text-blue-600 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          POWRÓT DO SKLEPU
        </Link>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-inner">
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                [GŁÓWNE ZDJĘCIE PRODUKTU]
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-400 transition shadow-sm"></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl font-black text-slate-900 capitalize mb-2">
                {productName}
              </h1>
            </div>

            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-sm text-slate-500 font-bold block mb-1">Cena brutto:</span>
              <span className="text-5xl font-black text-orange-500">Cena:BAZA DANYCH</span>
            </div>
         
            <div className="mb-8">
              <h3 className="text-sm font-black text-slate-800 uppercase mb-3">O produkcie:</h3>
              <p className="text-slate-600 leading-relaxed">
               Opis:BAZA DANYCH
              </p>
            </div>
              
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center justify-between border-2 border-slate-100 rounded-xl px-4 py-2 bg-white min-w-[140px]">
                <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-md transition"><Minus className="w-5 h-5" /></button>
                <span className="font-black text-lg">1</span>
                <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-md transition"><Plus className="w-5 h-5" /></button>
              </div>
              
              <button className="flex-grow bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3">
                DODAJ DO KOSZYKA
              </button>
              
              <button className="p-4 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition">
                <Heart className="w-6 h-6 text-slate-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Truck className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-slate-600">Dostawa w 24h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-slate-600">Bezpieczne certyfikowane materiały</span>
              </div>
            </div>

          </div>
        </div>
        <div className="mt-20">
          <div className="flex border-b border-slate-100 mb-8">
            <button className="border-b-4 border-blue-500 pb-4 px-8 text-sm font-black text-slate-800">OPIS SZCZEGÓŁOWY</button>
            <button className="pb-4 px-8 text-sm font-bold text-slate-400 hover:text-slate-600 transition">SPECYFIKACJA</button>
          </div>
          <div className="max-w-3xl prose prose-slate">
            <h2 className="text-2xl font-black mb-4 italic">Dlaczego warto wybrać {productName}?</h2>
            <p className="text-slate-600 mb-4">
             Opis:BAZA DANYCH
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Wiek: BAZA DANYCH</li>
                <li>Wymiary opakowania:BAZA DANYCH</li>
                <li>Gwarancja:BAZA DANYCH</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};