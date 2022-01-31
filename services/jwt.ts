import jwt from 'jsonwebtoken';

export default class JwtService {
    generateToken() {
        return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '5 days' });
    }

    verifyToken(token: string) {
        return Boolean(jwt.verify(token, process.env.JWT_SECRET));
    }
}