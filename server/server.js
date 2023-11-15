require('dotenv').config;
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 500;

app.use(express.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
