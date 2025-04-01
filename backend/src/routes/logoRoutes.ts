import express from 'express';
import { generateLogo } from '../controllers/logoController';

const router = express.Router();

router.post('/generate', generateLogo);

export default router; 