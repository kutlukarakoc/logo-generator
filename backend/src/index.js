const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logoRoutes = require('./routes/logoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/logo', logoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 