import { colors } from '../theme';

const navItems = [
  { id: 'dashboard', icon: '⊞', label: 'Dashboard' },
  { id: 'appointments', icon: '📅', label: 'Mis Citas' },
  { id: 'search', icon: '🔍', label: 'Buscar Médico' },
  { id: 'doctorProfile', icon: '👨‍⚕️', label: 'Perfil Médico' },
  { id: 'doctorPanel', icon: '📊', label: 'Panel Médico' },
  { id: 'book', icon: '📝', label: 'Agendar Cita' },
  { id: 'confirmation', icon: '✅', label: 'Confirmación' },
];

export default function Sidebar({ currentPage, navigate, onLogout }) {
  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: colors.navBg,
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px' }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: colors.white, letterSpacing: '-0.5px' }}>
          🏥 MediCitas
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>
          Sistema de Citas
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 8 }} />

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {navItems.map(({ id, icon, label }) => {
          const isActive = currentPage === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '12px 24px',
                border: 'none',
                background: isActive ? colors.primary : 'transparent',
                color: isActive ? colors.white : 'rgba(255,255,255,0.5)',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
                borderRadius: 0,
                fontFamily: "inherit",
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{icon}</span>
              {label}
              {isActive && (
                <div style={{
                  marginLeft: 'auto',
                  width: 4,
                  height: 4,
                  borderRadius: 2,
                  background: colors.white,
                  opacity: 0.6,
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div style={{ padding: 16 }}>
        <div style={{
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 12,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: colors.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: colors.white, flexShrink: 0,
          }}>DL</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: colors.white }}>Diego L.</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Paciente</div>
          </div>
          <button
            onClick={onLogout}
            title="Cerrar sesión"
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              fontSize: 16,
              padding: 4,
              borderRadius: 6,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >↩</button>
        </div>
      </div>
    </aside>
  );
}
