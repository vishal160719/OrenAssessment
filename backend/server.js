const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); const authRoutes = require('./routes/authRoutes');
const inputRoutes = require('./routes/inputRoutes');
const dummy = require('./routes/dummyRoutes');

dotenv.config();

const app = express();
app.use(cors()); app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(`MongoDB connection error: ${error}`));

app.use('/api/auth', authRoutes);
app.use('/api', inputRoutes);
app.use('/api', dummy);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
