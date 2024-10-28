const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
    carbonEmissions: {
    type: String,
    required: true,
    maxlength: 16,
  },
  waterUsage: {
    type: String,
    required: true,
  },
  wasteGenerated: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Input', InputSchema);
