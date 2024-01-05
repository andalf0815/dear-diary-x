const express = require('express');
const MemoryController = require('../controller/MemoriesController.js');
const { upload } = require('../config/multer.js');

const router = express.Router();

router.get('/', MemoryController.getAllMemories);
router.post('/', upload.array('image', 4), MemoryController.addMemory);
router.put('/', MemoryController.updateMemory);
router.delete('/:id', MemoryController.deleteMemory);

module.exports = router;
