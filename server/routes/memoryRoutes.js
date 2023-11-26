const express = require('express');
const MemoryController = require('../controller/MemoriesController.js');
const router = express.Router();

router.get('/', MemoryController.getAllMemories);
router.post('/', MemoryController.addMemory);
router.put('/', MemoryController.updateMemory);
router.delete('/:id', MemoryController.deleteMemory);

module.exports = router;
