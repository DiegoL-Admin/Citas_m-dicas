import { useState } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/UI';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const CALENDAR = [
  [null, null, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, null, null, null],
];
const UNAVAILABLE = [1, 7, 13, 14, 19, 25, 26];

const MORNING_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
const AFTERNOON_SLOTS = ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const STEPS = ['Médico', 'Fecha & Hora', 'Datos', 'Confirmación'];
const CONSULT_TYPES = [
  { id: 'presencial', icon: '🏥', label: 'Presencial', sub: 'En consultorio' },
  { id: 'teleconsulta', icon: '💻', label: 'Teleconsulta', sub: 'Videollamada' },
  { id: 'domicilio', icon: '🏠', label: 'A domicilio', sub: '+$15 adicional' },
];

export default function BookAppointment({ navigate }) {
  const [selectedDay, setSelectedDay] = useState(4);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [consultType, setConsultType] = useState('presencial');
  const [notes, setNotes] = useState('');

  const isUnavailable = (d) => UNAVAILABLE.includes(d);

  return (
    <div>
      <PageHeader title="Agendar Cita" subtitle="Dr. Carlos García — Cardiología">
        <Button variant="ghost" size="sm" onClick={() => navigate('search')}>← Volver</Button>
      </PageHeader>

      <div style={{ padding: '28px 32px' }}>
        {/* Progress steps */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28, gap: 0 }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i === 0 ? colors.success : i === 1 ? colors.primary : colors.border,
                  color: i <= 1 ? colors.white : colors.textLight,
                  fontSize: 13, fontWeight: 700,
                }}>
                  {i === 0 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: 11, fontWeight: i === 1 ? 600 : 400, color: i === 1 ? colors.primary : i === 0 ? colors.text : colors.textLight, whiteSpace: 'nowrap' }}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: 2, background: i === 0 ? colors.primary : colors.border, margin: '-18px 8px 0' }} />
              )}
            </div>
          ))}
        </div>

        {/* Doctor card */}
        <Card style={{ padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar initials="CG" color={colors.accent} size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>Dr. Carlos García</div>
            <div style={{ fontSize: 13, color: colors.textSub }}>Cardiología · 15 años de experiencia</div>
            <div style={{ fontSize: 13, color: colors.warning, fontWeight: 600, marginTop: 4 }}>⭐ 4.9 · 312 reseñas · $45 por consulta</div>
            <div style={{ fontSize: 12, color: colors.textSub, marginTop: 2 }}>📍 Clínica Metropolitana, Guayaquil</div>
          </div>
          <Badge color={colors.accentLight} textColor={colors.accent} style={{ fontSize: 12, padding: '6px 14px' }}>🟢 Disponible</Badge>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Calendar */}
          <Card style={{ padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 20 }}>Selecciona la Fecha</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <button style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: colors.textSub }}>◀</button>
              <span style={{ fontWeight: 700, fontSize: 16, color: colors.text }}>Abril 2026</span>
              <button style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: colors.textSub }}>▶</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: colors.textSub, padding: '4px 0' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {CALENDAR.flat().map((day, idx) => {
                if (!day) return <div key={idx} />;
                const isSelected = day === selectedDay;
                const isToday = day === 3;
                const isUnavail = isUnavailable(day);
                return (
                  <button
                    key={idx}
                    onClick={() => !isUnavail && setSelectedDay(day)}
                    style={{
                      width: '100%', aspectRatio: '1', borderRadius: '50%', border: 'none',
                      background: isSelected ? colors.primary : isToday ? colors.primaryLight : 'transparent',
                      color: isSelected ? colors.white : isUnavail ? colors.textLight : colors.text,
                      fontWeight: isSelected ? 700 : 400,
                      fontSize: 13, cursor: isUnavail ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      textDecoration: isUnavail && !isSelected ? 'line-through' : 'none',
                      transition: 'all 0.15s',
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 16, fontSize: 11, color: colors.textSub }}>
              <span>🔵 Seleccionado</span>
              <span>○ Hoy</span>
              <span style={{ textDecoration: 'line-through' }}>No disponible</span>
            </div>
          </Card>

          {/* Time slots */}
          <Card style={{ padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 4 }}>Selecciona el Horario</div>
            <div style={{ fontSize: 12, color: colors.textSub, marginBottom: 20 }}>
              {selectedDay ? `Sábado ${selectedDay} de Abril, 2026` : 'Selecciona una fecha'}
            </div>

            <div style={{ fontWeight: 600, fontSize: 13, color: colors.text, marginBottom: 10 }}>🌅 Mañana</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {MORNING_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '12px', borderRadius: radius.md, border: `1.5px solid ${selectedSlot === slot ? colors.primary : colors.border}`,
                    background: selectedSlot === slot ? colors.primary : colors.white,
                    color: selectedSlot === slot ? colors.white : colors.text,
                    fontWeight: selectedSlot === slot ? 700 : 400,
                    fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div style={{ fontWeight: 600, fontSize: 13, color: colors.text, marginBottom: 10 }}>🌇 Tarde</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {AFTERNOON_SLOTS.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  style={{
                    padding: '12px', borderRadius: radius.md, border: `1.5px solid ${selectedSlot === slot ? colors.primary : colors.border}`,
                    background: selectedSlot === slot ? colors.primary : colors.bg,
                    color: selectedSlot === slot ? colors.white : colors.text,
                    fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div style={{ fontSize: 13, color: colors.textLight }}>🌙 Noche — No disponible</div>
          </Card>
        </div>

        {/* Consult type */}
        <Card style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 16 }}>Tipo de Consulta</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {CONSULT_TYPES.map(({ id, icon, label, sub }) => (
              <button
                key={id}
                onClick={() => setConsultType(id)}
                style={{
                  padding: '20px', borderRadius: radius.lg, textAlign: 'left',
                  border: `2px solid ${consultType === id ? colors.primary : colors.border}`,
                  background: consultType === id ? colors.primaryLight : colors.white,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontWeight: 700, color: consultType === id ? colors.primary : colors.text, fontSize: 15 }}>{label}</div>
                <div style={{ fontSize: 12, color: colors.textSub, marginTop: 2 }}>{sub}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Notes */}
        <Card style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 }}>Notas para el médico (opcional)</div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Describe tus síntomas o el motivo de la consulta..."
            rows={3}
            style={{
              width: '100%', padding: '14px 16px', border: `1.5px solid ${colors.border}`,
              borderRadius: radius.md, fontSize: 14, color: colors.text,
              fontFamily: 'inherit', resize: 'vertical', outline: 'none',
              boxSizing: 'border-box', transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = colors.primary}
            onBlur={e => e.target.style.borderColor = colors.border}
          />
        </Card>

        {/* Summary + CTA */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
          <div style={{
            flex: 1, background: colors.primaryLight, borderRadius: radius.lg,
            padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary }}>
              Resumen: Dr. García · Sáb {selectedDay} Abr · {selectedSlot} · {CONSULT_TYPES.find(t => t.id === consultType)?.label} · $45
            </div>
            <div style={{ fontSize: 12, color: colors.textSub, marginTop: 4 }}>Duración estimada: 45 minutos</div>
          </div>
          <Button variant="primary" size="lg" style={{ padding: '0 40px', borderRadius: radius.lg, fontSize: 16 }} onClick={() => navigate('confirmation')}>
            Confirmar Cita →
          </Button>
        </div>
      </div>
    </div>
  );
}
