import express, { Request, Response } from 'express';
import Product from '../models/product'; 

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Błąd pobierania produktów:", error);
        res.status(500).json({ message: "Błąd serwera przy pobieraniu produktów" });
    }
});

router.get('/search', async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.query.q as string;
        
        if (!searchQuery) {
            res.status(200).json([]);
            return;
        }

        const products = await Product.find({
            name: { $regex: searchQuery, $options: 'i' }
        });

        res.status(200).json(products);
    } catch (error) {
        console.error("Błąd wyszukiwania:", error);
        res.status(500).json({ message: "Błąd serwera podczas wyszukiwania" });
    }
});

router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: "Nie znaleziono produktu w bazie danych" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Błąd pobierania produktu:", error);
        res.status(500).json({ message: "Błąd serwera przy pobieraniu pojedynczego produktu" });
    }
});

export default router;