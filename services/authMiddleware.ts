import { NextApiRequest } from "next";
import JwtService from "./jwt";

export default function isAuthenticated(req: NextApiRequest) {
    const promise = new Promise<boolean>((resolve) => {
        let token = req.headers.authorization
        if (!token) resolve(false);
        token = typeof token === 'string' ? token : token[0];

        const tokenIsValid = new JwtService()
            .verifyToken(token.replace('Bearer ', ''));


        if (!tokenIsValid) resolve(false);

        resolve(true);
    });

    return Promise.resolve(promise);
}