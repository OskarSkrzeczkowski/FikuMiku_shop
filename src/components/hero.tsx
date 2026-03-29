export const HeroBanner = () => {
    return (
        <section className="relative bg-blue-300 overflow-hidden">
            <div className="absolute top-[-10%] left-[40%] w-[80%] h-[120%] bg-blue-300 rounded-full blur-2xl opacity-60 pointer-events-none mix-blend-multiply"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] bg-blue-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div className="text-white max-w-lg">
                    <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-[1.1] drop-shadow-sm">
                        ZBUDUJ, STWÓRZ,<br />ODKRYJ!
                    </h1>
                    <p className="text-lg lg:text-xl font-medium mb-10 text-white/95 leading-relaxed">
                        Rozwijaj wyobraźnię i umiejętności dzięki naszym kreatywnym zestawom.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-8 rounded-full text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        ODKRYJ MAGIĘ NAUKI
                    </button>
                </div>

                <div className="relative h-[450px] w-full flex justify-center items-center">
                    
                    <div className="absolute right-[20%] top-0 w-64 h-80 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-black shadow-xl z-10 cursor-pointer hover:scale-105 transition-transform duration-300 ">
                        <img src="src/assets/photo1.jpg" alt="Namiot Tipi" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-[10%] left-[37%] bg-white text-cyan-900 font-bold px-4 py-1 rounded-md shadow-lg border-2 border-cyan-900 z-30 text-sm whitespace-nowrap">
                        Telefonik: 19.99
                    </div>

                    <div className="absolute top-[-5%] right-14 w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl z-20 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <img src="src/assets/photo2.jpg" alt="Dziecko bawiące się" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-[20%] right-[9%] bg-white text-cyan-900 font-bold px-4 py-1 rounded-md shadow-lg border-2 border-cyan-900 z-30 text-sm whitespace-nowrap">
                        Gitara: 59.99
                    </div>

                    <div className="absolute bottom-[5%] left-[20%] w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-xl z-20 cursor-pointer hover:scale-105 transition-transform duration-300">
                        <img src="src/assets/photo3.jpg" alt="Szczęśliwe dziecko" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-[5%] left-[28%] bg-white text-cyan-900 font-bold px-4 py-1 rounded-md shadow-lg border-2 border-cyan-900 z-30 text-sm whitespace-nowrap">
                        Ukladanka: 29.99
                    </div>

                    <div className="absolute bottom-8 right-[5%] w-48 h-48 rounded-[40px] overflow-hidden border-4 border-white shadow-xl z-10 bg-white cursor-pointer hover:scale-105 transition-transform duration-300">
                        <img src="src/assets/photo4.jpg" alt="Klocki magnetyczne" className="w-full h-full object-cover scale-110" />
                    </div>
                    <div className="absolute bottom-8 right-2 bg-white text-cyan-900 font-bold px-4 py-1 rounded-md shadow-lg border-2 border-cyan-900 z-30 text-sm whitespace-nowrap">
                        Inteligentne klocki: 39.99
                    </div>
                </div>
            </div>
        </section>
    );
};