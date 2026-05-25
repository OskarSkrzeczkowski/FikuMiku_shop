import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user';

const router: Router = express.Router();


router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

    
        if (!email || !password) {
            res.status(400).json({ message: "E-mail i hasło są wymagane!" });
            return;
        }

       
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Użytkownik o takim e-mailu już istnieje!" });
            return;
        }

      
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        const newUser = new UserModel({
            email,
            passwordHash: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Konto FikuMiku zostało pomyślnie utworzone!" });
    } catch (error) {
        console.error(" Błąd podczas rejestracji:", error);
        res.status(500).json({ message: "Błąd serwera podczas rejestracji." });
    }
});


router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            res.status(400).json({ message: "E-mail i hasło są wymagane!" });
            return;
        }

        
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Nieprawidłowy e-mail lub hasło." });
            return;
        }

        
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        console.log("Czy hasło poprawne:", isPasswordCorrect);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Nieprawidłowy e-mail lub hasło." });
            return;
        }

        
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '7d' }
        );

        
        res.status(200).json({
            message: "Zalogowano pomyślnie!",
            token,
            user: { email: user.email }
        });
    } catch (error) {
        console.error(" Błąd podczas logowania:", error);
        res.status(500).json({ message: "Błąd serwera podczas logowania." });
    }
});

export default router;