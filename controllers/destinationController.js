const Destination = require('../models/Destination');

exports.createDestination = async (req, res) => {
    try {
      const { name, description , country} = req.body;
      const imageUrl = req.filename ? `/uploads/${req.filename}` : null;
  
      const newDest = new Destination({
        name,
        description,
        country,
        image: imageUrl,
      });
      console.log(req.body);
      console.log(req.file);
      await newDest.save();
      res.status(201).json(newDest);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getDestinations = async (req, res) => {
  const dests = await Destination.find();
  res.json(dests);
};

exports.getDestinationById = async (req, res) => {
  const dest = await Destination.findById(req.params.id);
  dest ? res.json(dest) : res.status(404).json({ message: 'Destination not found' });
};

exports.updateDestination = async (req, res) => {
  const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  dest ? res.json(dest) : res.status(404).json({ message: 'Destination not found' });
};

exports.deleteDestination = async (req, res) => {
  const dest = await Destination.findByIdAndDelete(req.params.id);
  dest ? res.json({ message: 'Destination deleted' }) : res.status(404).json({ message: 'Destination not found' });
};
