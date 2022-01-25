import { NextApiRequest, NextApiResponse } from "next";

import JwtService from "../../services/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(404).send('Route not found');

    const { password } = req.body;

    if (!password || !password.trim())
        return res.status(400).json({ message: 'Senha de acesso incorreta.' });

    if (password === process.env.PASSWORD_MASTER) {
        const token = new JwtService().generateToken();
        res.status(200).json({ token });
    } else {
        res.status(400).json({ message: 'Senha de acesso incorreta.' });
    }

}