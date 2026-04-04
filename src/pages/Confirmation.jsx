import { useState } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Button } from '../components/UI';

const notifications = [
  { icon: '✅', title: 'Cita confirmada', msg: 'Tu cita con el Dr. García para el Sáb 4 Abr está confirmada.', time: 'Ahora', read: false, color: colors.accentLight },
  { icon: '💊', title: 'Recordatorio de medicación', msg: 'No olvides tomar tu Aspirina 100mg diaria.', time: 'Hace 2h', read: false, color: colors.primaryLight },
  { icon: '🔔', title: 'Cita en 24 horas', msg: 'Mañana tienes cita con el Dr. García a las 10:00 AM.', time: 'Ayer', read: true, color: colors.white },
  { icon: '📋', title: 'Resultados disponibles', msg: 'Tus resultados del electrocardiograma ya están listos.', time: 'Hace 2 días', read: true, color: colors.white },
  { icon: '⭐', title: 'Califica tu consulta', msg: '¿Cómo fue tu experiencia con el Dr. Ruiz?', time: 'Hace 3 días', read: true, color: colors.white },
  { icon: '💬', title: 'Mensaje del médico', msg: 'El Dr. García respondió tu consulta.', time: 'Hace 5 días', read: true, color: colors.white },
];

const paymentMethods = ['💳 Tarjeta', '🏦 Transferencia', '💵 Efectivo'];

export default function Confirmation({ navigate }) {
  const [payMethod, setPayMethod] = useState(0);

  return (
    <div>
      <PageHeader title="Confirmación de Cita" subtitle="Tu cita ha sido agendada exitosamente" />

      <div style={{ padding: '28px 32px' }}>
        {/* Success card */}
        <Card style={{ padding: '36px 40px', marginBottom: 28, textAlign: 'center' }}>
          {/* Success icon */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{
              width: 100, height: 100, borderRadius: 50, background: colors.accentLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 76, height: 76, borderRadius: 38, background: colors.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, color: colors.white, fontWeight: 800,
              }}>✓</div>
            </div>
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 800, color: colors.text }}>¡Cita Confirmada!</h2>
          <p style={{ margin: '0 0 28px', color: colors.textSub, fontSize: 14 }}>
            Recibirás un recordatorio 24h antes de tu cita por correo electrónico y notificación push.
          </p>

          {/* Appointment details */}
          <div style={{
            background: colors.primaryLight, borderRadius: radius.lg,
            padding: '20px 28px', marginBottom: 24, textAlign: 'left',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
              {[
                ['👨‍⚕️ Médico', 'Dr. Carlos García — Cardiología'],
                ['📅 Fecha', 'Sábado, 4 de Abril de 2026'],
                ['🕐 Hora', '10:00 AM (45 minutos aprox.)'],
                ['📍 Lugar', 'Clínica Metropolitana, Guayaquil'],
                ['💳 Pago', '$45.00 — Pendiente de pago'],
                ['🔖 Código', 'CITA-2026-7843'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: colors.textSub, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="md">📅 Agregar al Calendario</Button>
            <Button variant="outline" size="md">⬇️ Descargar Comprobante</Button>
            <Button variant="ghost" size="md">↗️ Compartir Cita</Button>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Payment */}
          <Card style={{ padding: 28 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: colors.text }}>Pago de Consulta</h3>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: colors.textSub }}>Monto a pagar</p>
            <div style={{ fontSize: 40, fontWeight: 800, color: colors.text, marginBottom: 4 }}>$45.00</div>
            <p style={{ margin: '0 0 20px', fontSize: 12, color: colors.textSub }}>Consulta cardiológica — 45 min</p>
            <hr style={{ border: 'none', borderTop: `1px solid ${colors.border}`, marginBottom: 16 }} />
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: colors.textSub }}>Métodos de pago:</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              {paymentMethods.map((method, i) => (
                <button
                  key={method}
                  onClick={() => setPayMethod(i)}
                  style={{
                    flex: 1, padding: '12px 8px', borderRadius: radius.md,
                    border: `1.5px solid ${payMethod === i ? colors.primary : colors.border}`,
                    background: payMethod === i ? colors.primaryLight : colors.bg,
                    color: payMethod === i ? colors.primary : colors.textSub,
                    fontWeight: payMethod === i ? 700 : 400,
                    fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
            <Button variant="primary" size="lg" fullWidth>Pagar $45.00 →</Button>
          </Card>

          {/* Notifications */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colors.text }}>Notificaciones</h3>
              <button style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Marcar como leídas
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 380, overflowY: 'auto' }}>
              {notifications.map(({ icon, title, msg, time, read, color }) => (
                <div key={title} style={{
                  display: 'flex', gap: 12, padding: '12px 14px', borderRadius: radius.md,
                  background: color, position: 'relative',
                  border: read ? 'none' : `1px solid ${colors.border}`,
                }}>
                  {!read && (
                    <div style={{
                      position: 'absolute', top: 14, left: 6,
                      width: 6, height: 6, borderRadius: 3, background: colors.primary,
                    }} />
                  )}
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{title}</div>
                    <div style={{ fontSize: 11, color: colors.textSub, lineHeight: 1.4 }}>{msg}</div>
                  </div>
                  <div style={{ fontSize: 10, color: colors.textLight, whiteSpace: 'nowrap', flexShrink: 0 }}>{time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 24 }}>
          <Button variant="ghost" size="md" onClick={() => navigate('dashboard')}>← Volver al Dashboard</Button>
          <Button variant="primary" size="md" onClick={() => navigate('appointments')}>Ver mis citas →</Button>
          <Button variant="outline" size="md" onClick={() => navigate('search')}>Buscar otro médico →</Button>
        </div>
      </div>
    </div>
  );
}
