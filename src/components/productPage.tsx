import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Truck, ShieldCheck, ArrowLeft, Heart, Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';

export const ProductPage = () => {
  const { slug } = useParams();
  
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchProduct = async () => {
          try {
              setIsLoading(true);
              const response = await fetch(`http://localhost:5000/api/products/${slug}`);
              
              if (!response.ok) {
                  throw new Error('Nie znaleziono produktu w bazie');
              }
              
              const data = await response.json();
              setProduct(data);
          } catch (err) {
              console.error(err);
              setError('Błąd ładowania produktu');
          } finally {
              setIsLoading(false);
          }
      };

      if (slug) {
          fetchProduct();
      }
  }, [slug]);

  if (isLoading) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h2 className="text-xl font-bold text-slate-700">Ładowanie produktu...</h2>
          </div>
      );
  }

  if (error || !product) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
              <h1 className="text-3xl font-black text-slate-800 mb-4">Nie znaleziono produktu</h1>
              <Link to="/" className="text-blue-500 font-bold hover:underline">Wróć do sklepu</Link>
          </div>
      );
  }

  const isFav = isFavorite(product._id);

  const handleAddToCart = () => {
      for (let i = 0; i < quantity; i++) {
          addToCart(product);
      }
      setQuantity(1);
      alert(`Dodano ${quantity} szt. produktu "${product.name}" do koszyka!`);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center text-sm font-bold text-blue-500 hover:text-blue-600 transition w-fit">
          <ArrowLeft className="w-4 h-4 mr-2" />
          POWRÓT DO SKLEPU
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-4">
            <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border-2 border-slate-50 shadow-inner">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Opcjonalne miniatury - zostawiam na przyszłość */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:border-blue-400 transition shadow-sm overflow-hidden">
                    <img src={product.img} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl font-black text-slate-900 capitalize mb-2">
                {product.name}
              </h1>
            </div>

            <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-sm text-slate-500 font-bold block mb-1">Cena brutto:</span>
              <span className="text-5xl font-black text-orange-500">
                  {product.price.toFixed(2).replace('.', ',')} PLN
              </span>
            </div>
         
            <div className="mb-8">
              <h3 className="text-sm font-black text-slate-800 uppercase mb-3">O produkcie:</h3>
              <p className="text-slate-600 leading-relaxed">
               Znakomita jakość wykonania. {product.name} to idealny wybór, który zapewni godziny świetnej i bezpiecznej zabawy!
              </p>
            </div>
              
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              
              <div className="flex items-center justify-between border-2 border-slate-100 rounded-xl px-4 py-2 bg-white min-w-35 select-none">
                <button 
                    onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                    className="text-blue-500 hover:bg-blue-50 p-1 rounded-md transition cursor-pointer"
                >
                    <Minus className="w-5 h-5" />
                </button>
                
                <span className="font-black text-lg w-8 text-center">{quantity}</span>
                
                <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="text-blue-500 hover:bg-blue-50 p-1 rounded-md transition cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                  onClick={handleAddToCart}
                  className="grow bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                DODAJ DO KOSZYKA
              </button>
              
              <button 
                  onClick={() => toggleFavorite(product)}
                  className={`p-4 border-2 rounded-2xl transition-colors cursor-pointer ${isFav ? 'border-red-100 bg-red-50' : 'border-slate-100 hover:bg-slate-50'}`}
              >
                <Heart className={`w-6 h-6 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'}`} />
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
            <h2 className="text-2xl font-black mb-4 italic">Dlaczego warto wybrać {product.name}?</h2>
            <p className="text-slate-600 mb-4">
             Produkt zaprojektowany z myślą o najmłodszych. Rozwija kreatywność, uczy cierpliwości oraz gwarantuje pełne bezpieczeństwo.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium mt-6">
                <li><span className="font-bold text-slate-800">Wiek:</span> Odpowiednie dla dzieci w wieku 3+</li>
                <li><span className="font-bold text-slate-800">Materiał:</span> Wysokiej jakości surowce przyjazne środowisku</li>
                <li><span className="font-bold text-slate-800">Gwarancja:</span> 24 miesiące</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};