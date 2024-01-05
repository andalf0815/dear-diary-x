const fs = require('fs').promises;

const Memory = require('../models/Memory');
const { uploadDestination } = require('../config/multer.js');

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
const addMemory = async (req, res) => {
  const data = req.body;
  const images = req.files;
  let imagePaths = [];
  
  try {
    // Check if a memory on the same date already exists
    const existingMemory = await Memory.findOne({ memoryDate: data.memoryDate });
    if (existingMemory) {
      // Delete the uploaded images from the folder
      for (const image of images) {
        try {
          await fs.unlink(image.path);
        } catch (error) {
          console.error(`Error deleting image ${image.path}:`, error);
        }
      }

      // If memory exists, send a response and do not save a new one
      return res.status(409).send('Memory with this UUID already exists');
    }
    // if images are uploaded, then get the paths and save in in an array
    if (images.length !== 0) {
      imagePaths = images.map((image) => image.path);
    }

    // Create a new memory entry with references to the uploaded images
    const newMemory = new Memory(
      imagePaths
        ? { ...data, imagePaths }
        : {
            ...data,
          }
    );

    // Save the new memory entry to the MongoDB collection
    const savedMemory = await newMemory.save();

    res.json(savedMemory);
  } catch (err) {
    console.error(err);
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

//*****************//
//***HELPER FCTS***//
//*****************//

module.exports = {
  getAllMemories,
  addMemory,
  updateMemory,
  deleteMemory,
};
