import { Link } from 'react-router-dom';
export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-10 mt-10 border-4 border-slate-900">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 ">
                <div className="flex gap-8 text-xs font-bold tracking-widest">
                    <Link to="/onas" className="hover:text-blue-300">O NAS</Link>
                    <Link to="/kontakt" className="hover:text-blue-300">KONTAKT</Link>
                    <Link to="/polityka" className="hover:text-blue-300">POLITYKA PRYWATNOŚCI</Link>
                </div>
                <div className="text-[10px] text-gray-400">
                    2026 FikuMiku
                </div>
            </div>
        </footer>
    );
};