const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTrips = async (req, res) => {
  const trips = await Trip.find().populate('user').populate('destination');
  res.json(trips);
};

exports.getTripById = async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('user').populate('destination');
  trip ? res.json(trip) : res.status(404).json({ message: 'Trip not found' });
};

exports.updateTrip = async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  trip ? res.json(trip) : res.status(404).json({ message: 'Trip not found' });
};

exports.deleteTrip = async (req, res) => {
  const trip = await Trip.findByIdAndDelete(req.params.id);
  trip ? res.json({ message: 'Trip deleted' }) : res.status(404).json({ message: 'Trip not found' });
};

// GET trips between dateDepart and dateArrive
exports.getTripsBetweenDates = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: 'startDate and endDate are required as query params' });
      }
  
      const trips = await Trip.find({
        dateDepart: { $gte: new Date(startDate) },
        dateArrive: { $lte: new Date(endDate) }
      })
        .populate('user')
        .populate('destination');
  
      res.json(trips);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  