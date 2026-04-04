import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, StatCard, SectionTitle } from '../components/UI';

const todayAppts = [
  { time: '08:00', patient: 'Ana Villacís', reason: 'Control cardiológico', duration: '45 min', status: 'Completada', color: colors.success, initials: 'AV' },
  { time: '09:00', patient: 'Roberto Cruz', reason: 'Primera consulta', duration: '60 min', status: 'Completada', color: colors.success, initials: 'RC' },
  { time: '10:30', patient: 'María Tello', reason: 'Seguimiento tratamiento', duration: '30 min', status: 'En curso', color: colors.primary, initials: 'MT' },
  { time: '11:30', patient: 'Jorge Mora', reason: 'Ecocardiograma', duration: '45 min', status: 'Siguiente', color: colors.warning, initials: 'JM' },
  { time: '02:00', patient: 'Sofía Lima', reason: 'Control rutinario', duration: '30 min', status: 'Pendiente', color: colors.textLight, initials: 'SL' },
  { time: '03:00', patient: 'Carlos Vera', reason: 'Teleconsulta', duration: '30 min', status: 'Pendiente', color: colors.textLight, initials: 'CV' },
  { time: '04:30', patient: 'Patricia Soto', reason: 'Primera consulta', duration: '60 min', status: 'Pendiente', color: colors.textLight, initials: 'PS' },
];

const queue = [
  { name: 'Jorge Mora', wait: 'En espera — 15 min', priority: 'Normal', color: colors.primary },
  { name: 'Sofía Lima', wait: 'Confirmada — 2:00 PM', priority: 'Normal', color: colors.primary },
  { name: 'Carlos Vera', wait: 'Confirmada — 3:00 PM', priority: 'Urgente', color: colors.danger },
];

const weekData = [
  { day: 'Lun', date: '3', count: 4 },
  { day: 'Mar', date: '4', count: 8 },
  { day: 'Mié', date: '5', count: 6 },
  { day: 'Jue', date: '6', count: 7 },
  { day: 'Vie', date: '7', count: 5 },
  { day: 'Sáb', date: '8', count: 3 },
];

const statusConfig = {
  'Completada': { bg: colors.accentLight, text: colors.accent },
  'En curso': { bg: colors.primaryLight, text: colors.primary },
  'Siguiente': { bg: colors.warningLight, text: colors.warning },
  'Pendiente': { bg: colors.bg, text: colors.textSub },
};

export default function DoctorPanel() {
  return (
    <div>
      <PageHeader title="Panel Principal — Dr. García" subtitle="Viernes 3 de Abril, 2026">
        <Button variant="primary" size="sm">+ Nueva Disponibilidad</Button>
      </PageHeader>

      <div style={{ padding: '28px 32px' }}>
        {/* KPI row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
          <StatCard icon="📅" label="Citas Hoy" value="8" sub="2 completadas · 6 pendientes" color={colors.primary} />
          <StatCard icon="👥" label="Pacientes este mes" value="127" sub="+12% vs mes anterior" color={colors.accent} />
          <StatCard icon="💰" label="Ingresos del mes" value="$4,850" sub="+8.3% vs mes anterior" color={colors.success} />
          <StatCard icon="🏆" label="Calificación" value="4.9 ⭐" sub="312 reseñas totales" color={colors.warning} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 24 }}>
          {/* Today's schedule */}
          <div>
            <SectionTitle action actionLabel="Ver semana →">Agenda de Hoy</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {todayAppts.map((appt, i) => {
                const st = statusConfig[appt.status];
                return (
                  <Card key={i} style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ minWidth: 52, textAlign: 'center' }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: appt.status === 'En curso' ? colors.primary : colors.text }}>{appt.time}</div>
                      <div style={{ fontSize: 9, color: colors.textLight }}>AM/PM</div>
                    </div>
                    <div style={{ width: 1, height: 48, background: colors.border }} />
                    <Avatar initials={appt.initials} color={appt.color} size={38} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{appt.patient}</div>
                      <div style={{ fontSize: 12, color: colors.textSub }}>{appt.reason} · {appt.duration}</div>
                    </div>
                    <Badge color={st.bg} textColor={st.text}>{appt.status}</Badge>
                    {appt.status === 'En curso' && (
                      <Button variant="success" size="sm">Iniciar 🔴</Button>
                    )}
                    {appt.status === 'Siguiente' && (
                      <Button variant="primary" size="sm">Preparar →</Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Weekly bar chart */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: colors.text }}>Esta Semana</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
                {weekData.map(({ day, date, count }, i) => {
                  const barH = Math.round((count / 10) * 100);
                  const isToday = i === 0;
                  return (
                    <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: isToday ? colors.primary : colors.textSub }}>{count}</span>
                      <div style={{
                        width: '100%', borderRadius: 6,
                        background: isToday ? colors.primary : colors.primaryLight,
                        height: `${barH}%`,
                        transition: 'height 0.3s',
                      }} />
                      <div style={{ fontSize: 11, color: colors.textSub }}>{day}</div>
                      <div style={{ fontSize: 10, fontWeight: isToday ? 700 : 400, color: isToday ? colors.primary : colors.textLight }}>{date}</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Patient queue */}
            <Card style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: colors.text }}>Cola de Pacientes</h3>
                <Badge color={colors.dangerLight} textColor={colors.danger}>3 en espera</Badge>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {queue.map(({ name, wait, priority, color }) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: colors.bg, borderRadius: radius.md }}>
                    <Avatar initials={name.split(' ').map(w => w[0]).join('')} color={color} size={36} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{name}</div>
                      <div style={{ fontSize: 11, color: colors.textSub }}>{wait}</div>
                    </div>
                    <Badge
                      color={priority === 'Urgente' ? colors.dangerLight : colors.bg}
                      textColor={priority === 'Urgente' ? colors.danger : colors.textSub}
                    >
                      {priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Revenue mini chart */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: colors.text }}>Ingresos del Mes</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 100, marginBottom: 12 }}>
                {[['Ene', 3200], ['Feb', 3800], ['Mar', 4400], ['Abr', 4850]].map(([month, val], i) => {
                  const h = Math.round((val / 5000) * 100);
                  const isLast = i === 3;
                  return (
                    <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: isLast ? colors.primary : colors.textSub }}>${(val / 1000).toFixed(1)}K</span>
                      <div style={{ width: '100%', borderRadius: 6, background: isLast ? colors.primary : colors.primaryLight, height: `${h}%` }} />
                      <span style={{ fontSize: 11, color: colors.textSub }}>{month}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>Total: $16,250</span>
                <span style={{ fontSize: 12, color: colors.success, fontWeight: 600 }}>+8.3% ↑</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
