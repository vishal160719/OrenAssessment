const express = require('express');
const router = express.Router();
const inputController = require('../controllers/inputController');

router.post('/inputs', inputController.createInput);

router.get('/inputs', inputController.getInputs);

module.exports = router;
