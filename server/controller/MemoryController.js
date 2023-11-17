const Memory = require('../models/Memory');

// Get all users
const getAllMemories = async (req, res) => {
    try {
      const memories = await Memory.find({});
      res.json(memories);
    } catch (err) {
        console.log(err)
      res.status(500).send('Server Error');
    }
  };

  module.exports = {
    getAllMemories
  };