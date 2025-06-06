const express = require('express');
const router = express.Router();
const tripCtrl = require('../controllers/tripController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { upload } = require('../middleware/multerMiddleware');

// Authenticated users can create and view trips
router.post('/', auth, upload.single('file'), tripCtrl.createTrip); 
router.get('/', auth, tripCtrl.getTrips);
router.get('/:id', auth, tripCtrl.getTripById);

router.get('/available/:destinationId', auth, tripCtrl.getAvailableTrips);
// Admins can update and delete trips
router.put('/:id', auth, authorize(['admin']), upload.single('file'), tripCtrl.updateTrip);
router.delete('/:id', auth, authorize(['admin']), tripCtrl.deleteTrip);

module.exports = router;
