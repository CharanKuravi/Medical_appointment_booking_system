import API from './api';

// Create new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await API.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await API.get('/appointments');
    return response.data.appointments;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const response = await API.get(`/appointments/${id}`);
    return response.data.appointment;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get appointments by patient email
export const getAppointmentsByEmail = async (email) => {
  try {
    const response = await API.get(`/appointments/patient/${email}`);
    return response.data.appointments;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update appointment status
export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await API.patch(`/appointments/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete appointment
export const deleteAppointment = async (id) => {
  try {
    const response = await API.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
