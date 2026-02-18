const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: true },
    specialist_name: { type: String, required: true },
    specialty: { type: String },
    location: { type: String },
    appointment_date: { type: String, required: true },
    appointment_time: { type: String, required: true },
    patient_notes: { type: String },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
