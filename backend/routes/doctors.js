const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

// Crear doctor
router.post('/', doctorController.createDoctor);

// Obtener todos los doctores
router.get('/', doctorController.getAllDoctors);

// Obtener doctor por ID
router.get('/:doctorId', doctorController.getDoctorById);

// Actualizar doctor
router.put('/:doctorId', doctorController.updateDoctor);

// Eliminar doctor
router.delete('/:doctorId', doctorController.deleteDoctor);

module.exports = router;
