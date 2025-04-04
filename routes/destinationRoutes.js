const express = require('express');
const router = express.Router();
const destCtrl = require('../controllers/destinationController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { upload } = require('../middleware/multerMiddleware');

// Authenticated users can view
router.get('/', auth, destCtrl.getDestinations);
router.get('/:id', auth, destCtrl.getDestinationById);

// Admins can add/update/delete with file upload
router.post('/', auth, authorize(['admin']), upload.single('image'), destCtrl.createDestination);
router.put('/:id', auth, authorize(['admin']), upload.single('image'), destCtrl.updateDestination);
router.delete('/:id', auth, authorize(['admin']), destCtrl.deleteDestination);

module.exports = router;
