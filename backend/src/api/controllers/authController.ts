import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const login = (req: Request, res: Response) => {
    // Lógica para autenticar al usuario y generar un token seguro
    const user = { username: req.body.username };
    const token = jwt.sign(user, process.env.JWT_SECRET as string);
    res.status(200).json({ token });
}

export default {
    login
};

