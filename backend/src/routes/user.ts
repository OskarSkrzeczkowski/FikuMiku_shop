import express, { Response } from 'express';
import { requireAuth, AuthRequest } from '../middlewares/authMiddleware';
import { UserModel } from '../models/user';

const router = express.Router();

router.get('/cart', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findById(req.user?.userId).populate('cart.productId');
        if (!user) { 
            res.status(404).json({ message: "Nie znaleziono użytkownika" }); 
            return; 
        }
        
        const formattedCart = user.cart
            .filter(item => item.productId)
            .map((item: any) => ({
                ...item.productId.toObject(),
                quantity: item.quantity
            }));
        
        res.status(200).json(formattedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Błąd serwera przy pobieraniu koszyka" });
    }
});

router.post('/cart', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { cart } = req.body; 
        
        const cartForDB = cart.map((item: any) => ({
            productId: item._id,
            quantity: item.quantity
        }));

        await UserModel.findByIdAndUpdate(req.user?.userId, { cart: cartForDB });
        res.status(200).json({ message: "Koszyk został pomyślnie zapisany w chmurze!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Błąd przy zapisywaniu koszyka" });
    }
});

router.get('/favorites', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await UserModel.findById(req.user?.userId).populate('favorites');
        if (!user) { 
            res.status(404).json({ message: "Nie znaleziono użytkownika" }); 
            return; 
        }
        
        res.status(200).json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Błąd serwera przy pobieraniu ulubionych" });
    }
});

router.post('/favorites', requireAuth, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { favorites } = req.body; 
        
        const favoritesForDB = favorites.map((item: any) => item._id);

        await UserModel.findByIdAndUpdate(req.user?.userId, { favorites: favoritesForDB });
        res.status(200).json({ message: "Ulubione zostały zsynchronizowane!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Błąd przy zapisywaniu ulubionych" });
    }
});

export default router;