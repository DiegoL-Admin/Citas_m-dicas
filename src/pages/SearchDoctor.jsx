import { useState, useEffect } from 'react';
import { colors, radius, shadow } from '../theme';
import { PageHeader, Card, Badge, Avatar, Button, SectionTitle } from '../components/UI';
import { doctorAPI } from '../services/api';

const SPECIALTIES = ['Todos', 'Cardiología', 'Dermatología', 'Pediatría', 'Neurología', 'Ginecología', 'Traumatología', 'Neumología', 'Psicología'];
const COLORS = ['#0CB7A6', '#CC33AA', '#F59E0B', colors.primary, '#22B85F', '#9355EF', '#ED3B3B', '#4A90E2'];

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getColor = (id) => {
  return COLORS[id.charCodeAt(id.length - 1) % COLORS.length];
};

export default function SearchDoctor({ navigate }) {
  const [search, setSearch] = useState('');
  const [activeSpec, setActiveSpec] = useState('Todos');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, [activeSpec]);

  const fetchDoctors = async () => {
    setLoading(true);
    setError('');
    try {
      const specialty = activeSpec === 'Todos' ? null : activeSpec;
      const response = await doctorAPI.getAll(specialty);
      setDoctors(response.doctors || []);
    } catch (err) {
      setError(err.message || 'Error al cargar los doctores');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

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
          {SPECIALTIES.map(spec => (
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
          <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
            {loading ? 'Cargando...' : `${filtered.length} médicos encontrados`}
          </span>
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

        {/* Doctor grid */}
        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {filtered.map(doc => {
              const initials = getInitials(doc.name);
              const color = getColor(doc._id);
              return (
                <Card key={doc._id} style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <Avatar initials={initials} color={color} size={56} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{doc.name}</div>
                          <div style={{ fontSize: 12, color: colors.textSub, marginTop: 2 }}>{doc.specialty}</div>
                          <div style={{ fontSize: 12, color: colors.textSub, marginTop: 4 }}>📞 {doc.phone}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 10 }}>
                        <Badge color={colors.accentLight} textColor={colors.accent}>
                          🟢 Disponible
                        </Badge>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Button variant="outline" size="sm" onClick={() => navigate('doctorProfile')}>Ver perfil</Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              localStorage.setItem('selectedDoctorId', doc._id);
                              localStorage.setItem('selectedDoctorName', doc.name);
                              localStorage.setItem('selectedDoctorSpecialty', doc.specialty);
                              navigate('book');
                            }}
                          >
                            Agendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
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
