import React from 'react';

// Badge component for status indicators and labels
const Badge = ({
  variant = 'default',
  size = 'medium',
  shape = 'rounded',
  children,
  icon = null,
  dot = false,
  outline = false,
  removable = false,
  onRemove,
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    const baseVariants = {
      default: {
        backgroundColor: outline ? 'transparent' : '#f3f4f6',
        color: '#374151',
        borderColor: '#d1d5db'
      },
      primary: {
        backgroundColor: outline ? 'transparent' : '#dbeafe',
        color: '#1e40af',
        borderColor: '#3b82f6'
      },
      success: {
        backgroundColor: outline ? 'transparent' : '#dcfce7',
        color: '#166534',
        borderColor: '#22c55e'
      },
      warning: {
        backgroundColor: outline ? 'transparent' : '#fef3c7',
        color: '#92400e',
        borderColor: '#f59e0b'
      },
      error: {
        backgroundColor: outline ? 'transparent' : '#fecaca',
        color: '#dc2626',
        borderColor: '#ef4444'
      },
      info: {
        backgroundColor: outline ? 'transparent' : '#e0f2fe',
        color: '#0369a1',
        borderColor: '#0284c7'
      },
      purple: {
        backgroundColor: outline ? 'transparent' : '#f3e8ff',
        color: '#7c3aed',
        borderColor: '#8b5cf6'
      },
      pink: {
        backgroundColor: outline ? 'transparent' : '#fce7f3',
        color: '#be185d',
        borderColor: '#ec4899'
      },
      indigo: {
        backgroundColor: outline ? 'transparent' : '#e0e7ff',
        color: '#4338ca',
        borderColor: '#6366f1'
      }
    };
    return baseVariants[variant] || baseVariants.default;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        fontSize: '11px',
        padding: dot ? '2px' : '2px 6px',
        height: dot ? '6px' : 'auto',
        width: dot ? '6px' : 'auto',
        minWidth: dot ? '6px' : 'auto'
      },
      medium: {
        fontSize: '12px',
        padding: dot ? '3px' : '4px 8px',
        height: dot ? '8px' : 'auto',
        width: dot ? '8px' : 'auto',
        minWidth: dot ? '8px' : 'auto'
      },
      large: {
        fontSize: '14px',
        padding: dot ? '4px' : '6px 12px',
        height: dot ? '10px' : 'auto',
        width: dot ? '10px' : 'auto',
        minWidth: dot ? '10px' : 'auto'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getShapeStyles = () => {
    const shapes = {
      rounded: { borderRadius: dot ? '50%' : '6px' },
      pill: { borderRadius: dot ? '50%' : '999px' },
      square: { borderRadius: dot ? '50%' : '2px' }
    };
    return shapes[shape] || shapes.rounded;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();

  const badgeStyle = {
    ...variantStyles,
    ...sizeStyles,
    ...shapeStyles,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '500',
    lineHeight: '1',
    border: outline ? `1px solid ${variantStyles.borderColor}` : 'none',
    transition: 'all 0.2s ease-in-out',
    userSelect: 'none',
    ...style
  };

  const iconStyle = {
    fontSize: 'inherit',
    lineHeight: '1'
  };

  const removeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    cursor: 'pointer',
    padding: '0',
    marginLeft: '4px',
    fontSize: '14px',
    lineHeight: '1',
    opacity: 0.7,
    transition: 'opacity 0.2s ease'
  };

  return (
    <span
      style={badgeStyle}
      className={className}
      {...props}
    >
      {icon && <span style={iconStyle}>{icon}</span>}
      {!dot && children}
      {removable && !dot && (
        <button
          style={removeButtonStyle}
          onClick={onRemove}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7';
          }}
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
};

// Notification Badge - positioned relative to parent
const NotificationBadge = ({
  count = 0,
  max = 99,
  showZero = false,
  dot = false,
  variant = 'error',
  size = 'medium',
  position = 'top-right',
  offset = { top: 0, right: 0 },
  children,
  ...props
}) => {
  const shouldShow = showZero || count > 0;
  const displayCount = count > max ? `${max}+` : count;

  if (!shouldShow) {
    return <div style={{ position: 'relative', display: 'inline-block' }}>{children}</div>;
  }

  const getPositionStyles = () => {
    const positions = {
      'top-right': {
        top: `-${8 + offset.top}px`,
        right: `-${8 + offset.right}px`
      },
      'top-left': {
        top: `-${8 + offset.top}px`,
        left: `-${8 + offset.right}px`
      },
      'bottom-right': {
        bottom: `-${8 + offset.top}px`,
        right: `-${8 + offset.right}px`
      },
      'bottom-left': {
        bottom: `-${8 + offset.top}px`,
        left: `-${8 + offset.right}px`
      }
    };
    return positions[position] || positions['top-right'];
  };

  const badgeStyle = {
    position: 'absolute',
    transform: 'translate(50%, -50%)',
    zIndex: 1,
    ...getPositionStyles()
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div style={badgeStyle}>
        <Badge
          variant={variant}
          size={size}
          shape="pill"
          dot={dot || count === 0}
          {...props}
        >
          {!dot && displayCount}
        </Badge>
      </div>
    </div>
  );
};

// Status Badge with predefined statuses
const StatusBadge = ({
  status = 'default',
  size = 'medium',
  showDot = true,
  ...props
}) => {
  const statusConfig = {
    online: { variant: 'success', icon: showDot ? '●' : '🟢', text: 'Online' },
    offline: { variant: 'default', icon: showDot ? '●' : '⚫', text: 'Offline' },
    away: { variant: 'warning', icon: showDot ? '●' : '🟡', text: 'Away' },
    busy: { variant: 'error', icon: showDot ? '●' : '🔴', text: 'Busy' },
    pending: { variant: 'warning', icon: showDot ? '●' : '🟡', text: 'Pending' },
    approved: { variant: 'success', icon: showDot ? '●' : '✅', text: 'Approved' },
    rejected: { variant: 'error', icon: showDot ? '●' : '❌', text: 'Rejected' },
    draft: { variant: 'default', icon: showDot ? '●' : '📝', text: 'Draft' },
    published: { variant: 'success', icon: showDot ? '●' : '🌐', text: 'Published' }
  };

  const config = statusConfig[status] || statusConfig.default;

  return (
    <Badge
      variant={config.variant}
      size={size}
      icon={config.icon}
      {...props}
    >
      {config.text}
    </Badge>
  );
};

// Sample components for examples
const Button = ({ children, ...props }) => (
  <button
    style={{
      backgroundColor: '#007bff',
      color: '#ffffff',
      border: '1px solid #007bff',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      fontWeight: '500'
    }}
    {...props}
  >
    {children}
  </button>
);

const Avatar = ({ name, size = 'medium' }) => {
  const sizes = { small: '32px', medium: '40px', large: '48px' };
  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600'
      }}
    >
      {name?.charAt(0) || '?'}
    </div>
  );
};

export default {
  title: 'Core UI Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge components for displaying status indicators, labels, and notifications. Includes standard badges, notification badges, and status badges.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'purple', 'pink', 'indigo'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'pill', 'square'],
    },
    outline: { control: 'boolean' },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    children: 'Badge',
  },
};

export const Variants = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="purple">Purple</Badge>
    <Badge variant="pink">Pink</Badge>
    <Badge variant="indigo">Indigo</Badge>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Badge size="small" variant="primary">Small</Badge>
    <Badge size="medium" variant="primary">Medium</Badge>
    <Badge size="large" variant="primary">Large</Badge>
  </div>
);

export const Shapes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <Badge shape="rounded" variant="success">Rounded</Badge>
    <Badge shape="pill" variant="success">Pill</Badge>
    <Badge shape="square" variant="success">Square</Badge>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    <Badge variant="success" icon="✓">Completed</Badge>
    <Badge variant="warning" icon="⚠">Warning</Badge>
    <Badge variant="error" icon="✗">Failed</Badge>
    <Badge variant="info" icon="ℹ">Info</Badge>
    <Badge variant="primary" icon="🔔">Notification</Badge>
    <Badge variant="purple" icon="⭐">Featured</Badge>
  </div>
);

export const Outlined = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    <Badge variant="primary" outline>Primary</Badge>
    <Badge variant="success" outline>Success</Badge>
    <Badge variant="warning" outline>Warning</Badge>
    <Badge variant="error" outline>Error</Badge>
    <Badge variant="info" outline>Info</Badge>
  </div>
);

export const DotBadges = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Badge variant="success" dot size="small" />
    <Badge variant="warning" dot size="medium" />
    <Badge variant="error" dot size="large" />
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Badge variant="success" dot />
      <span style={{ fontSize: '14px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Online
      </span>
    </div>
  </div>
);

export const RemovableBadges = () => {
  const [badges, setBadges] = React.useState([
    { id: 1, text: 'React', variant: 'primary' },
    { id: 2, text: 'JavaScript', variant: 'warning' },
    { id: 3, text: 'CSS', variant: 'info' },
    { id: 4, text: 'HTML', variant: 'success' }
  ]);

  const removeBadge = (id) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {badges.map(badge => (
        <Badge
          key={badge.id}
          variant={badge.variant}
          removable
          onRemove={() => removeBadge(badge.id)}
        >
          {badge.text}
        </Badge>
      ))}
      {badges.length === 0 && (
        <span style={{ 
          color: '#6b7280', 
          fontStyle: 'italic',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
        }}>
          All badges removed
        </span>
      )}
    </div>
  );
};

export const NotificationBadges = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
    <NotificationBadge count={3}>
      <Button>Messages</Button>
    </NotificationBadge>
    
    <NotificationBadge count={25}>
      <Avatar name="JD" />
    </NotificationBadge>
    
    <NotificationBadge count={0} showZero>
      <Button>Notifications</Button>
    </NotificationBadge>
    
    <NotificationBadge count={100} max={99}>
      <Button>Comments</Button>
    </NotificationBadge>
    
    <NotificationBadge count={5} dot>
      <Avatar name="AS" />
    </NotificationBadge>
  </div>
);

export const StatusBadges = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    <StatusBadge status="online" />
    <StatusBadge status="offline" />
    <StatusBadge status="away" />
    <StatusBadge status="busy" />
    <StatusBadge status="pending" />
    <StatusBadge status="approved" />
    <StatusBadge status="rejected" />
    <StatusBadge status="draft" />
    <StatusBadge status="published" />
  </div>
);

export const StatusBadgesWithoutDots = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
    <StatusBadge status="online" showDot={false} />
    <StatusBadge status="pending" showDot={false} />
    <StatusBadge status="approved" showDot={false} />
    <StatusBadge status="rejected" showDot={false} />
    <StatusBadge status="published" showDot={false} />
  </div>
);

export const UserList = () => {
  const users = [
    { id: 1, name: 'Alice Johnson', status: 'online', unread: 3 },
    { id: 2, name: 'Bob Smith', status: 'away', unread: 0 },
    { id: 3, name: 'Carol Davis', status: 'busy', unread: 7 },
    { id: 4, name: 'David Wilson', status: 'offline', unread: 0 }
  ];

  return (
    <div style={{ width: '280px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Team Members</h4>
      {users.map(user => (
        <div key={user.id} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '12px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <NotificationBadge count={user.unread} size="small">
              <Avatar name={user.name} />
            </NotificationBadge>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{user.name}</span>
          </div>
          <StatusBadge status={user.status} size="small" />
        </div>
      ))}
    </div>
  );
};

export const ProductCard = () => (
  <div style={{ 
    width: '250px', 
    border: '1px solid #e5e7eb', 
    borderRadius: '8px', 
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }}>
    <div style={{ 
      height: '150px', 
      backgroundColor: '#f3f4f6',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280'
    }}>
      📱
      <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
        <Badge variant="error" size="small">Sale</Badge>
      </div>
      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
        <Badge variant="success" size="small" icon="⭐">Featured</Badge>
      </div>
    </div>
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>iPhone 15 Pro</h3>
      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>Latest smartphone with advanced features</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>$999</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Badge variant="primary" size="small">iOS</Badge>
          <Badge variant="info" size="small">5G</Badge>
        </div>
      </div>
    </div>
  </div>
);

// Export additional components
export { NotificationBadge, StatusBadge };