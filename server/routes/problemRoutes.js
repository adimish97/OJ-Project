import express from 'express';
import { getProblems, createProblem, getProblemBySlug } from '../controller/problemController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getProblems);

router.get('/:slug', protect, getProblemBySlug);

router.post('/create', protect, createProblem);


export default router;