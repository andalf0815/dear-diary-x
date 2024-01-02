const express = require('express');
const memoryRouter = require('./memoryRoutes');

const router = express.Router();

router.use('/memories', memoryRouter);

module.exports = router;
