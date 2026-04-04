import { useState } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, SectionTitle } from '../components/UI';

const upcoming = [
  { id: 1, doctor: 'Dr. Carlos García', specialty: 'Cardiología', date: 'Sáb 4 Abr 2026', time: '10:00 AM', location: 'Clínica Metropolitana', type: 'Presencial', color: '#0CB7A6', initials: 'CG', status: 'Confirmada' },
  { id: 2, doctor: 'Dra. María López', specialty: 'Dermatología', date: 'Mar 8 Abr 2026', time: '3:30 PM', location: 'Videollamada', type: 'Teleconsulta', color: '#CC33AA', initials: 'ML', status: 'Pendiente' },
];

const completed = [
  { id: 3, doctor: 'Dr. Pedro Ruiz', specialty: 'Medicina General', date: '15 Mar 2026', diagnosis: 'Control rutinario', color: '#F59E0B', initials: 'PR', rating: 5 },
  { id: 4, doctor: 'Dra. Ana Castillo', specialty: 'Neurología', date: '2 Mar 2026', diagnosis: 'Cefalea tensional', color: colors.primary, initials: 'AC', rating: 5 },
  { id: 5, doctor: 'Dr. Marcos Vega', specialty: 'Pediatría', date: '20 Feb 2026', diagnosis: 'Revisión general', color: '#22B85F', initials: 'MV', rating: 4 },
  { id: 6, doctor: 'Dra. Laura Nieto', specialty: 'Ginecología', date: '5 Feb 2026', diagnosis: 'Control anual', color: '#9355EF', initials: 'LN', rating: 5 },
  { id: 7, doctor: 'Dr. Carlos García', specialty: 'Cardiología', date: '10 Ene 2026', diagnosis: 'Seguimiento', color: '#0CB7A6', initials: 'CG', rating: 5 },
];

const TABS = ['Próximas (2)', 'Completadas (18)', 'Canceladas (4)'];

export default function MyAppointments({ navigate }) {
  const [activeTab, setActiveTab] = useState(0);

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
              {tab}
            </button>
          ))}
          {/* Filter */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            {['Especialidad ▾', 'Mes ▾', 'Estado ▾'].map(f => (
              <select key={f} style={{ border: `1px solid ${colors.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 12, color: colors.textSub, fontFamily: 'inherit', background: colors.white }}>
                <option>{f}</option>
              </select>
            ))}
          </div>
        </div>

        {activeTab === 0 && (
          <>
            <SectionTitle>Próximas Citas</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
              {upcoming.map(appt => (
                <Card key={appt.id} style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px' }}>
                    <div style={{ width: 5, height: 80, background: appt.color, borderRadius: 2, flexShrink: 0, margin: '-20px 0 -20px -24px' }} />
                    <Avatar initials={appt.initials} color={appt.color} size={52} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{appt.doctor}</div>
                      <div style={{ fontSize: 12, color: colors.textSub }}>{appt.specialty} · {appt.type}</div>
                      <div style={{ fontSize: 12, color: colors.textSub, marginTop: 4 }}>📅 {appt.date} · 🕐 {appt.time}</div>
                      <div style={{ fontSize: 12, color: colors.textSub }}>📍 {appt.location}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                      <Badge
                        color={appt.status === 'Confirmada' ? colors.accentLight : colors.primaryLight}
                        textColor={appt.status === 'Confirmada' ? colors.accent : colors.primary}
                      >{appt.status}</Badge>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {appt.type === 'Teleconsulta' && (
                          <Button variant="success" size="sm">Unirse 💻</Button>
                        )}
                        {appt.type === 'Presencial' && (
                          <Button variant="primary" size="sm">Ver detalles</Button>
                        )}
                        <Button variant="ghost" size="sm">Reprogramar</Button>
                        <Button variant="danger" size="sm">Cancelar</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>
            <SectionTitle>Historial de Consultas</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {completed.map(appt => (
                <Card key={appt.id} style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Avatar initials={appt.initials} color={appt.color} size={42} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{appt.doctor}</div>
                      <div style={{ fontSize: 12, color: colors.textSub }}>{appt.specialty}</div>
                      <div style={{ fontSize: 12, color: colors.textSub }}>Diagnóstico: {appt.diagnosis}</div>
                    </div>
                    <div style={{ fontSize: 12, color: colors.textSub, marginRight: 16 }}>{appt.date}</div>
                    <div style={{ fontSize: 13, color: colors.warning }}>{'⭐'.repeat(appt.rating)}</div>
                    <Badge color={colors.accentLight} textColor={colors.accent}>Completada</Badge>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="outline" size="sm" onClick={() => navigate('doctorProfile')}>Ver detalle</Button>
                      <Button variant="ghost" size="sm">★ Calificar</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 2 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: colors.textSub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>❌</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>4 citas canceladas</div>
            <div style={{ fontSize: 13, marginBottom: 24 }}>Estas citas fueron canceladas por ti o por el médico</div>
            <Button variant="primary" onClick={() => navigate('book')}>Reagendar una cita</Button>
          </div>
        )}
      </div>
    </div>
  );
}
