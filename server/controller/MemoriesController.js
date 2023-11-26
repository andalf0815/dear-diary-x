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
    const memory = await Memory.create(data);
    res.json(memory);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

const updateMemory = async (req, res) => {
  const data = req.body;
  try {
    const { _id, ...memoryData } = data; // Extract _id and other memory data

    // Check if a memory with the same UUID already exists
    const existingMemory = await Memory.findOne({ _id });

    if (existingMemory) {
      // If memory exists, update it
      const memory = await Memory.updateOne({ _id }, memoryData);
      res.json(memory);
    } else {
      // If no existing memory, create a new one
      const newMemory = await Memory.create(data);
      res.status(201).json(newMemory);
    }
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
  updateMemory,
  deleteMemory,
};
