const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const inputRoutes = require('./routes/inputRoutes');
const dummy = require('./routes/dummyRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  // Remove deprecated options
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(`MongoDB connection error: ${error}`));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api', inputRoutes);
app.use('/api', dummy);

// Correctly set the port from environment variable or default to 5000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
