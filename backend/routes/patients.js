const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// Crear paciente
router.post('/', patientController.createPatient);

// Obtener todos los pacientes
router.get('/', patientController.getAllPatients);

// Obtener paciente por ID
router.get('/:patientId', patientController.getPatientById);

// Actualizar paciente
router.put('/:patientId', patientController.updatePatient);

// Eliminar paciente
router.delete('/:patientId', patientController.deletePatient);

module.exports = router;
