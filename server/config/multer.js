const multer = require('multer');

const uploadDestination = 'uploads';

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination);
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

module.exports = { upload: multer({ storage }), uploadDestination };
