const router = require('express').Router();
const Appointment = require('../models/Appointment');

// Book an appointment
router.post('/book', async (req, res) => {
    try {
        const {
            patientId,
            doctorId,
            patientName,
            specialist_name,
            specialty,
            location,
            appointment_date,
            appointment_time,
            patient_notes
        } = req.body;

        // Check if slot is already booked (Confirmed)
        const exists = await Appointment.findOne({
            doctorId,
            appointment_date,
            appointment_time,
            status: 'confirmed'
        });
        if (exists) return res.status(400).json({ message: 'This slot is already confirmed for another patient' });

        const appointment = new Appointment({
            patientId,
            doctorId,
            patientName,
            specialist_name,
            specialty,
            location,
            appointment_date,
            appointment_time,
            patient_notes,
            status: 'confirmed'
        });

        await appointment.save();
        res.json({ success: true, appointment });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get appointment history for a user
router.get('/history/:role/:userId', async (req, res) => {
    try {
        const { role, userId } = req.params;
        let query = {};

        if (role === 'patient') {
            query = { patientId: userId };
        } else if (role === 'doctor') {
            query = { doctorId: userId };
        }

        const history = await Appointment.find(query)
            .populate('patientId', 'name email')
            .populate({
                path: 'doctorId',
                populate: { path: 'userId', select: 'name' }
            })
            .sort({ createdAt: -1 });

        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Cancel appointment
router.put('/cancel/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

        appointment.status = 'cancelled';
        await appointment.save();
        res.json({ success: true, message: 'Appointment cancelled' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
