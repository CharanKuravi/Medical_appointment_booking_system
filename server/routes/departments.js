const router = require('express').Router();
const Doctor = require('../models/Doctor');

// Get all departments
router.get('/', async (req, res) => {
    try {
        const departments = [
            { id: 1, name: 'Cardiology', description: 'Heart and cardiovascular care' },
            { id: 2, name: 'Neurology', description: 'Brain and nervous system' },
            { id: 3, name: 'Orthopedics', description: 'Bones, joints, and muscles' },
            { id: 4, name: 'Pediatrics', description: 'Child healthcare' },
            { id: 5, name: 'Dermatology', description: 'Skin, hair, and nails' },
            { id: 6, name: 'Ophthalmology', description: 'Eye care and vision' },
            { id: 7, name: 'Dental', description: 'Oral health and dentistry' },
            { id: 8, name: 'General', description: 'General health consultation' },
        ];
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get doctors by department
router.get('/:specialty/doctors', async (req, res) => {
    try {
        const { specialty } = req.params;
        const doctors = await Doctor.find({ 
            specialization: new RegExp(specialty, 'i') 
        }).populate('userId', 'name email');
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
