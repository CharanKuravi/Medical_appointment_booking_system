const router = require('express').Router();
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// Get all doctors with filtering
router.get('/', async (req, res) => {
    try {
        const { specialty, city, search } = req.query;
        let query = {};

        if (specialty) {
            query.specialization = new RegExp(specialty, 'i');
        }
        if (city) {
            query.location = new RegExp(city, 'i');
        }

        let doctors = await Doctor.find(query).populate('userId', 'name email');

        // Additional search filter on name
        if (search) {
            doctors = doctors.filter(doc => 
                doc.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
                doc.specialization?.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create/Update availability (Doctor Portal)
router.post('/slots', async (req, res) => {
    try {
        const { doctorId, availability } = req.body;
        let doctor = await Doctor.findOne({ _id: doctorId });

        if (doctor) {
            doctor.availability = availability;
            await doctor.save();
        } else {
            // If they are creating for the first time
            // Note: In real app, doctorId would be from JWT or passed correctly
            return res.status(400).json({ message: 'Doctor profile not found' });
        }

        res.json({ success: true, doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Register as a doctor (specific profile)
router.post('/profile', async (req, res) => {
    try {
        const { userId, specialization, bio, availability } = req.body;
        const doctor = new Doctor({
            userId,
            specialization,
            bio,
            availability: availability || []
        });
        await doctor.save();
        res.json({ success: true, doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
