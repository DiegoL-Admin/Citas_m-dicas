import { useState, useEffect } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/UI';
import { appointmentAPI, authAPI, doctorAPI } from '../services/api';

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MORNING_SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'];
const AFTERNOON_SLOTS = ['02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const STEPS = ['Médico', 'Fecha & Hora', 'Datos', 'Confirmación'];
const CONSULT_TYPES = [
  { id: 'presencial', icon: '🏥', label: 'Presencial', sub: 'En consultorio' },
  { id: 'teleconsulta', icon: '💻', label: 'Teleconsulta', sub: 'Videollamada' },
  { id: 'domicilio', icon: '🏠', label: 'A domicilio', sub: '+$15 adicional' },
];

const CALENDAR_DAYS = 30;

export default function BookAppointment({ navigate }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [consultType, setConsultType] = useState('presencial');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const doctorId = localStorage.getItem('selectedDoctorId');
  const doctorName = localStorage.getItem('selectedDoctorName');
  const doctorSpecialty = localStorage.getItem('selectedDoctorSpecialty');

  useEffect(() => {
    if (!doctorId) {
      navigate('search');
    }
  }, []);

  const handleConfirm = async () => {
    if (!selectedDay || !selectedSlot) {
      setError('Por favor selecciona fecha y hora');
      return;
    }

    if (!reason.trim()) {
      setError('Por favor describe el motivo de la cita');
      return;
    }

    const user = authAPI.getCurrentUser();
    if (!user) {
      setError('Debes iniciar sesión primero');
      navigate('login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear la fecha completa
      const now = new Date();
      const appointmentDate = new Date(now.getFullYear(), now.getMonth(), selectedDay);
      const [time, period] = selectedSlot.split(' ');
      const [hours, minutes] = time.split(':');
      let hour = parseInt(hours);
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
      appointmentDate.setHours(hour, parseInt(minutes), 0, 0);

      const appointment = await appointmentAPI.create({
        patientId: user.userId,
        doctorId,
        dateTime: appointmentDate.toISOString(),
        reason,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('appointments');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al crear la cita');
    } finally {
      setLoading(false);
    }
  };

  if (!doctorId) {
    return <div style={{ padding: 32, color: colors.text }}>Cargando...</div>;
  }

  return (
    <div>
      <PageHeader title="Agendar Cita" subtitle={`${doctorName} — ${doctorSpecialty}`}>
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
          <Avatar initials={doctorName.split(' ').map(n => n[0]).join('').toUpperCase()} color={colors.accent} size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{doctorName}</div>
            <div style={{ fontSize: 13, color: colors.textSub }}>{doctorSpecialty}</div>
            <div style={{ fontSize: 12, color: colors.textSub, marginTop: 2 }}>📞 Disponible para agendar</div>
          </div>
          <Badge color={colors.accentLight} textColor={colors.accent} style={{ fontSize: 12, padding: '6px 14px' }}>🟢 Disponible</Badge>
        </Card>

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

        {success && (
          <div style={{
            padding: 16,
            marginBottom: 16,
            background: '#ECFDF5',
            color: '#059669',
            borderRadius: 8,
            fontSize: 13,
            borderLeft: `3px solid #059669`,
          }}>
            ✓ Cita creada exitosamente. Redirigiendo...
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {/* Calendar */}
          <Card style={{ padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 20 }}>Selecciona la Fecha</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: colors.text }}>
                {new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: colors.textSub, padding: '4px 0' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {Array.from({ length: CALENDAR_DAYS }, (_, i) => {
                const day = i + 1;
                const now = new Date();
                const date = new Date(now.getFullYear(), now.getMonth(), day);
                const isSelected = day === selectedDay;
                const isPast = date < new Date(now.getFullYear(), now.getMonth(), now.getDate());

                return (
                  <button
                    key={i}
                    onClick={() => !isPast && setSelectedDay(day)}
                    style={{
                      width: '100%', aspectRatio: '1', borderRadius: '50%', border: 'none',
                      background: isSelected ? colors.primary : 'transparent',
                      color: isSelected ? colors.white : isPast ? colors.textLight : colors.text,
                      fontWeight: isSelected ? 700 : 400,
                      fontSize: 13,
                      cursor: isPast ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      textDecoration: isPast ? 'line-through' : 'none',
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
              <span style={{ textDecoration: 'line-through' }}>Pasado</span>
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

        {/* Reason for appointment */}
        <Card style={{ padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, marginBottom: 12 }}>Motivo de la cita</div>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
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
              Resumen: {doctorName} · {selectedDay ? `${selectedDay}` : 'Fecha'} · {selectedSlot} · {CONSULT_TYPES.find(t => t.id === consultType)?.label}
            </div>
            <div style={{ fontSize: 12, color: colors.textSub, marginTop: 4 }}>Duración estimada: 45 minutos</div>
          </div>
          <Button
            variant="primary"
            size="lg"
            style={{ padding: '0 40px', borderRadius: radius.lg, fontSize: 16 }}
            onClick={handleConfirm}
            disabled={loading || !selectedDay}
          >
            {loading ? 'Creando...' : 'Confirmar Cita →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
