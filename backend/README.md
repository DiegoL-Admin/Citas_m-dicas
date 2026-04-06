# API de Citas Médicas

Backend funcional para gestión de citas médicas construido con **Node.js + Express + MongoDB**.

## 🚀 Características

- ✅ Crear, actualizar y cancelar citas médicas
- ✅ Gestión de doctores
- ✅ Gestión de pacientes
- ✅ Ver historial de citas
- ✅ Verificar disponibilidad de doctores
- ✅ Filtros avanzados

## 📋 Requisitos

- Node.js (v14+)
- MongoDB (local o Atlas)

## 🛠️ Instalación

```bash
# En la carpeta backend/
npm install
```

## ⚙️ Configuración

Crear archivo `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/citas_medicas
NODE_ENV=development
```

**Para MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/citas_medicas?retryWrites=true&w=majority
```

## 🏃 Iniciar el servidor

```bash
npm start
# o en desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 📚 Endpoints de la API

### Base URL: `/api`

---

### **PACIENTES** (`/api/patients`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nuevo paciente |
| GET | `/` | Obtener todos los pacientes |
| GET | `/:patientId` | Obtener paciente por ID |
| PUT | `/:patientId` | Actualizar paciente |
| DELETE | `/:patientId` | Eliminar paciente |

**Crear Paciente (POST /api/patients)**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "1234567890",
  "age": 30,
  "medicalHistory": "Hipertensión"
}
```

---

### **DOCTORES** (`/api/doctors`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nuevo doctor |
| GET | `/` | Obtener todos los doctores |
| GET | `/?specialty=Cardiología` | Filtrar por especialidad |
| GET | `/:doctorId` | Obtener doctor por ID |
| PUT | `/:doctorId` | Actualizar doctor |
| DELETE | `/:doctorId` | Eliminar doctor |

**Crear Doctor (POST /api/doctors)**
```json
{
  "name": "Dr. Carlos López",
  "specialty": "Cardiología",
  "email": "carlos@hospital.com",
  "phone": "9876543210",
  "scheduleStart": "08:00",
  "scheduleEnd": "17:00",
  "daysAvailable": [0, 1, 2, 3, 4]
}
```

---

### **CITAS** (`/api/appointments`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nueva cita |
| GET | `/` | Obtener todas las citas |
| GET | `/?status=scheduled` | Filtrar por estado |
| GET | `/?startDate=2024-01-01&endDate=2024-12-31` | Filtrar por rango de fechas |
| GET | `/patient/:patientId` | Obtener citas de un paciente |
| GET | `/doctor/:doctorId` | Obtener citas de un doctor |
| GET | `/availability?doctorId=...&date=2024-01-15` | Verificar disponibilidad |
| PUT | `/:appointmentId` | Actualizar cita |
| DELETE | `/:appointmentId` | Cancelar cita |

**Crear Cita (POST /api/appointments)**
```json
{
  "patientId": "507f1f77bcf86cd799439011",
  "doctorId": "507f1f77bcf86cd799439012",
  "dateTime": "2024-01-15T10:00:00Z",
  "reason": "Chequeo general"
}
```

**Actualizar Cita (PUT /api/appointments/:id)**
```json
{
  "dateTime": "2024-01-16T14:00:00Z",
  "reason": "Chequeo completo",
  "notes": "Llevar análisis previos"
}
```

---

## 📊 Estructura de Datos

### Patient
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  age: Number,
  medicalHistory: String,
  createdAt: Date
}
```

### Doctor
```javascript
{
  _id: ObjectId,
  name: String,
  specialty: String,
  email: String (unique),
  phone: String,
  scheduleStart: String (HH:MM),
  scheduleEnd: String (HH:MM),
  daysAvailable: [Number], // 0-6 (Mon-Sun)
  createdAt: Date
}
```

### Appointment
```javascript
{
  _id: ObjectId,
  patientId: ObjectId (ref: Patient),
  doctorId: ObjectId (ref: Doctor),
  dateTime: Date,
  reason: String,
  status: String (scheduled, completed, cancelled, no-show),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Estados de Cita

- **scheduled**: Cita agendada
- **completed**: Cita completada
- **cancelled**: Cita cancelada
- **no-show**: Paciente no asistió

---

## 📌 Ejemplos de Uso con cURL

### Crear Paciente
```bash
curl -X POST http://localhost:5000/api/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "email": "maria@example.com",
    "phone": "5551234567",
    "age": 28,
    "medicalHistory": "Asma"
  }'
```

### Crear Doctor
```bash
curl -X POST http://localhost:5000/api/doctors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Roberto Sánchez",
    "specialty": "Neumología",
    "email": "roberto@hospital.com",
    "phone": "5559876543",
    "scheduleStart": "09:00",
    "scheduleEnd": "18:00",
    "daysAvailable": [0,1,2,3,4,5]
  }'
```

### Crear Cita
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "[PATIENT_ID]",
    "doctorId": "[DOCTOR_ID]",
    "dateTime": "2024-01-20T10:30:00Z",
    "reason": "Revisión asma"
  }'
```

### Obtener Citas de un Paciente
```bash
curl http://localhost:5000/api/appointments/patient/[PATIENT_ID]
```

### Cancelar Cita
```bash
curl -X DELETE http://localhost:5000/api/appointments/[APPOINTMENT_ID]
```

---

## 🌐 Integración con Frontend

La app React puede consumir esta API:

```javascript
// Crear cita
const response = await fetch('http://localhost:5000/api/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    patientId: '507f1f77bcf86cd799439011',
    doctorId: '507f1f77bcf86cd799439012',
    dateTime: new Date().toISOString(),
    reason: 'Chequeo'
  })
});

const appointment = await response.json();
```

---

## 🛡️ Seguridad (Próximas Mejoras)

- [ ] Autenticación JWT
- [ ] Validación de entrada mejorada
- [ ] Rate limiting
- [ ] Encriptación de datos sensibles
- [ ] Logs de auditoría

---

## 📝 Notas

- MongoDB se espera en `mongodb://localhost:27017` o configurable via `.env`
- CORS está habilitado por defecto (se puede restringir)
- Los timestamps se guardan automáticamente

---

## 💡 Próximas Features

- [ ] Sistema de notificaciones (email/SMS)
- [ ] Reportes de citas
- [ ] Historial médico digitalizado
- [ ] Sistema de evaluación de doctores
- [ ] Integración con calendario

---

**Desarrollado con ❤️ usando Node.js + Express + MongoDB**
