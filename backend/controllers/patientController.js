const Patient = require('../models/Patient');

// Crear paciente
exports.createPatient = async (req, res) => {
  try {
    const { name, email, phone, age, medicalHistory } = req.body;

    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res.status(400).json({ message: 'El paciente ya existe' });
    }

    const patient = new Patient({
      name,
      email,
      phone,
      age,
      medicalHistory,
    });

    await patient.save();

    res.status(201).json({
      message: 'Paciente creado exitosamente',
      patient,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paciente', error: error.message });
  }
};

// Obtener todos los pacientes
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
  }
};

// Obtener paciente por ID
exports.getPatientById = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
  }
};

// Actualizar paciente
exports.updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { name, email, phone, age, medicalHistory } = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    // Verificar email único si cambia
    if (email && email !== patient.email) {
      const emailExists = await Patient.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
    }

    if (name) patient.name = name;
    if (email) patient.email = email;
    if (phone) patient.phone = phone;
    if (age) patient.age = age;
    if (medicalHistory) patient.medicalHistory = medicalHistory;

    await patient.save();

    res.status(200).json({
      message: 'Paciente actualizado exitosamente',
      patient,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error: error.message });
  }
};

// Eliminar paciente
exports.deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.status(200).json({
      message: 'Paciente eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};
