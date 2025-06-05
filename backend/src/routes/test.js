import express from 'express';
import { verifyClerkToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/protected', verifyClerkToken, (req, res) => {
  res.json({ message: `Welcome, admin ${req.userId}! 🎉` });
});

export default router;
