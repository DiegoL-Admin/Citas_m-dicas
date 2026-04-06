import { useState } from 'react';
import { colors, radius, shadow } from '../theme';
import { Button, Input } from '../components/UI';
import { authAPI, patientAPI } from '../services/api';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authAPI.login(email, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !name || !phone || !age) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await authAPI.register({
        name,
        email,
        phone,
        age: parseInt(age),
        medicalHistory: '',
      });
      onLogin();
    } catch (err) {
      setError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left hero */}
      <div style={{
        width: 600,
        background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 60%, #4A90E2 100%)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, left: -60,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />

        <div style={{ fontSize: 28, fontWeight: 800, color: colors.white, marginBottom: 8 }}>🏥 MediCitas</div>
        <h1 style={{
          fontSize: 48, fontWeight: 800, color: colors.white,
          lineHeight: 1.15, margin: '32px 0 20px',
          letterSpacing: '-1px',
        }}>
          Tu salud,<br />nuestra<br />prioridad.
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, maxWidth: 380, margin: '0 0 48px' }}>
          Agenda citas médicas con los mejores especialistas de forma rápida y segura.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16 }}>
          {[['2,500+', 'Médicos'], ['98%', 'Satisfacción'], ['50K+', 'Pacientes']].map(([val, lbl]) => (
            <div key={lbl} style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: radius.lg,
              padding: '16px 20px',
              backdropFilter: 'blur(8px)',
              flex: 1,
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.white }}>{val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.white,
        padding: '60px 80px',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: colors.text, margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            Bienvenido de vuelta
          </h2>
          <p style={{ fontSize: 14, color: colors.textSub, margin: '0 0 32px' }}>
            Ingresa tus credenciales para continuar
          </p>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: colors.bg,
            borderRadius: radius.md,
            padding: 4,
            marginBottom: 28,
          }}>
            {['login', 'register'].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: radius.sm,
                background: tab === t ? colors.white : 'transparent',
                boxShadow: tab === t ? shadow.sm : 'none',
                color: tab === t ? colors.text : colors.textSub,
                fontWeight: tab === t ? 600 : 400,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
              }}>
                {t === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            ))}
          </div>

          {error && (
            <div style={{
              padding: 12,
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

          <form onSubmit={tab === 'login' ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {tab === 'register' && (
              <>
                <Input
                  label="Nombre completo"
                  placeholder="Tu nombre"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Input
                  label="Teléfono"
                  placeholder="1234567890"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <Input
                  label="Edad"
                  placeholder="30"
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
              </>
            )}

            <Input
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              label="Contraseña"
              placeholder="••••••••••"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {tab === 'login' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: colors.textSub, cursor: 'pointer' }}>
                  <input type="checkbox" /> Recordarme
                </label>
                <button style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <Button variant="primary" size="lg" fullWidth disabled={loading}>
              {loading ? 'Cargando...' : tab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: colors.border }} />
            <span style={{ fontSize: 12, color: colors.textLight }}>o continúa con</span>
            <div style={{ flex: 1, height: 1, background: colors.border }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 12 }}>
            {['G  Google', '  Apple'].map(label => (
              <button key={label} style={{
                flex: 1, padding: '12px', border: `1.5px solid ${colors.border}`,
                borderRadius: radius.md, background: colors.white,
                fontSize: 14, fontWeight: 600, color: colors.text,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s',
              }}
                onMouseEnter={e => e.target.style.borderColor = colors.primary}
                onMouseLeave={e => e.target.style.borderColor = colors.border}
              >
                {label}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: colors.textSub, marginTop: 24 }}>
            ¿No tienes cuenta?{' '}
            <button onClick={() => setTab('register')} style={{ background: 'none', border: 'none', color: colors.primary, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Regístrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
