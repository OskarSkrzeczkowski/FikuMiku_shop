import { Router, Request, Response } from 'express';
import Order from '../models/orders'; 

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const { customer, items, totalPrice } = req.body;

        if (!customer || !items || !totalPrice) {
            res.status(400).json({ success: false, message: 'Brakujące dane zamówienia.' });
            return;
        }

        const newOrder = new Order({
            customer,
            items,
            totalPrice,
            status: 'pending',
            createdAt: new Date()
        });

        await newOrder.save();

        res.status(201).json({
            success: true,
            message: 'Zamówienie zostało złożone pomyślnie.',
            order: newOrder
        });
    } catch (error) {
        console.error('Błąd podczas składania zamówienia:', error);
        res.status(500).json({
            success: false,
            message: 'Wystąpił błąd serwera podczas składania zamówienia.'
        });
    }
});

router.get('/user/:email', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;

        const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error('Błąd pobierania zamówień z bazy:', error);
        res.status(500).json({
            success: false,
            message: 'Błąd serwera podczas pobierania zamówień.'
        });
    }
});

export default router;