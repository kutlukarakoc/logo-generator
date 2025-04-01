import express from 'express';
import { generateLogo, checkLogoStatus } from '../controllers/logoController';

const router = express.Router();

router.post('/generate', generateLogo);
router.get('/status/:id', checkLogoStatus);

export default router; 