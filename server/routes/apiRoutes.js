const express = require('express');
const memoryRouter = require('./memoryRoutes');

const router = express.Router();

router.use((req, res, next) => {
  console.log(Date.now());
  next();
});

router.use('/memories', memoryRouter);

module.exports = router;
