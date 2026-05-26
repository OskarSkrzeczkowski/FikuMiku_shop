import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        console.log("--- START DEBUGOWANIA BAZY ---");

       
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("Brak MONGO_URI! Plik .env nie załadował się poprawnie.");
        }

        console.log(`1. Odczytano link: TAK (długość: ${uri.length} znaków)`);
        console.log(`2. Silnik Mongoose w wersji: ${mongoose.version}`);

        
        mongoose.connection.on('connecting', () => console.log(' -> [Zdarzenie] Inicjalizacja połączenia...'));
        mongoose.connection.on('connected', () => console.log(' -> [Zdarzenie] Nawiązano fizyczne połączenie!'));
        mongoose.connection.on('error', (err) => console.error(' -> [Zdarzenie] Błąd z wnętrza Mongoose:', err.message));

        console.log("3. Wywołuję mongoose.connect()...");

      
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, 
            bufferCommands: false
        });

        console.log(`4. SUKCES! Połączono z hostem: ${conn.connection.host}`);
        console.log("--- KONIEC DEBUGOWANIA ---");

    } catch (error) {
        console.error(` GŁÓWNY BŁĄD (Catch): ${(error as Error).message}`);
    }
};