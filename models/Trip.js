const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
