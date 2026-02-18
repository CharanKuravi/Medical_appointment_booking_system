const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all appointments
router.get('/', (req, res) => {
  const query = 'SELECT * FROM appointments ORDER BY created_at DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ appointments: rows });
  });
});

// Get appointment by ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM appointments WHERE id = ?';
  
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ appointment: row });
  });
});

// Create new appointment
router.post('/', (req, res) => {
  const {
    patient_name,
    patient_email,
    patient_phone,
    doctor_name,
    specialty,
    appointment_date,
    appointment_time,
    notes
  } = req.body;

  // Validation
  if (!patient_name || !patient_email || !patient_phone || !doctor_name || !specialty || !appointment_date || !appointment_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `
    INSERT INTO appointments (
      patient_name, patient_email, patient_phone, 
      doctor_name, specialty, appointment_date, 
      appointment_time, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    patient_name,
    patient_email,
    patient_phone,
    doctor_name,
    specialty,
    appointment_date,
    appointment_time,
    notes || ''
  ];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: {
        id: this.lastID,
        ...req.body
      }
    });
  });
});

// Update appointment status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const query = `
    UPDATE appointments 
    SET status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

  db.run(query, [status, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment status updated', changes: this.changes });
  });
});

// Delete appointment
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM appointments WHERE id = ?';
  
  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted', changes: this.changes });
  });
});

// Get appointments by patient email
router.get('/patient/:email', (req, res) => {
  const query = 'SELECT * FROM appointments WHERE patient_email = ? ORDER BY appointment_date DESC';
  
  db.all(query, [req.params.email], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ appointments: rows });
  });
});

// Book appointment (with user authentication)
router.post('/book', (req, res) => {
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

  const query = `
    INSERT INTO appointments (
      patient_name, patient_email, patient_phone,
      doctor_name, specialty, appointment_date,
      appointment_time, notes, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    patientName || 'Patient',
    'patient@example.com',
    '',
    specialist_name || 'Doctor',
    specialty || 'General',
    appointment_date,
    appointment_time,
    patient_notes || '',
    'confirmed'
  ];

  db.run(query, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: {
        id: this.lastID,
        ...req.body
      }
    });
  });
});

// Get appointment history by role and user ID
router.get('/history/:role/:userId', (req, res) => {
  const query = 'SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time DESC';
  
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ appointments: rows });
  });
});

// Cancel appointment
router.put('/cancel/:id', (req, res) => {
  const query = `
    UPDATE appointments 
    SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `;

  db.run(query, [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment cancelled successfully' });
  });
});

module.exports = router;
