require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const recipesRouter = require('./routes/recipes');

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Recette API!');
});

// Use the router for /api/recipes
app.use('/api/recipes', recipesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});