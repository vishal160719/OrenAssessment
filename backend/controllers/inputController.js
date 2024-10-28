const Input = require('../models/Input');

exports.createInput = async (req, res) => {
  const { carbonEmissions, waterUsage, wasteGenerated } = req.body;

  try {
    const newInput = new Input({ carbonEmissions, waterUsage, wasteGenerated });
    await newInput.save();
    res.status(201).json({ message: 'Input data saved successfully', data: newInput });
  } catch (error) {
    res.status(500).json({ message: 'Error saving input data', error });
  }
};

exports.getInputs = async (req, res) => {
  try {
    const inputs = await Input.find();     res.status(200).json({ message: 'Input data retrieved successfully', data: inputs });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving input data', error });
  }
};
