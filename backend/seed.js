require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/citas_medicas';

async function seedDatabase() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colecciones existentes
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    console.log('🗑️  Colecciones limpias');

    // Crear doctores
    const doctors = await Doctor.create([
      {
        name: 'Dr. Carlos López',
        specialty: 'Cardiología',
        email: 'carlos@hospital.com',
        phone: '5551234567',
        scheduleStart: '08:00',
        scheduleEnd: '17:00',
        daysAvailable: [0, 1, 2, 3, 4], // Lunes a Viernes
      },
      {
        name: 'Dra. Ana Martínez',
        specialty: 'Pediatría',
        email: 'ana@hospital.com',
        phone: '5559876543',
        scheduleStart: '09:00',
        scheduleEnd: '18:00',
        daysAvailable: [0, 1, 2, 3, 4, 5],
      },
      {
        name: 'Dr. Roberto Sánchez',
        specialty: 'Neumología',
        email: 'roberto@hospital.com',
        phone: '5552468135',
        scheduleStart: '08:30',
        scheduleEnd: '16:30',
        daysAvailable: [0, 1, 2, 3, 4],
      },
      {
        name: 'Dra. Patricia Gómez',
        specialty: 'Dermatología',
        email: 'patricia@hospital.com',
        phone: '5553691357',
        scheduleStart: '10:00',
        scheduleEnd: '19:00',
        daysAvailable: [0, 1, 3, 4, 5],
      },
    ]);
    console.log(`✅ ${doctors.length} doctores creados`);

    // Crear pacientes
    const patients = await Patient.create([
      {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '5551111111',
        age: 35,
        medicalHistory: 'Hipertensión controlada',
      },
      {
        name: 'María García',
        email: 'maria@example.com',
        phone: '5552222222',
        age: 28,
        medicalHistory: 'Asma leve',
      },
      {
        name: 'Carlos Mendez',
        email: 'carlos@example.com',
        phone: '5553333333',
        age: 45,
        medicalHistory: 'Diabetes tipo 2',
      },
      {
        name: 'Laura Rodríguez',
        email: 'laura@example.com',
        phone: '5554444444',
        age: 32,
        medicalHistory: 'Sin antecedentes',
      },
    ]);
    console.log(`✅ ${patients.length} pacientes creados`);

    // Crear citas
    const now = new Date();
    const appointments = await Appointment.create([
      {
        patientId: patients[0]._id,
        doctorId: doctors[0]._id,
        dateTime: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        reason: 'Chequeo cardiovascular',
        status: 'scheduled',
      },
      {
        patientId: patients[1]._id,
        doctorId: doctors[1]._id,
        dateTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        reason: 'Revisión anual pediátrica',
        status: 'scheduled',
      },
      {
        patientId: patients[2]._id,
        doctorId: doctors[2]._id,
        dateTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        reason: 'Evaluación respiratoria',
        status: 'scheduled',
      },
      {
        patientId: patients[3]._id,
        doctorId: doctors[3]._id,
        dateTime: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
        reason: 'Consulta dermatológica',
        status: 'scheduled',
      },
      {
        patientId: patients[0]._id,
        doctorId: doctors[1]._id,
        dateTime: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        reason: 'Cita completada',
        status: 'completed',
      },
    ]);
    console.log(`✅ ${appointments.length} citas creadas`);

    console.log('\n📊 Base de datos populada exitosamente!');
    console.log('\n👨‍⚕️  Doctores creados:');
    doctors.forEach(doc => console.log(`   - ${doc.name} (${doc.specialty})`));

    console.log('\n👥 Pacientes creados:');
    patients.forEach(pat => console.log(`   - ${pat.name} (${pat.age} años)`));

    console.log('\n📅 Citas creadas:', appointments.length);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
