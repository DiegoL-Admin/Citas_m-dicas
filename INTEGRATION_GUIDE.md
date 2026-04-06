# 🔗 Guía de Integración Frontend-Backend

## ✅ Resumen de Cambios

Tu aplicación React ha sido actualizada para consumir las APIs del backend. Todos los datos que ves ahora provienen directamente de tu servidor Node.js + MongoDB.

---

## 🚀 Cómo Empezar

### 1. Asegúrate de que MongoDB está corriendo

```bash
# En Windows, abre Services y busca "MongoDB Server"
# O si tienes MongoDB local, verifica en:
mongodb://localhost:27017
```

### 2. Inicia el Backend

```bash
cd backend
npm install  # Si no lo hiciste aún
npm run seed # Cargar datos de ejemplo
npm start    # Iniciar servidor en puerto 5000
```

### 3. Inicia el Frontend

```bash
npm run dev  # En la raíz del proyecto
```

El sitio estará disponible en `http://localhost:5173`

---

## 📡 Flujo de Datos

### Login/Registro
```
Frontend (Login.jsx)
  ↓
authAPI.login() / authAPI.register()
  ↓
Backend: POST /api/patients
  ↓
MongoDB: Guardar paciente + localStorage
  ↓
Dashboard cargada con datos reales
```

### Buscar Doctores
```
Frontend (SearchDoctor.jsx)
  ↓
doctorAPI.getAll(specialty?)
  ↓
Backend: GET /api/doctors
  ↓
MongoDB: Retorna lista de doctores
  ↓
Frontend: Muestra doctores dinámicamente
```

### Crear Cita
```
Frontend (BookAppointment.jsx)
  ↓
appointmentAPI.create({patientId, doctorId, dateTime, reason})
  ↓
Backend: POST /api/appointments
  ↓
MongoDB: Verifica disponibilidad + crea cita
  ↓
Frontend: Redirige a Mis Citas
```

### Ver Citas
```
Frontend (MyAppointments.jsx)
  ↓
appointmentAPI.getPatientAppointments(userId)
  ↓
Backend: GET /api/appointments/patient/{userId}
  ↓
MongoDB: Retorna citas del paciente
  ↓
Frontend: Muestra próximas, completadas, canceladas
```

---

## 📁 Archivos Modificados

### Nuevo archivo de servicios
- **`src/services/api.js`** - Centraliza todas las llamadas a API
  - `patientAPI` - Operaciones con pacientes
  - `doctorAPI` - Operaciones con doctores
  - `appointmentAPI` - Operaciones con citas
  - `authAPI` - Autenticación (simulada)

### Páginas actualizadas
- **`src/pages/Login.jsx`** 
  - Integración con API de registro y login
  - Manejo de errores
  - Guardado de usuario en localStorage

- **`src/pages/SearchDoctor.jsx`**
  - Carga de doctores desde API
  - Filtrado por especialidad
  - Estados de carga

- **`src/pages/BookAppointment.jsx`**
  - Creación de citas
  - Validación de datos
  - Redirección automática

- **`src/pages/MyAppointments.jsx`**
  - Carga de citas del paciente
  - Filtrado por estado (próximas, completadas, canceladas)
  - Cancelación de citas

- **`src/pages/Dashboard.jsx`**
  - Datos dinámicos de citas próximas
  - Estadísticas en tiempo real
  - Listado de doctores disponibles

---

## 🔧 Configuración de API

La URL base del API se define en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Si cambias el puerto del backend, actualiza también esta constante.**

---

## 🧪 Flujos de Prueba

### Prueba Completa: Registro → Agendar Cita → Ver Historial

1. **Login/Registro**
   - Click "Regístrate" en la página de login
   - Completa: Nombre, Email, Teléfono, Edad
   - Click "Crear Cuenta"
   - ✅ Deberías ver el Dashboard

2. **Buscar Doctor**
   - Click en "Buscar Médico" o acceso rápido
   - Filtra por especialidad
   - Ves lista de doctores desde la BD
   - Click "Agendar"

3. **Agendar Cita**
   - Selecciona fecha (1-30)
   - Selecciona hora (mañana o tarde)
   - Escribe motivo de consulta
   - Click "Confirmar Cita"
   - ✅ Deberías ver mensaje de éxito

4. **Ver Citas**
   - Click en "Mis Citas" en sidebar
   - Tab "Próximas" muestra tu cita
   - Puedes verla en Dashboard también
   - Click "Cancelar" para cancelarla

---

## ⚠️ Problemas Comunes

### "Error al conectarse al servidor"
**Solución:**
- ✅ Verifica que `npm start` está corriendo en `/backend`
- ✅ Verifica que MongoDB está corriendo
- ✅ Revisa la consola del navegador (F12 → Console)

### "El formulario no envía datos"
**Solución:**
- ✅ Abre consola (F12) y revisa errores
- ✅ Verifica que los campos están llenos
- ✅ Comprueba que la petición llega a `/api/patients`

### "Las citas no se muestran"
**Solución:**
- ✅ Asegúrate de estar logueado
- ✅ Verifica localStorage (F12 → Application → localStorage)
- ✅ Comprueba que las citas existen: `npm run seed`

### CORS Error
**Solución:**
- CORS ya está habilitado en el backend
- Si aún así falla, verifica que `Access-Control-Allow-Origin` está en el header

---

## 🔐 Autenticación

Actualmente la autenticación es **simulada** (guardada en localStorage):

```javascript
// En api.js - login guarda en localStorage
localStorage.setItem('userEmail', email);
localStorage.setItem('userId', response.patient._id);
localStorage.setItem('isLoggedIn', 'true');
```

**Próxima mejora:** Implementar JWT para autenticación real.

---

## 🌐 Endpoints Utilizados

| Página | Endpoint | Método | Datos |
|--------|----------|--------|-------|
| Login | `/api/patients` | POST | nombre, email, edad, teléfono |
| SearchDoctor | `/api/doctors` | GET | - |
| BookAppointment | `/api/appointments` | POST | patientId, doctorId, fecha, motivo |
| MyAppointments | `/api/appointments/patient/{id}` | GET | - |
| MyAppointments | `/api/appointments/{id}` | DELETE | - |

---

## 📊 Estructura de Datos

### Patient (localStorage)
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  userEmail: "diego@example.com",
  isLoggedIn: "true"
}
```

### Appointment (desde API)
```javascript
{
  _id: "507f1f77bcf86cd799439012",
  patientId: "507f1f77bcf86cd799439011",
  doctorId: "507f1f77bcf86cd799439013",
  dateTime: "2024-04-10T10:30:00Z",
  reason: "Chequeo general",
  status: "scheduled", // scheduled, completed, cancelled
  createdAt: "2024-04-05T12:34:56Z"
}
```

---

## 🎯 Próximas Mejoras

- [ ] **Autenticación JWT** - Reemplazar localStorage con tokens
- [ ] **Rate Limiting** - Proteger endpoints
- [ ] **Validación Avanzada** - Más validaciones en frontend
- [ ] **Notificaciones** - Email/SMS para citas
- [ ] **Búsqueda Avanzada** - Por síntoma, ubicación, disponibilidad
- [ ] **Perfiles de Doctores** - Horarios, calificaciones, reseñas
- [ ] **Reprogramar Citas** - Cambiar fecha/hora de cita existente
- [ ] **Historial Médico** - Diagnósticos, recetas, exámenes

---

## 💡 Tips de Desarrollo

### Debugging
```javascript
// En navegador, accede a:
localStorage  // Ver datos guardados
window.__REACT_DEVTOOLS_GLOBAL_HOOK__  // React DevTools

// En backend, revisa logs:
console.log()  // Aparece en terminal de `npm start`
```

### Testing Manual
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm run dev

# Terminal 3 - MongoDB (si usas local)
mongosh

# Prueba queries en MongoDB:
db.appointments.find()
db.doctors.find()
db.patients.find()
```

### Agregar New Feature
1. Crear función en `api.js`
2. Crear componente en `src/pages/`
3. Usar `useState` + `useEffect` para cargar datos
4. Mostrar loading + error states

---

## 📞 Soporte

Si algo no funciona:

1. **Revisa la consola** (F12 → Console)
2. **Verifica que todo está corriendo:**
   - MongoDB: ✅
   - Backend: ✅ `http://localhost:5000/api`
   - Frontend: ✅ `http://localhost:5173`
3. **Limpia localStorage:**
   ```javascript
   localStorage.clear()
   ```
4. **Recarga la página:** Ctrl+Shift+R

---

**¡Tu app está lista para usar! 🎉**

Visita [http://localhost:5173](http://localhost:5173) y empieza a agendar citas.
