const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.get('/insights', aiController.getInsights);

module.exports = router;
