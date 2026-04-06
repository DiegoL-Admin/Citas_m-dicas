import { useState, useEffect } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, StatCard, SectionTitle } from '../components/UI';
import { appointmentAPI, authAPI, doctorAPI } from '../services/api';

const COLORS = ['#0CB7A6', '#CC33AA', '#F59E0B', colors.primary, '#22B85F', '#9355EF', '#ED3B3B', '#4A90E2'];

const getColor = (id) => {
  return COLORS[id.charCodeAt(id.length - 1) % COLORS.length];
};

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
};

const quickActions = [
  { icon: '🔍', label: 'Buscar Médico', color: colors.primaryLight, textColor: colors.primary, page: 'search' },
  { icon: '📅', label: 'Nueva Cita', color: colors.accentLight, textColor: colors.accent, page: 'search' },
  { icon: '💊', label: 'Mis Recetas', color: '#F3ECFE', textColor: '#9355EF', page: 'appointments' },
  { icon: '📋', label: 'Mis Citas', color: '#FEF3C7', textColor: '#F59E0B', page: 'appointments' },
  { icon: '💬', label: 'Chat con Médico', color: '#E8F9EE', textColor: '#22B85F', page: 'doctorProfile' },
  { icon: '🚑', label: 'Urgencias', color: '#FDE8E8', textColor: '#ED3B3B', page: 'search' },
];

export default function Dashboard({ navigate }) {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const currentUser = authAPI.getCurrentUser();
      if (currentUser) {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          appointmentAPI.getPatientAppointments(currentUser.userId),
          doctorAPI.getAll(),
        ]);
        setAppointments(appointmentsRes.appointments || []);
        setDoctors(doctorsRes.doctors || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments
    .filter(apt => apt.status === 'scheduled')
    .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
    .slice(0, 3);

  const recommendedDoctors = doctors.slice(0, 4);
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Viernes, 3 de Abril 2026">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{
            width: 36, height: 36, borderRadius: 10, border: 'none',
            background: colors.primaryLight, cursor: 'pointer', fontSize: 16,
          }}>🔔</button>
          <Avatar initials="DL" color={colors.accent} size={40} />
        </div>
      </PageHeader>

      <div style={{ padding: '28px 32px', maxWidth: 1200 }}>
        {/* Welcome banner */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          borderRadius: 20,
          padding: '28px 36px',
          marginBottom: 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 240, height: 240, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: colors.white }}>
            ¡Hola, {user?.email?.split('@')[0] || 'Paciente'}! 👋
          </h2>
          <p style={{ margin: '8px 0 20px', color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
            {upcomingAppointments.length > 0
              ? `Tienes ${upcomingAppointments.length} cita${upcomingAppointments.length > 1 ? 's' : ''} programada${upcomingAppointments.length > 1 ? 's' : ''} esta semana.`
              : 'No tienes citas próximas. ¡Agenda una ahora!'}
          </p>
          <button onClick={() => navigate('appointments')} style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 8, padding: '8px 20px',
            color: colors.white, fontWeight: 600, fontSize: 13,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Ver mis citas →
          </button>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          <StatCard
            icon="📅"
            label="Próxima Cita"
            value={upcomingAppointments.length > 0 ? formatDate(upcomingAppointments[0].dateTime) : 'Ninguna'}
            sub={upcomingAppointments.length > 0 ? formatTime(upcomingAppointments[0].dateTime) + ' - ' + upcomingAppointments[0].doctorId.name : 'Agenda una cita'}
            color={colors.primary}
          />
          <StatCard
            icon="🩺"
            label="Citas este mes"
            value={appointments.length}
            sub={`${appointments.filter(a => a.status === 'completed').length} completada${appointments.filter(a => a.status === 'completed').length !== 1 ? 's' : ''} · ${appointments.filter(a => a.status === 'scheduled').length} pendientes`}
            color={colors.accent}
          />
          <StatCard
            icon="❤️"
            label="Doctores disponibles"
            value={doctors.length}
            sub="En nuestro sistema"
            color="#9355EF"
          />
          <StatCard
            icon="📋"
            label="Historial total"
            value={appointments.length}
            sub={`Desde tu registro`}
            color={colors.warning}
          />
        </div>

        {/* Upcoming appointments */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle action onAction={() => navigate('appointments')}>Próximas Citas</SectionTitle>
          {upcomingAppointments.length === 0 ? (
            <Card style={{ padding: '40px 20px', textAlign: 'center', color: colors.textSub }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>No tienes citas próximas</div>
              <Button variant="primary" onClick={() => navigate('search')}>
                Agendar una cita
              </Button>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcomingAppointments.map(appt => {
                const initials = getInitials(appt.doctorId.name);
                const color = getColor(appt._id);
                return (
                  <Card key={appt._id} style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 16 }}>
                      <div style={{ width: 4, height: 60, background: color, borderRadius: 2, flexShrink: 0, margin: '-16px -4px -16px -20px' }} />
                      <Avatar initials={initials} color={color} size={44} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: colors.text, fontSize: 14 }}>{appt.doctorId.name}</div>
                        <div style={{ fontSize: 12, color: colors.textSub }}>{appt.doctorId.specialty}</div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: 13, color: colors.textSub, marginRight: 16 }}>
                        <div>📅 {formatDate(appt.dateTime)}</div>
                        <div>🕐 {formatTime(appt.dateTime)}</div>
                      </div>
                      <Badge color={colors.accentLight} textColor={colors.accent}>
                        Confirmada
                      </Badge>
                      <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
                        <Button variant="ghost" size="sm">Reprogramar</Button>
                        <Button variant="danger" size="sm">Cancelar</Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle>Acciones Rápidas</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
            {quickActions.map(({ icon, label, color, textColor, page }) => (
              <Card
                key={label}
                onClick={() => navigate(page)}
                style={{ padding: '20px 16px', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s', textAlign: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 10px' }}>
                  {icon}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.text, lineHeight: 1.3 }}>{label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended doctors */}
        <div>
          <SectionTitle action onAction={() => navigate('search')}>Médicos Disponibles</SectionTitle>
          {doctors.length === 0 ? (
            <Card style={{ padding: '40px 20px', textAlign: 'center', color: colors.textSub }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>👨‍⚕️</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>No hay doctores disponibles</div>
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {recommendedDoctors.map(doc => {
                const initials = getInitials(doc.name);
                const color = getColor(doc._id);
                return (
                  <Card key={doc._id} style={{ padding: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <Avatar initials={initials} color={color} size={48} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{doc.name}</div>
                        <div style={{ fontSize: 12, color: colors.textSub }}>{doc.specialty}</div>
                        <div style={{ fontSize: 12, color: colors.warning, fontWeight: 600 }}>🟢 Disponible</div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        localStorage.setItem('selectedDoctorId', doc._id);
                        localStorage.setItem('selectedDoctorName', doc.name);
                        localStorage.setItem('selectedDoctorSpecialty', doc.specialty);
                        navigate('book');
                      }}
                    >
                      Agendar →
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
