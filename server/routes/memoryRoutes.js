const express = require('express');
const router = express.Router();

router.get('/memories', (req, res) => {
  res.send('memories requested');
});

module.exports = router;
