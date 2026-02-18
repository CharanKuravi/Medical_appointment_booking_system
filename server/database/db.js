const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'medlink.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('SQLite database connected');
  }
});

// Initialize tables
db.serialize(() => {
  // Appointments table
  db.run(`
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patient_id INTEGER,
      doctor_id INTEGER,
      patient_name TEXT NOT NULL,
      patient_email TEXT,
      patient_phone TEXT,
      doctor_name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      location TEXT,
      appointment_date TEXT NOT NULL,
      appointment_time TEXT NOT NULL,
      status TEXT DEFAULT 'confirmed',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating appointments table:', err);
    } else {
      console.log('Appointments table ready');
      
      // Add columns if they don't exist (for existing databases)
      db.run(`ALTER TABLE appointments ADD COLUMN patient_id INTEGER`, () => {});
      db.run(`ALTER TABLE appointments ADD COLUMN doctor_id INTEGER`, () => {});
      db.run(`ALTER TABLE appointments ADD COLUMN location TEXT`, () => {});
    }
  });

  // Users table (optional for future)
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'patient',
      picture TEXT,
      provider TEXT DEFAULT 'local',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Doctors table (optional for future)
  db.run(`
    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      location TEXT,
      availability TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
