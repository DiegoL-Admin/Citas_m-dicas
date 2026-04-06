const API_BASE_URL = 'http://localhost:5000/api';

// Utility function para hacer requests
const request = async (endpoint, options = {}) => {
  const { method = 'GET', body, ...rest } = options;
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error);
    throw error;
  }
};

// ============================================
// PACIENTES
// ============================================
export const patientAPI = {
  create: (patient) => request('/patients', { method: 'POST', body: patient }),
  getAll: () => request('/patients'),
  getById: (id) => request(`/patients/${id}`),
  update: (id, updates) => request(`/patients/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/patients/${id}`, { method: 'DELETE' }),
};

// ============================================
// DOCTORES
// ============================================
export const doctorAPI = {
  create: (doctor) => request('/doctors', { method: 'POST', body: doctor }),
  getAll: (specialty) => {
    const url = specialty ? `/doctors?specialty=${specialty}` : '/doctors';
    return request(url);
  },
  getById: (id) => request(`/doctors/${id}`),
  update: (id, updates) => request(`/doctors/${id}`, { method: 'PUT', body: updates }),
  delete: (id) => request(`/doctors/${id}`, { method: 'DELETE' }),
};

// ============================================
// CITAS
// ============================================
export const appointmentAPI = {
  create: (appointment) => request('/appointments', { method: 'POST', body: appointment }),

  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const queryString = params.toString();
    const url = queryString ? `/appointments?${queryString}` : '/appointments';
    return request(url);
  },

  getById: (id) => request(`/appointments/${id}`),

  getPatientAppointments: (patientId) => request(`/appointments/patient/${patientId}`),

  getDoctorAppointments: (doctorId) => request(`/appointments/doctor/${doctorId}`),

  getAvailability: (doctorId, date) => {
    return request(`/appointments/availability?doctorId=${doctorId}&date=${date}`);
  },

  update: (id, updates) => request(`/appointments/${id}`, { method: 'PUT', body: updates }),

  cancel: (id) => request(`/appointments/${id}`, { method: 'DELETE' }),
};

// ============================================
// AUTH (Simulado - agregar JWT en el futuro)
// ============================================
export const authAPI = {
  login: (email, password) => {
    // Por ahora simulamos el login guardando el email en localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    return Promise.resolve({ email, message: 'Logueado correctamente' });
  },

  register: (patient) => {
    // Crear el paciente y simular login
    return patientAPI.create(patient).then(response => {
      localStorage.setItem('userEmail', patient.email);
      localStorage.setItem('userId', response.patient._id);
      localStorage.setItem('isLoggedIn', 'true');
      return response;
    });
  },

  logout: () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    return Promise.resolve();
  },

  getCurrentUser: () => {
    const email = localStorage.getItem('userEmail');
    const userId = localStorage.getItem('userId');
    if (email && userId) {
      return { email, userId };
    }
    return null;
  },
};

export default {
  patientAPI,
  doctorAPI,
  appointmentAPI,
  authAPI,
};
