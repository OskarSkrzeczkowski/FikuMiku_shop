import { Baby, Rocket, GraduationCap, Shapes } from 'lucide-react';
import { Link } from 'react-router-dom';
export const Categories = () => {
    const categories = [
        { name: '0-2 LATA', icon: <Baby className="w-10 h-10" />, path: '/sklep/kategoria/0-2' },
        { name: '3-5 LAT', icon: <Rocket className="w-10 h-10" />, path: '/sklep/kategoria/3-5' },
        { name: '6+ LAT', icon: <GraduationCap className="w-10 h-10" />, path: '/sklep/kategoria/6plus' },
        { name: 'ZABAWKI EDUKACYJNE', icon: <Shapes className="w-10 h-10" />, path: '/sklep/kategoria/edukacyjne' },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-black mb-10 tracking-tight">POLECANE KATEGORIE</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.path} className="flex flex-col items-center group cursor-pointer">
                            <div className="w-24 h-24 rounded-full border-2 border-blue-400 flex items-center justify-center text-blue-500 group-hover:bg-blue-400 group-hover:text-white transition-all duration-300 mb-4 shadow-sm">
                                {cat.icon}
                            </div>
                            <span className="font-bold text-sm text-center tracking-wide">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};