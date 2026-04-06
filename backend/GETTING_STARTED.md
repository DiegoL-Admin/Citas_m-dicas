# 🚀 Guía Rápida: Empezando con el Backend

## Paso 1: Instalar MongoDB

### Opción A: MongoDB Local (Recomendado para desarrollo)

**En Windows:**
1. Descargar desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Seguir el instalador
3. MongoDB se inicia automáticamente como servicio

Verificar que está corriendo:
```bash
mongosh
```

### Opción B: MongoDB Atlas (En la nube)

1. Crear cuenta en [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster
3. Copiar la cadena de conexión
4. Actualizar `.env`:
```
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/citas_medicas?retryWrites=true&w=majority
```

---

## Paso 2: Instalar Dependencias

```bash
cd backend
npm install
```

---

## Paso 3: Configurar .env

El archivo `.env` ya está creado con los valores por defecto:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/citas_medicas
NODE_ENV=development
```

**Si usas MongoDB Atlas, actualizar MONGODB_URI con tu conexión.**

---

## Paso 4: Cargar Datos de Ejemplo (Opcional)

```bash
npm run seed
```

Esto creará:
- 4 doctores
- 4 pacientes  
- 5 citas de ejemplo

---

## Paso 5: Iniciar el Servidor

```bash
npm start
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en http://localhost:5000
📚 API Documentation: http://localhost:5000/api
```

---

## Paso 6: Probar la API

### Opción A: Usando cURL

```bash
# Obtener info de la API
curl http://localhost:5000/api

# Obtener todos los pacientes
curl http://localhost:5000/api/patients

# Obtener todos los doctores
curl http://localhost:5000/api/doctors
```

### Opción B: Usando Postman

1. Descargar [Postman](https://www.postman.com/downloads/)
2. Abrir el archivo `API_REQUESTS.http` en Postman
3. Reemplazar `DOCTOR_ID_HERE` y `PATIENT_ID_HERE` con IDs reales
4. Ejecutar requests

### Opción C: Usando Visual Studio Code

1. Instalar extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
2. Abrir archivo `API_REQUESTS.http`
3. Hacer click en "Send Request" encima de cada endpoint

---

## 📱 Integración con Frontend React

En tu app React, agregar a un archivo de configuración:

**src/api.js**
```javascript
const API_URL = 'http://localhost:5000/api';

export const api = {
  // Pacientes
  createPatient: async (patient) => {
    const res = await fetch(`${API_URL}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient)
    });
    return res.json();
  },

  getPatients: async () => {
    const res = await fetch(`${API_URL}/patients`);
    return res.json();
  },

  // Doctores
  getDoctors: async () => {
    const res = await fetch(`${API_URL}/doctors`);
    return res.json();
  },

  // Citas
  createAppointment: async (appointment) => {
    const res = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });
    return res.json();
  },

  getPatientAppointments: async (patientId) => {
    const res = await fetch(`${API_URL}/appointments/patient/${patientId}`);
    return res.json();
  },

  cancelAppointment: async (appointmentId) => {
    const res = await fetch(`${API_URL}/appointments/${appointmentId}`, {
      method: 'DELETE'
    });
    return res.json();
  }
};
```

---

## 🛠️ Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Verificar que MongoDB está corriendo
- ✅ En Windows: Services → MongoDB → State debería ser "Running"
- ✅ Probar: `mongosh` en terminal

### "Port 5000 already in use"
- Cambiar puerto en `.env`: `PORT=5001`
- O matar el proceso: `netstat -ano | findstr :5000` (Windows)

### "CORS errors"
- CORS ya está habilitado en `server.js`
- Asegurarse de que el frontend hace requests a `http://localhost:5000`

### Datos no persisten después de reiniciar
- MongoDB debe estar corriendo permanentemente
- Si no tienes datos después de reiniciar, ejecutar `npm run seed` nuevamente

---

## 📚 Estructura del Backend

```
backend/
├── models/              # Schemas de MongoDB
│   ├── Appointment.js
│   ├── Doctor.js
│   └── Patient.js
├── controllers/         # Lógica de negocio
│   ├── appointmentController.js
│   ├── doctorController.js
│   └── patientController.js
├── routes/             # Definición de endpoints
│   ├── appointments.js
│   ├── doctors.js
│   └── patients.js
├── server.js           # Punto de entrada
├── seed.js             # Datos de ejemplo
├── .env               # Configuración
└── package.json       # Dependencias
```

---

## 🔗 Links Útiles

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🎯 Próximos Pasos

1. **Integrar con Frontend**: Usar `API_REQUESTS.http` como referencia
2. **Agregar Autenticación**: Implementar JWT
3. **Validación Avanzada**: Validar datos de entrada
4. **Testing**: Agregar tests unitarios y de integración
5. **Deployment**: Desplegar a producción (Heroku, Railway, etc.)

---

**¡Listo para empezar! 🎉**
