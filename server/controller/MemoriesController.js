const Memory = require('../models/Memory');
const { v4: uuidv4 } = require('uuid');

// Get all memory
const getAllMemories = async (req, res) => {
  try {
    const memories = await Memory.find({}).sort({ memoryDate: -1 });
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
    // Check if a memory with the same UUID already exists
    const existingMemory = await Memory.findOne({ memoryDate: data.memoryDate });
    if (existingMemory) {
      // If memory exists, send a response and do not save a new one
      return res.status(409).send('Memory with this UUID already exists');
    }

    // If no existing memory, create a new one
    const memories = await Memory.create(data);
    res.json(memories);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memoryId = req.params.id;
    const memory = await Memory.findByIdAndDelete(memoryId);

    if (!memory) {
      return res.status(404).send('Memory not found');
    }

    res.send('Memory deleted');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAllMemories,
  saveMemory,
  deleteMemory,
};
