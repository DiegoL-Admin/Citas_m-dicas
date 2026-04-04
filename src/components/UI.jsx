import { colors, shadow, radius } from '../theme';

export function PageHeader({ title, subtitle, children }) {
  return (
    <div style={{
      background: colors.white,
      borderBottom: `1px solid ${colors.border}`,
      padding: '0 32px',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: colors.text }}>{title}</h1>
        {subtitle && <p style={{ margin: 0, fontSize: 12, color: colors.textSub, marginTop: 2 }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Card({ children, style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: colors.white,
        borderRadius: radius.lg,
        boxShadow: shadow.sm,
        ...style,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, color = colors.primaryLight, textColor = colors.primary, style = {} }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: radius.full,
      fontSize: 11,
      fontWeight: 600,
      background: color,
      color: textColor,
      ...style,
    }}>
      {children}
    </span>
  );
}

export function Avatar({ initials, color = colors.primary, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color: colors.white,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', onClick, style = {}, fullWidth = false }) {
  const variants = {
    primary: { background: colors.primary, color: colors.white, border: 'none' },
    outline: { background: 'transparent', color: colors.primary, border: `1.5px solid ${colors.primary}` },
    ghost: { background: colors.bg, color: colors.textSub, border: 'none' },
    danger: { background: colors.dangerLight, color: colors.danger, border: 'none' },
    success: { background: colors.accentLight, color: colors.accent, border: 'none' },
  };
  const sizes = {
    sm: { padding: '6px 14px', fontSize: 12 },
    md: { padding: '10px 20px', fontSize: 14 },
    lg: { padding: '14px 28px', fontSize: 16 },
  };
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        borderRadius: radius.md,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        width: fullWidth ? '100%' : 'auto',
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function Input({ label, placeholder, type = 'text', value, onChange }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: colors.textSub, marginBottom: 6 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `1.5px solid ${colors.border}`,
          borderRadius: radius.md,
          fontSize: 14,
          color: colors.text,
          background: colors.white,
          outline: 'none',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = colors.primary}
        onBlur={e => e.target.style.borderColor = colors.border}
      />
    </div>
  );
}

export function StatCard({ icon, label, value, sub, color }) {
  return (
    <Card style={{ padding: '20px 24px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: radius.md,
          background: color + '22',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>{icon}</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: colors.textSub, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: colors.text, lineHeight: 1.1, marginTop: 4 }}>{value}</div>
          <div style={{ fontSize: 11, color: colors.textSub, marginTop: 4 }}>{sub}</div>
        </div>
      </div>
    </Card>
  );
}

export function SectionTitle({ children, action, actionLabel, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colors.text }}>{children}</h2>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', color: colors.primary,
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {actionLabel || 'Ver todos →'}
        </button>
      )}
    </div>
  );
}
