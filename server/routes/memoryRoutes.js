const express = require('express');
const MemoryController = require('../controller/MemoriesController.js');
const multer = require('multer');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileFormat = file.mimetype?.split('/')[1];
    let error = null;
    if (!['jpeg', 'jpg', 'png'].includes(fileFormat)) {
      error = 'Not allowed mimetype for uploading';
    }
    cb(error, Date.now() + '.' + fileFormat);
  },
});
const upload = multer({ storage });

router.get('/', MemoryController.getAllMemories);
router.post('/', upload.array('image', 4), MemoryController.addMemory);
router.put('/', MemoryController.updateMemory);
router.delete('/:id', MemoryController.deleteMemory);

module.exports = router;
