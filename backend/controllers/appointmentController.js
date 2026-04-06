const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// Crear nueva cita
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, dateTime, reason } = req.body;

    // Validar que existan el paciente y el doctor
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(404).json({ message: 'Paciente o doctor no encontrado' });
    }

    // Verificar que no haya conflicto de horarios
    const existingAppointment = await Appointment.findOne({
      doctorId,
      dateTime,
      status: { $in: ['scheduled', 'completed'] },
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'El doctor ya tiene una cita en este horario' });
    }

    const appointment = new Appointment({
      patientId,
      doctorId,
      dateTime,
      reason,
    });

    await appointment.save();
    await appointment.populate(['patientId', 'doctorId']);

    res.status(201).json({
      message: 'Cita creada exitosamente',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

// Obtener citas del paciente
exports.getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;

    const appointments = await Appointment.find({ patientId })
      .populate('doctorId', 'name specialty email phone')
      .sort({ dateTime: -1 });

    res.status(200).json({
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

// Obtener citas del doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await Appointment.find({ doctorId })
      .populate('patientId', 'name email phone age')
      .sort({ dateTime: -1 });

    res.status(200).json({
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

// Obtener todas las citas
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (startDate || endDate) {
      filter.dateTime = {};
      if (startDate) filter.dateTime.$gte = new Date(startDate);
      if (endDate) filter.dateTime.$lte = new Date(endDate);
    }

    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email phone')
      .populate('doctorId', 'name specialty email')
      .sort({ dateTime: -1 });

    res.status(200).json({
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las citas', error: error.message });
  }
};

// Actualizar cita
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { dateTime, reason, status, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    // Si se intenta cambiar la fecha, verificar disponibilidad
    if (dateTime && dateTime !== appointment.dateTime.toString()) {
      const conflict = await Appointment.findOne({
        _id: { $ne: appointmentId },
        doctorId: appointment.doctorId,
        dateTime,
        status: { $in: ['scheduled', 'completed'] },
      });

      if (conflict) {
        return res.status(400).json({ message: 'El doctor no está disponible en esa fecha y hora' });
      }
    }

    if (dateTime) appointment.dateTime = dateTime;
    if (reason) appointment.reason = reason;
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;

    appointment.updatedAt = Date.now();
    await appointment.save();
    await appointment.populate(['patientId', 'doctorId']);

    res.status(200).json({
      message: 'Cita actualizada exitosamente',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};

// Cancelar cita
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'La cita ya está cancelada' });
    }

    appointment.status = 'cancelled';
    appointment.updatedAt = Date.now();
    await appointment.save();
    await appointment.populate(['patientId', 'doctorId']);

    res.status(200).json({
      message: 'Cita cancelada exitosamente',
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al cancelar la cita', error: error.message });
  }
};

// Obtener disponibilidad del doctor
exports.getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    // Verificar si el doctor trabaja ese día
    if (!doctor.daysAvailable.includes(dayOfWeek)) {
      return res.status(200).json({
        available: false,
        reason: 'El doctor no trabaja este día',
      });
    }

    // Buscar citas del doctor en esa fecha
    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(selectedDate);
    dayEnd.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      doctorId,
      dateTime: { $gte: dayStart, $lte: dayEnd },
      status: { $in: ['scheduled', 'completed'] },
    });

    res.status(200).json({
      doctorName: doctor.name,
      date: selectedDate.toISOString().split('T')[0],
      scheduleStart: doctor.scheduleStart,
      scheduleEnd: doctor.scheduleEnd,
      bookedTimes: appointments.map(apt => apt.dateTime),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener disponibilidad', error: error.message });
  }
};
