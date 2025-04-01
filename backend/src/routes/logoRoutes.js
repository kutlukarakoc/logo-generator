const express = require('express');
const { generateLogo, checkLogoStatus } = require('../controllers/logoController');

const router = express.Router();

router.post('/generate', generateLogo);
router.get('/status/:id', checkLogoStatus);

module.exports = router; 