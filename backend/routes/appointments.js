const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Crear cita
router.post('/', appointmentController.createAppointment);

// Obtener todas las citas con filtros opcionales
router.get('/', appointmentController.getAllAppointments);

// Obtener disponibilidad del doctor
router.get('/availability', appointmentController.getDoctorAvailability);

// Obtener citas de un paciente
router.get('/patient/:patientId', appointmentController.getPatientAppointments);

// Obtener citas de un doctor
router.get('/doctor/:doctorId', appointmentController.getDoctorAppointments);

// Actualizar cita
router.put('/:appointmentId', appointmentController.updateAppointment);

// Cancelar cita
router.delete('/:appointmentId', appointmentController.cancelAppointment);

module.exports = router;
