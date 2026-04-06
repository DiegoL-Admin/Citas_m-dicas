const Doctor = require('../models/Doctor');

// Crear doctor
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialty, email, phone, scheduleStart, scheduleEnd, daysAvailable } = req.body;

    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: 'El doctor ya existe' });
    }

    const doctor = new Doctor({
      name,
      specialty,
      email,
      phone,
      scheduleStart,
      scheduleEnd,
      daysAvailable,
    });

    await doctor.save();

    res.status(201).json({
      message: 'Doctor creado exitosamente',
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el doctor', error: error.message });
  }
};

// Obtener todos los doctores
exports.getAllDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;
    let filter = {};

    if (specialty) {
      filter.specialty = { $regex: specialty, $options: 'i' };
    }

    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      count: doctors.length,
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los doctores', error: error.message });
  }
};

// Obtener doctor por ID
exports.getDoctorById = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el doctor', error: error.message });
  }
};

// Actualizar doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { name, specialty, email, phone, scheduleStart, scheduleEnd, daysAvailable } = req.body;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    // Verificar email único si cambia
    if (email && email !== doctor.email) {
      const emailExists = await Doctor.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'El email ya está en uso' });
      }
    }

    if (name) doctor.name = name;
    if (specialty) doctor.specialty = specialty;
    if (email) doctor.email = email;
    if (phone) doctor.phone = phone;
    if (scheduleStart) doctor.scheduleStart = scheduleStart;
    if (scheduleEnd) doctor.scheduleEnd = scheduleEnd;
    if (daysAvailable) doctor.daysAvailable = daysAvailable;

    await doctor.save();

    res.status(200).json({
      message: 'Doctor actualizado exitosamente',
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el doctor', error: error.message });
  }
};

// Eliminar doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findByIdAndDelete(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json({
      message: 'Doctor eliminado exitosamente',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el doctor', error: error.message });
  }
};
