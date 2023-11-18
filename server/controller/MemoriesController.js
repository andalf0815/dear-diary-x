const Memory = require('../models/Memory');
const { v4: uuidv4 } = require('uuid');

// Get all memory
const getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find({}).sort({memoryDate: -1});
    res.json(memories);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

// Save a memory
const saveMemory = async (req, res) => {
  const data = req.body;
  try {
    const memories = await Memory.create(data);
    res.json(memories);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllMemories,
  saveMemory,
};
