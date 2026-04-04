import { useState } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, SectionTitle } from '../components/UI';

const specialties = ['Todos', 'Cardiología', 'Dermatología', 'Pediatría', 'Neurología', 'Ginecología', 'Traumatología', 'Psicología', 'Oftalmología'];

const doctors = [
  { id: 1, name: 'Dr. Carlos García', specialty: 'Cardiología', rating: 4.9, reviews: 312, exp: '15 años', available: 'Disponible', price: '$45', color: '#0CB7A6', initials: 'CG' },
  { id: 2, name: 'Dra. María López', specialty: 'Dermatología', rating: 4.8, reviews: 198, exp: '10 años', available: 'Hoy 3:30 PM', price: '$55', color: '#CC33AA', initials: 'ML' },
  { id: 3, name: 'Dr. Pedro Ruiz', specialty: 'Medicina General', rating: 4.7, reviews: 445, exp: '20 años', available: 'Mañana', price: '$30', color: '#F59E0B', initials: 'PR' },
  { id: 4, name: 'Dra. Ana Castillo', specialty: 'Neurología', rating: 4.9, reviews: 87, exp: '12 años', available: 'Disponible', price: '$70', color: colors.primary, initials: 'AC' },
  { id: 5, name: 'Dr. Marcos Vega', specialty: 'Pediatría', rating: 4.6, reviews: 521, exp: '18 años', available: 'Hoy 5:00 PM', price: '$40', color: '#22B85F', initials: 'MV' },
  { id: 6, name: 'Dra. Laura Nieto', specialty: 'Ginecología', rating: 4.8, reviews: 267, exp: '14 años', available: 'Mañana', price: '$60', color: '#9355EF', initials: 'LN' },
];

export default function SearchDoctor({ navigate }) {
  const [search, setSearch] = useState('');
  const [activeSpec, setActiveSpec] = useState('Todos');

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = activeSpec === 'Todos' || d.specialty === activeSpec;
    return matchSearch && matchSpec;
  });

  const isAvailableNow = (avail) => avail === 'Disponible' || avail.includes('Hoy');

  return (
    <div>
      <PageHeader title="Buscar Médico" subtitle="Encuentra el especialista que necesitas" />

      <div style={{ padding: '28px 32px' }}>
        {/* Search bar */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', fontSize: 18, color: colors.textSub }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Busca por nombre, especialidad o síntoma..."
            style={{
              width: '100%', padding: '16px 20px 16px 52px',
              border: `1.5px solid ${colors.border}`, borderRadius: 14,
              fontSize: 14, color: colors.text, background: colors.white,
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              boxShadow: shadow.sm, transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = colors.primary}
            onBlur={e => e.target.style.borderColor = colors.border}
          />
        </div>

        {/* Specialty chips */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setActiveSpec(spec)}
              style={{
                padding: '8px 18px', borderRadius: 20, border: 'none',
                background: activeSpec === spec ? colors.primary : colors.white,
                color: activeSpec === spec ? colors.white : colors.textSub,
                fontWeight: activeSpec === spec ? 600 : 400,
                fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                border: activeSpec === spec ? 'none' : `1.5px solid ${colors.border}`,
                transition: 'all 0.15s',
              }}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: colors.textSub, fontWeight: 600, alignSelf: 'center' }}>Filtros:</span>
          {['📍 Guayaquil', '⭐ 4+ estrellas', '💵 Seguro médico', '🕐 Disponible hoy'].map(f => (
            <span key={f} style={{
              padding: '6px 14px', borderRadius: 6, background: colors.accentLight,
              color: colors.accent, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}>{f}</span>
          ))}
        </div>

        {/* Results count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{filtered.length} médicos encontrados</span>
          <select style={{ border: `1px solid ${colors.border}`, borderRadius: 8, padding: '6px 12px', fontSize: 13, color: colors.textSub, fontFamily: 'inherit', background: colors.white }}>
            <option>Ordenar: Relevancia</option>
            <option>Mejor calificación</option>
            <option>Menor precio</option>
            <option>Disponibilidad</option>
          </select>
        </div>

        {/* Doctor grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {filtered.map(doc => (
            <Card key={doc.id} style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <Avatar initials={doc.initials} color={doc.color} size={56} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{doc.name}</div>
                      <div style={{ fontSize: 12, color: colors.textSub, marginTop: 2 }}>{doc.specialty} · {doc.exp} exp.</div>
                      <div style={{ fontSize: 12, color: colors.warning, fontWeight: 600, marginTop: 4 }}>
                        ⭐ {doc.rating} ({doc.reviews} reseñas)
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: colors.text }}>{doc.price}</div>
                      <div style={{ fontSize: 11, color: colors.textSub }}>por cita</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 10 }}>
                    <Badge
                      color={isAvailableNow(doc.available) ? colors.accentLight : colors.primaryLight}
                      textColor={isAvailableNow(doc.available) ? colors.accent : colors.primary}
                    >
                      {isAvailableNow(doc.available) ? '🟢' : '🔵'} {doc.available}
                    </Badge>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button variant="outline" size="sm" onClick={() => navigate('doctorProfile')}>Ver perfil</Button>
                      <Button variant="primary" size="sm" onClick={() => navigate('book')}>Agendar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: colors.textSub }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No se encontraron médicos</div>
            <div style={{ fontSize: 13 }}>Intenta con otro término de búsqueda o especialidad</div>
          </div>
        )}
      </div>
    </div>
  );
}
