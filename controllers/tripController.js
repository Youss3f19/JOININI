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

// Dans votre controller (tripController.js)
exports.getAvailableTrips = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { startDate, endDate } = req.query;

    // Vérification des paramètres requis
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Les dates de début et de fin sont requises' 
      });
    }

    // Conversion des dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ 
        message: 'Format de date invalide' 
      });
    }

    // Recherche des voyages disponibles
    const trips = await Trip.find({
      destination: destinationId,
      $or: [
        {
          departureDate: { $gte: start, $lte: end }
        },
        {
          returnDate: { $gte: start, $lte: end }
        },
        {
          departureDate: { $lte: start },
          returnDate: { $gte: end }
        }
      ]
    })
    .populate('user')
    .populate('destination');

    if (!trips.length) {
      return res.status(404).json({ 
        message: 'Aucun voyage trouvé pour ces critères' 
      });
    }

    res.json(trips);
  } catch (err) {
    res.status(500).json({ 
      error: err.message 
    });
  }
};