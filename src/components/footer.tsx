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