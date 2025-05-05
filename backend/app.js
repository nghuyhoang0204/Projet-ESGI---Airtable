require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recipesRoutes = require('./routes/recipes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server started on port', PORT));
