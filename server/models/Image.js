const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  metadata: Object,
  data: Buffer, // Actual image data stored as a Buffer
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
