import { useState, useEffect } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, SectionTitle } from '../components/UI';
import { appointmentAPI, authAPI } from '../services/api';

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

const TABS = ['Próximas', 'Completadas', 'Canceladas'];

export default function MyAppointments({ navigate }) {
  const [activeTab, setActiveTab] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const user = authAPI.getCurrentUser();
      if (!user) {
        navigate('login');
        return;
      }

      const response = await appointmentAPI.getPatientAppointments(user.userId);
      setAppointments(response.appointments || []);
    } catch (err) {
      setError(err.message || 'Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const getTabCount = (status) => {
    return appointments.filter(apt => apt.status === status).length;
  };

  const handleCancel = async (appointmentId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        await appointmentAPI.cancel(appointmentId);
        fetchAppointments();
      } catch (err) {
        alert('Error al cancelar: ' + err.message);
      }
    }
  };

  const getFilteredAppointments = () => {
    const statusMap = { 0: 'scheduled', 1: 'completed', 2: 'cancelled' };
    return appointments.filter(apt => apt.status === statusMap[activeTab]);
  };

  return (
    <div>
      <PageHeader title="Mis Citas" subtitle="Gestiona y revisa todas tus consultas médicas">
        <Button variant="primary" size="sm" onClick={() => navigate('book')}>+ Nueva Cita</Button>
      </PageHeader>

      <div style={{ padding: '28px 32px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '10px 20px', borderRadius: radius.md, border: 'none',
                background: activeTab === i ? colors.primary : colors.white,
                color: activeTab === i ? colors.white : colors.textSub,
                fontWeight: activeTab === i ? 700 : 400,
                fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                border: activeTab === i ? 'none' : `1px solid ${colors.border}`,
                transition: 'all 0.15s',
              }}
            >
              {tab} ({getTabCount(['scheduled', 'completed', 'cancelled'][i])})
            </button>
          ))}
        </div>

        {error && (
          <div style={{
            padding: 16,
            marginBottom: 16,
            background: '#FEE2E2',
            color: '#DC2626',
            borderRadius: 8,
            fontSize: 13,
            borderLeft: `3px solid #DC2626`,
          }}>
            {error}
          </div>
        )}

        {!loading && (
          <>
            {activeTab === 0 && (
              <>
                <SectionTitle>Próximas Citas</SectionTitle>
                {getFilteredAppointments().length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSub }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📅</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>No tienes citas próximas</div>
                    <Button variant="primary" onClick={() => navigate('search')} style={{ marginTop: 16 }}>
                      Agendar cita
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                    {getFilteredAppointments().map(appt => {
                      const initials = getInitials(appt.doctorId.name);
                      const color = getColor(appt._id);
                      return (
                        <Card key={appt._id} style={{ padding: 0, overflow: 'hidden' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                            <div style={{ width: 5, height: 80, background: color, borderRadius: 2, flexShrink: 0, margin: '-20px 0 -20px -24px' }} />
                            <Avatar initials={initials} color={color} size={52} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{appt.doctorId.name}</div>
                              <div style={{ fontSize: 12, color: colors.textSub }}>{appt.doctorId.specialty}</div>
                              <div style={{ fontSize: 12, color: colors.textSub, marginTop: 4 }}>
                                📅 {formatDate(appt.dateTime)} · 🕐 {formatTime(appt.dateTime)}
                              </div>
                              <div style={{ fontSize: 12, color: colors.textSub }}>Motivo: {appt.reason}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                              <Badge color={colors.accentLight} textColor={colors.accent}>Confirmada</Badge>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <Button variant="ghost" size="sm">Reprogramar</Button>
                                <Button variant="danger" size="sm" onClick={() => handleCancel(appt._id)}>
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {activeTab === 1 && (
              <>
                <SectionTitle>Historial de Consultas</SectionTitle>
                {getFilteredAppointments().length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSub }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>No tienes citas completadas</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {getFilteredAppointments().map(appt => {
                      const initials = getInitials(appt.doctorId.name);
                      const color = getColor(appt._id);
                      return (
                        <Card key={appt._id} style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <Avatar initials={initials} color={color} size={42} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{appt.doctorId.name}</div>
                              <div style={{ fontSize: 12, color: colors.textSub }}>{appt.doctorId.specialty}</div>
                              <div style={{ fontSize: 12, color: colors.textSub }}>Motivo: {appt.reason}</div>
                            </div>
                            <div style={{ fontSize: 12, color: colors.textSub, marginRight: 16 }}>{formatDate(appt.dateTime)}</div>
                            <Badge color={colors.accentLight} textColor={colors.accent}>Completada</Badge>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {activeTab === 2 && (
              <>
                <SectionTitle>Citas Canceladas</SectionTitle>
                {getFilteredAppointments().length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSub }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>No tienes citas canceladas</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {getFilteredAppointments().map(appt => {
                      const initials = getInitials(appt.doctorId.name);
                      const color = getColor(appt._id);
                      return (
                        <Card key={appt._id} style={{ padding: '16px 24px', opacity: 0.7 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                            <Avatar initials={initials} color={color} size={42} />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{appt.doctorId.name}</div>
                              <div style={{ fontSize: 12, color: colors.textSub }}>{appt.doctorId.specialty}</div>
                            </div>
                            <div style={{ fontSize: 12, color: colors.textSub, marginRight: 16 }}>{formatDate(appt.dateTime)}</div>
                            <Badge color='#FEE2E2' textColor='#DC2626'>Cancelada</Badge>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: colors.textSub }}>
            <div style={{ fontSize: 14 }}>Cargando citas...</div>
          </div>
        )}
      </div>
    </div>
  );
}
