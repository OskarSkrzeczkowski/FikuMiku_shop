import { useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Symulacja bazy danych - tymczasowa */
const ALL_PRODUCTS = [
    { id: 1, name: "Klocki drewniane", price: "29,99 PLN", category: "0-2", tag: "bestsellery", slug: "klocki-drewniane" },
    { id: 2, name: "Telefonik", price: "19,99 PLN", category: "3-5", tag: "nowosci", slug: "telefonik-interaktywny" },
];

export const ProductsPage = () => {

    const { type, value } = useParams();

    const filteredProducts = ALL_PRODUCTS.filter(product => {
        if (type === 'kategoria') {
            return product.category === value;
        }
        if (type === 'nowosc') {
            return product.tag === value;
        }
        return true;
    });

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                        {type === 'kategoria' ? `Produkty dla wieku: ${value}` : `Sekcja: ${value}`}
                    </h1>
                    <p className="text-slate-500">Znaleziono {filteredProducts.length} produktów</p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:scale-105 transition-transform duration-300">
                                <Link to={`/produkt/${product.slug}`}>
                                    <div className="aspect-square rounded-xl bg-gray-100 mb-4 overflow-hidden">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                            [ZDJĘCIE]
                                        </div>
                                    </div>
                                    <h3 className="font-medium text-gray-800 text-sm mb-1">{product.name}</h3>
                                    <p className="font-black text-lg mb-4">{product.price}</p>
                                </Link>
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    DODAJ DO KOSZYKA
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-bold">Brak produktów w tej kategorii.</p>
                    </div>
                )}
            </div>
        </div>
    );
};