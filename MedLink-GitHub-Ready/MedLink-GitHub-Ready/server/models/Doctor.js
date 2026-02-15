const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialization: { type: String, required: true },
    bio: { type: String },
    availability: [
        {
            day: { type: String, required: true }, // e.g., 'Monday'
            timeSlots: [
                {
                    from: { type: String, required: true }, // e.g., '09:00'
                    to: { type: String, required: true }  // e.g., '10:00'
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Doctor', doctorSchema);
