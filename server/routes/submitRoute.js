import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { handleSubmitRequest } from '../controller/submitController.js';

const router = express.Router();

router.post('/', protect, handleSubmitRequest);

export default router;