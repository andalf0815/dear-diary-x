const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  memoryDate: {
    type: Date,
    required: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  activityTags: {
    type: [String],
    default: [],
  },
  locationTags: {
    type: [String],
    default: [],
  },
  peopleTags: {
    type: [String],
    default: [],
  },
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
