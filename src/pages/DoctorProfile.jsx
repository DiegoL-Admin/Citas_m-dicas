import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button } from '../components/UI';

const reviews = [
  { name: 'Andrea M.', date: '28 Mar 2026', text: 'Excelente médico, muy profesional y atento. Explicó todo con claridad y detalle.', stars: 5 },
  { name: 'Roberto V.', date: '15 Mar 2026', text: 'Muy buena atención. El diagnóstico fue preciso y el tratamiento funcionó perfectamente.', stars: 5 },
  { name: 'Luisa P.', date: '5 Mar 2026', text: 'Recomendado totalmente. Puntual y muy dedicado a sus pacientes.', stars: 4 },
];

const schedule = [
  { day: 'Lunes – Miércoles', hours: '08:00 AM – 12:00 PM | 02:00 PM – 06:00 PM', avail: true },
  { day: 'Jueves – Viernes', hours: '08:00 AM – 01:00 PM', avail: true },
  { day: 'Sábado', hours: '09:00 AM – 12:00 PM', avail: true },
  { day: 'Domingo', hours: 'No disponible', avail: false },
];

const tags = ['Angioplastia', 'Marcapasos', 'Insuf. Cardíaca', 'Hipertensión', 'Arritmias', 'Ecocardiografía', 'Holter', 'Stent Coronario', 'Cateterismo'];

const starBreak = [[5, 89], [4, 8], [3, 2], [2, 1], [1, 0]];

export default function DoctorProfile({ navigate }) {
  return (
    <div>
      <PageHeader title="Perfil del Médico" subtitle="Dr. Carlos García — Cardiología">
        <Button variant="ghost" size="sm" onClick={() => navigate('search')}>← Volver a búsqueda</Button>
      </PageHeader>

      <div style={{ padding: '28px 32px' }}>
        {/* Hero card */}
        <Card style={{ padding: '28px 32px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 280, height: '100%', background: `linear-gradient(90deg, ${colors.primary}10, transparent)`, borderRadius: `${radius.lg}px 0 0 ${radius.lg}px` }} />
          <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Avatar initials="CG" color={colors.accent} size={120} />
              <Badge color={colors.accent} textColor={colors.white} style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 10 }}>
                ✓ Verificado
              </Badge>
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: '0 0 4px', fontSize: 26, fontWeight: 800, color: colors.text }}>Dr. Carlos García Martínez</h2>
              <p style={{ margin: '0 0 8px', fontSize: 16, color: colors.textSub }}>Cardiólogo Intervencionista</p>
              <p style={{ margin: '0 0 6px', fontSize: 13, color: colors.textSub }}>🏥 Clínica Metropolitana · 📍 Guayaquil, Ecuador</p>
              <p style={{ margin: 0, fontSize: 13, color: colors.warning, fontWeight: 600 }}>⭐ 4.9 / 5.0 · 312 reseñas · 15 años de experiencia</p>
              {/* Stats strip */}
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                {[['$45', 'por consulta'], ['45 min', 'duración'], ['< 24h', 'respuesta'], ['2.8K', 'pacientes']].map(([val, lbl]) => (
                  <div key={lbl} style={{ background: colors.bg, borderRadius: radius.md, padding: '12px 16px', textAlign: 'center', minWidth: 90 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>{val}</div>
                    <div style={{ fontSize: 11, color: colors.textSub, marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Button variant="primary" size="lg" onClick={() => navigate('book')}>Agendar Cita →</Button>
              <Button variant="outline" size="md">💬 Enviar Mensaje</Button>
              <Button variant="ghost" size="sm">❤️ Guardar en favoritos</Button>
            </div>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* About */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700, color: colors.text }}>Sobre el Doctor</h3>
              <p style={{ margin: 0, fontSize: 14, color: colors.textSub, lineHeight: 1.7 }}>
                Cardiólogo intervencionista con más de 15 años de experiencia en el tratamiento de enfermedades cardiovasculares. Especializado en angioplastia coronaria, marcapasos y manejo de insuficiencia cardíaca. Miembro de la Sociedad Ecuatoriana de Cardiología.
              </p>
            </Card>

            {/* Education */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: colors.text }}>Formación Académica</h3>
              {[
                ['Especialidad en Cardiología', 'Universidad de Guayaquil', '2010'],
                ['Medicina General', 'UCSG — Guayaquil', '2008'],
                ['Fellowship Cardiología Intervencionista', 'Cleveland Clinic, USA', '2013'],
              ].map(([title, inst, year]) => (
                <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: colors.primary, marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{title}</div>
                    <div style={{ fontSize: 12, color: colors.textSub }}>{inst} · {year}</div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Specializations */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 14px', fontSize: 15, fontWeight: 700, color: colors.text }}>Especialidades y Tratamientos</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tags.map(tag => (
                  <Badge key={tag} color={colors.primaryLight} textColor={colors.primary} style={{ fontSize: 12 }}>{tag}</Badge>
                ))}
              </div>
            </Card>

            {/* Schedule */}
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: colors.text }}>Horario de Atención</h3>
              {schedule.map(({ day, hours, avail }) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{day}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: avail ? colors.success : colors.danger }} />
                    <span style={{ fontSize: 12, color: avail ? colors.textSub : colors.textLight }}>{hours}</span>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Right column — Reviews */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Card style={{ padding: 24 }}>
              <h3 style={{ margin: '0 0 20px', fontSize: 15, fontWeight: 700, color: colors.text }}>Reseñas de Pacientes</h3>
              {/* Rating summary */}
              <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 52, fontWeight: 800, color: colors.text, lineHeight: 1 }}>4.9</div>
                  <div style={{ fontSize: 18, color: colors.warning, margin: '4px 0' }}>⭐⭐⭐⭐⭐</div>
                  <div style={{ fontSize: 11, color: colors.textSub }}>312 reseñas</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {starBreak.map(([stars, pct]) => (
                    <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 11, color: colors.textSub, width: 20 }}>{stars}★</span>
                      <div style={{ flex: 1, height: 6, background: colors.bg, borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: colors.primary, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11, color: colors.textSub, width: 28 }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Individual reviews */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {reviews.map(({ name, date, text, stars }) => (
                  <div key={name} style={{ padding: 16, border: `1px solid ${colors.border}`, borderRadius: radius.md }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={name[0] + name.split(' ')[1]?.[0]} color={colors.primary} size={34} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{name}</div>
                          <div style={{ fontSize: 11, color: colors.textSub }}>{date}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: colors.warning }}>{'⭐'.repeat(stars)}</div>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: colors.textSub, lineHeight: 1.5 }}>{text}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" fullWidth style={{ marginTop: 16 }}>Ver todas las reseñas →</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
