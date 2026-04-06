const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  scheduleStart: {
    type: String,
    default: '08:00', // HH:MM format
  },
  scheduleEnd: {
    type: String,
    default: '17:00', // HH:MM format
  },
  daysAvailable: {
    type: [Number], // 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
    default: [0, 1, 2, 3, 4], // Monday to Friday
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Doctor', doctorSchema);
