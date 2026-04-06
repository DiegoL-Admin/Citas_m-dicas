# ⚡ Quick Start - 5 Minutos

## 🎯 Objetivo
Tener la app corriendo con datos reales del backend en 5 minutos.

---

## Step 1: Backend (2 min)

```bash
# Terminal 1
cd backend
npm start
```

✅ Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en http://localhost:5000
```

---

## Step 2: Cargar datos de ejemplo (1 min)

```bash
# Terminal 2
cd backend
npm run seed
```

✅ Deberías ver:
```
✅ 4 doctores creados
✅ 4 pacientes creados
✅ 5 citas creadas
```

---

## Step 3: Frontend (1 min)

```bash
# Terminal 3 (desde la raíz del proyecto)
npm run dev
```

✅ Abre navegador en `http://localhost:5173`

---

## Step 4: ¡Prueba! (1 min)

### Opción A: Registrarse
```
Nombre:   Diego López
Email:    diego@example.com
Teléfono: 5551234567
Edad:     30
↓ Click "Crear Cuenta"
```

### Opción B: Login con datos de ejemplo
```
Email:    juan@example.com (creado por seed)
Password: cualquier cosa (demo no valida)
```

### Una vez en Dashboard:
1. Click "Buscar Médico"
2. Filtra por especialidad
3. Click "Agendar"
4. Selecciona fecha y hora
5. Escribe motivo
6. Click "Confirmar Cita"
7. ¡Ves tu cita en "Mis Citas"!

---

## ⚠️ Requisitos

- ✅ MongoDB corriendo
- ✅ Node.js 14+
- ✅ Puertos 5000 (backend) y 5173 (frontend) libres

---

## 🔍 Verificación Rápida

**¿Funciona?**
- ✅ Ves doctores en "Buscar Médico"
- ✅ Puedes agendar cita
- ✅ La cita aparece en "Mis Citas"
- ✅ Sin errores en consola (F12)

**¿Error?**
1. Cierra y reinicia `npm start` en backend
2. Limpia localStorage: `localStorage.clear()` en consola
3. Recarga página: Ctrl+Shift+R

---

## 📚 Documentación Completa

- Detalles técnicos: `CHANGES_SUMMARY.md`
- Guía de integración: `INTEGRATION_GUIDE.md`
- API docs: `backend/README.md`

---

**¡Listo! Tu app está corriendo. 🚀**
