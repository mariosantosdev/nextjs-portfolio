import { NextApiRequest, NextApiResponse } from "next";

import JwtService from "../../services/jwt";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'POST':
                const { password } = req.body;

                if (!password || !password.trim())
                    return res.status(400).json({ message: 'Senha de acesso incorreta.' });

                if (password === process.env.PASSWORD_MASTER) {
                    const token = new JwtService().generateToken();
                    res.status(200).json({ token });
                } else {
                    res.status(400).json({ message: 'Senha de acesso incorreta.' });
                }
                break;

            default:
                res.setHeader('Allow', ['POST'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
                break;
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}