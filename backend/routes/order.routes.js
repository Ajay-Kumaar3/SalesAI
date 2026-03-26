const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.findAll);
router.get('/:id', orderController.findOne);
router.post('/', orderController.create);
router.delete('/:id', orderController.delete);

module.exports = router;
