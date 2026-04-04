import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, StatCard, SectionTitle } from '../components/UI';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Carlos García', specialty: 'Cardiología', date: 'Sáb 4 Abr', time: '10:00 AM', status: 'Confirmada', color: '#0CB7A6', initials: 'CG' },
  { id: 2, doctor: 'Dra. María López', specialty: 'Dermatología', date: 'Mar 8 Abr', time: '3:30 PM', status: 'Pendiente', color: '#CC33AA', initials: 'ML' },
  { id: 3, doctor: 'Dr. Pedro Ruiz', specialty: 'Medicina General', date: 'Vie 11 Abr', time: '9:00 AM', status: 'Pendiente', color: '#F59E0B', initials: 'PR' },
];

const recommendedDoctors = [
  { name: 'Dr. Andrés Mora', specialty: 'Neurología', rating: '4.9', color: colors.primary, initials: 'AM' },
  { name: 'Dra. Sofia Torres', specialty: 'Ginecología', rating: '4.8', color: '#CC33AA', initials: 'ST' },
  { name: 'Dr. Luis Pérez', specialty: 'Traumatología', rating: '4.7', color: colors.accent, initials: 'LP' },
  { name: 'Dra. Ana Castro', specialty: 'Pediatría', rating: '4.9', color: '#F59E0B', initials: 'AC' },
];

const quickActions = [
  { icon: '🔍', label: 'Buscar Médico', color: colors.primaryLight, textColor: colors.primary, page: 'search' },
  { icon: '📅', label: 'Nueva Cita', color: colors.accentLight, textColor: colors.accent, page: 'book' },
  { icon: '💊', label: 'Mis Recetas', color: '#F3ECFE', textColor: '#9355EF', page: 'appointments' },
  { icon: '📋', label: 'Resultados de Lab.', color: '#FEF3C7', textColor: '#F59E0B', page: 'appointments' },
  { icon: '💬', label: 'Chat con Médico', color: '#E8F9EE', textColor: '#22B85F', page: 'doctorProfile' },
  { icon: '🚑', label: 'Urgencias', color: '#FDE8E8', textColor: '#ED3B3B', page: 'search' },
];

export default function Dashboard({ navigate }) {
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
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: colors.white }}>¡Hola, Diego! 👋</h2>
          <p style={{ margin: '8px 0 20px', color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
            Tienes 2 citas programadas esta semana. Tu próxima cita es mañana a las 10:00 AM.
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
          <StatCard icon="📅" label="Próxima Cita" value="Mañana" sub="10:00 AM - Dr. García" color={colors.primary} />
          <StatCard icon="🩺" label="Citas este mes" value="3" sub="1 completada · 2 pendientes" color={colors.accent} />
          <StatCard icon="❤️" label="Médicos favoritos" value="5" sub="Guardados en tu lista" color="#9355EF" />
          <StatCard icon="📋" label="Historial total" value="24" sub="Desde enero 2023" color={colors.warning} />
        </div>

        {/* Upcoming appointments */}
        <div style={{ marginBottom: 28 }}>
          <SectionTitle action onAction={() => navigate('appointments')}>Próximas Citas</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcomingAppointments.map(appt => (
              <Card key={appt.id} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 16 }}>
                  <div style={{ width: 4, height: 60, background: appt.color, borderRadius: 2, flexShrink: 0, margin: '-16px -4px -16px -20px' }} />
                  <Avatar initials={appt.initials} color={appt.color} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: colors.text, fontSize: 14 }}>{appt.doctor}</div>
                    <div style={{ fontSize: 12, color: colors.textSub }}>{appt.specialty}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 13, color: colors.textSub, marginRight: 16 }}>
                    <div>📅 {appt.date}</div>
                    <div>🕐 {appt.time}</div>
                  </div>
                  <Badge
                    color={appt.status === 'Confirmada' ? colors.accentLight : colors.primaryLight}
                    textColor={appt.status === 'Confirmada' ? colors.accent : colors.primary}
                  >
                    {appt.status}
                  </Badge>
                  <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
                    <Button variant="ghost" size="sm">Reprogramar</Button>
                    <Button variant="danger" size="sm">Cancelar</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
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
          <SectionTitle action onAction={() => navigate('search')}>Médicos Recomendados</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {recommendedDoctors.map(doc => (
              <Card key={doc.name} style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Avatar initials={doc.initials} color={doc.color} size={48} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{doc.name}</div>
                    <div style={{ fontSize: 12, color: colors.textSub }}>{doc.specialty}</div>
                    <div style={{ fontSize: 12, color: colors.warning, fontWeight: 600 }}>⭐ {doc.rating}</div>
                  </div>
                </div>
                <Button variant="primary" size="sm" fullWidth onClick={() => navigate('doctorProfile')}>
                  Agendar →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
