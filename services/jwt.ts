import jwt from 'jsonwebtoken';

export default class JwtService {
    generateToken() {
        return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '5 days' });
    }
}