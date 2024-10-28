const express = require('express');
const router = express.Router();
const { getDummy, addDummy } = require('../controllers/dummyController');

router.get('/dummy', getDummy);

router.post('/dummy', addDummy);

module.exports = router;
