const express = require('express');
const testController = require('../controllers/test.controller');

const router = express.Router();

router.get('/', testController.testCheck);

module.exports = router;