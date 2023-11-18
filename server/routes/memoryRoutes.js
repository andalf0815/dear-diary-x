const express = require('express');
const MemoryController = require('../controller/MemoriesController.js');
const router = express.Router();

router.get('/', MemoryController.getAllMemories);

module.exports = router;
