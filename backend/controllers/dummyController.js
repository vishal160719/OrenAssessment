const Dummy = require('../models/dummy'); 
const getDummy = async (req, res) => {
    try {
        const data = await Dummy.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
    }
};

const addDummy = async (req, res) => {
    const { year, carbonEmissions, waterUsage, wasteGenerated } = req.body;

        if (!year || !carbonEmissions || !waterUsage || !wasteGenerated) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
                const newDummy = new Dummy({
            year,
            carbonEmissions,
            waterUsage,
            wasteGenerated,
        });

                await newDummy.save();
        res.status(201).json({ message: 'Data added successfully', newDummy });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error });
    }
};

module.exports = {
    getDummy,
    addDummy,
};
