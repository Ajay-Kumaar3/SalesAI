const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');

router.get('/revenue', analyticsController.getRevenueTrends);
router.get('/categories', analyticsController.getCategoryDistribution);
router.get('/stats', analyticsController.getStats);

module.exports = router;
