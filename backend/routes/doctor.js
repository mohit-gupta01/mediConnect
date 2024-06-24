const { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctor, getDoctorProfile } = require('../controllers/doctorController');
const express = require('express');
const { authenticate, restrict } = require('../auth/verifyToken');
const reviewRoutes = require('./review');

const router = express.Router();

// nested route
router.use('/:doctorId/reviews', reviewRoutes);

router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor);
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor);
router.get('/profile/me', authenticate, restrict(["doctor"]), getDoctorProfile);

module.exports = router;