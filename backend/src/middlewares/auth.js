import { verifyToken } from '@clerk/backend';
import dotenv from 'dotenv';
dotenv.config();

export const verifyClerkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    if (!verifiedToken || !verifiedToken.payload || !verifiedToken.payload.sub) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.userId = verifiedToken.payload.sub;
    next();
  } catch (err) {
    console.error('Clerk Auth Error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
