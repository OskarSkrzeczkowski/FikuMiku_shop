import { ShoppingCart, Baby, Rocket, GraduationCap, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom'; 

/*Komponent przedziałów wiekowych*/
export const Categories = () => {
    const categories = [
        { name: '0-2 LATA', icon: <Baby className="w-10 h-10" />, path: '/0-2' },
        { name: '3-5 LAT', icon: <Rocket className="w-10 h-10" />, path: '/3-5' },
        { name: '6+ LAT', icon: <GraduationCap className="w-10 h-10" />, path: '/6+' },
        { name: 'ZABAWKI EDUKACYJNE', icon: <Shapes className="w-10 h-10" />, path: '/edukacyjne' },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-black mb-10 tracking-tight">POLECANE KATEGORIE</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat) => (
                        <div key={cat.name} className="flex flex-col items-center group cursor-pointer">
                            <div className="w-24 h-24 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-500 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
                                {cat.icon}
                            </div>
                            <span className="font-bold text-sm text-center tracking-wide">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/*Komponent najczęściej sprzedawanych produktow*/ 
export const Bestsellers = () => {
    const products = [
    { id: 1, name: "Klocki drewniane", price: "29,99 PLN", img: "src/assets/photo4.jpg", slug: "klocki-drewniane" },
    { id: 2, name: "Telefonik", price: "19,99 PLN", img: "src/assets/photo1.jpg", slug: "telefonik-interaktywny" },
    { id: 3, name: "Układanka Edukacyjna", price: "29,99 PLN", img: "src/assets/photo3.jpg", slug: "ukladanka-edukacyjna" },
    { id: 4, name: "Gitara", price: "59,99 PLN", img: "src/assets/photo2.jpg", slug: "gitara-dla-dzieci" },
];
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 ">
                <h2 className="text-2xl font-black mb-10 tracking-tight italic">BESTSELLERY</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:scale-105 transition-transform duration-300 cursor-pointer">
                            <Link to={`/produkt/${product.slug}`} className="flex-grow">
                            <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-100 ">
                                <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
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
            </div>
        </section>
    );
};

/*Komponent stopki*/ 
export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-10 mt-10 border-4 border-slate-900">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 ">
                <div className="flex gap-8 text-xs font-bold tracking-widest">
                    <a href="#" className="hover:text-blue-300">O NAS</a>
                    <a href="#" className="hover:text-blue-300">KONTAKT</a>
                    <a href="#" className="hover:text-blue-300">POLITYKA PRYWATNOŚCI</a>
                </div>
                <div className="text-[10px] text-gray-400">
                    2026 FikuMiku
                </div>
            </div>
        </footer>
    );
};