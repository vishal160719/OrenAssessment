const mongoose = require('mongoose');

const DummySchema = new mongoose.Schema({
    year: { type: Number, required: true },
    carbonEmissions: { type: Number, required: true },
    waterUsage: { type: Number, required: true },
    wasteGenerated: { type: Number, required: true }
});

module.exports = mongoose.model('Dummy', DummySchema);
