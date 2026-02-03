import express from 'express';
import { login, register } from '../controller/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

// Protected route
router.get("/me", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

export default router;