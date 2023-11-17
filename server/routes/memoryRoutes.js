const express = require('express');
const MemoryController = require('../controller/MemoryController');
const router = express.Router();

router.get('/', MemoryController.getAllMemories);

module.exports = router;
