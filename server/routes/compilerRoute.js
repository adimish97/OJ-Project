import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { handleCompileRequest } from '../controller/compilerController.js';

const router = express.Router();

router.post('/', protect, handleCompileRequest);

export default router;