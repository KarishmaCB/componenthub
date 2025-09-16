import React, { useState } from 'react';

// Avatar component with image fallbacks and status indicators
const Avatar = ({
  src = null,
  alt = '',
  name = '',
  size = 'medium',
  shape = 'circle',
  variant = 'default',
  status = null,
  statusColor = null,
  showStatus = false,
  showBorder = false,
  borderColor = '#ffffff',
  fallbackIcon = null,
  onClick = null,
  className = '',
  style = {},
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  const getSizeStyles = () => {
    const sizes = {
      xs: { width: '20px', height: '20px', fontSize: '8px' },
      small: { width: '32px', height: '32px', fontSize: '12px' },
      medium: { width: '40px', height: '40px', fontSize: '14px' },
      large: { width: '48px', height: '48px', fontSize: '16px' },
      xl: { width: '64px', height: '64px', fontSize: '20px' },
      '2xl': { width: '80px', height: '80px', fontSize: '24px' },
      '3xl': { width: '96px', height: '96px', fontSize: '28px' }
    };
    return sizes[size] || sizes.medium;
  };

  const getShapeStyles = () => {
    const shapes = {
      circle: { borderRadius: '50%' },
      rounded: { borderRadius: '8px' },
      square: { borderRadius: '4px' }
    };
    return shapes[shape] || shapes.circle;
  };

  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: '#e5e7eb',
        color: '#6b7280'
      },
      primary: {
        backgroundColor: '#dbeafe',
        color: '#1e40af'
      },
      success: {
        backgroundColor: '#dcfce7',
        color: '#166534'
      },
      warning: {
        backgroundColor: '#fef3c7',
        color: '#92400e'
      },
      danger: {
        backgroundColor: '#fecaca',
        color: '#dc2626'
      },
      info: {
        backgroundColor: '#e0f2fe',
        color: '#0369a1'
      }
    };
    return variants[variant] || variants.default;
  };

  const getStatusColor = () => {
    if (statusColor) return statusColor;
    
    const statusColors = {
      online: '#10b981',
      offline: '#6b7280',
      away: '#f59e0b',
      busy: '#ef4444',
      dnd: '#ef4444'
    };
    return statusColors[status] || '#6b7280';
  };

  const generateInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();
  const variantStyles = getVariantStyles();

  const avatarStyle = {
    ...sizeStyles,
    ...shapeStyles,
    ...variantStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    position: 'relative',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out',
    border: showBorder ? `2px solid ${borderColor}` : 'none',
    userSelect: 'none',
    ...style
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: imageError || imageLoading ? 'none' : 'block'
  };

  const statusDotStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: `${Math.max(sizeStyles.width * 0.25, 8)}px`,
    height: `${Math.max(sizeStyles.width * 0.25, 8)}px`,
    backgroundColor: getStatusColor(),
    border: `2px solid ${borderColor}`,
    borderRadius: '50%',
    zIndex: 1
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || name}
          style={imageStyle}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      );
    }

    if (fallbackIcon) {
      return <span style={{ fontSize: sizeStyles.fontSize }}>{fallbackIcon}</span>;
    }

    if (name) {
      return <span style={{ fontSize: sizeStyles.fontSize }}>{generateInitials(name)}</span>;
    }

    return <span style={{ fontSize: sizeStyles.fontSize }}>👤</span>;
  };

  return (
    <div
      style={avatarStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
      {...props}
    >
      {renderContent()}
      {showStatus && status && <div style={statusDotStyle} />}
    </div>
  );
};

// Avatar Group component for showing multiple avatars
const AvatarGroup = ({
  max = 3,
  size = 'medium',
  spacing = -8,
  children,
  showTotal = true,
  className = '',
  style = {},
  ...props
}) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const hiddenCount = Math.max(0, avatars.length - max);

  const getSizeStyles = () => {
    const sizes = {
      xs: { width: '20px', height: '20px', fontSize: '8px' },
      small: { width: '32px', height: '32px', fontSize: '10px' },
      medium: { width: '40px', height: '40px', fontSize: '12px' },
      large: { width: '48px', height: '48px', fontSize: '14px' },
      xl: { width: '64px', height: '64px', fontSize: '16px' }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  const groupStyle = {
    display: 'flex',
    alignItems: 'center',
    ...style
  };

  const avatarContainerStyle = (index) => ({
    marginLeft: index > 0 ? `${spacing}px` : '0',
    zIndex: avatars.length - index,
    position: 'relative'
  });

  const moreCountStyle = {
    ...sizeStyles,
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#6b7280',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    marginLeft: `${spacing}px`,
    zIndex: 0,
    border: '2px solid #ffffff'
  };

  return (
    <div style={groupStyle} className={className} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} style={avatarContainerStyle(index)}>
          {React.cloneElement(avatar, { 
            size,
            showBorder: true,
            borderColor: '#ffffff'
          })}
        </div>
      ))}
      {showTotal && hiddenCount > 0 && (
        <div style={moreCountStyle}>
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Core UI Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component for displaying user profile images with fallbacks, status indicators, and grouping capabilities.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'small', 'medium', 'large', 'xl', '2xl', '3xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    status: {
      control: { type: 'select' },
      options: [null, 'online', 'offline', 'away', 'busy', 'dnd'],
    },
    showStatus: { control: 'boolean' },
    showBorder: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    name: 'John Smith',
    alt: 'John Smith avatar',
  },
};

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Avatar size="xs" name="XS" />
    <Avatar size="small" name="SM" />
    <Avatar size="medium" name="MD" />
    <Avatar size="large" name="LG" />
    <Avatar size="xl" name="XL" />
    <Avatar size="2xl" name="2XL" />
    <Avatar size="3xl" name="3XL" />
  </div>
);

export const Shapes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Avatar shape="circle" name="Circle" />
    <Avatar shape="rounded" name="Rounded" />
    <Avatar shape="square" name="Square" />
  </div>
);

export const Variants = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <Avatar variant="default" name="Default" />
    <Avatar variant="primary" name="Primary" />
    <Avatar variant="success" name="Success" />
    <Avatar variant="warning" name="Warning" />
    <Avatar variant="danger" name="Danger" />
    <Avatar variant="info" name="Info" />
  </div>
);

export const WithStatus = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <Avatar name="Online" showStatus status="online" />
    <Avatar name="Away" showStatus status="away" />
    <Avatar name="Busy" showStatus status="busy" />
    <Avatar name="Offline" showStatus status="offline" />
    <Avatar name="DND" showStatus status="dnd" />
  </div>
);

export const WithBorder = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <Avatar name="JD" showBorder />
    <Avatar name="AS" showBorder borderColor="#007bff" />
    <Avatar name="MJ" showBorder borderColor="#28a745" />
  </div>
);

export const FallbackStates = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
    <Avatar name="John Doe" />
    <Avatar name="A" />
    <Avatar name="" />
    <Avatar fallbackIcon="👨‍💼" />
    <Avatar fallbackIcon="🤖" />
    <Avatar src="invalid-url" name="Broken Image" />
  </div>
);

export const Interactive = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  const users = [
    { id: 1, name: 'Alice Johnson', status: 'online' },
    { id: 2, name: 'Bob Smith', status: 'away' },
    { id: 3, name: 'Carol Davis', status: 'busy' },
    { id: 4, name: 'David Wilson', status: 'offline' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        {users.map(user => (
          <Avatar
            key={user.id}
            name={user.name}
            showStatus
            status={user.status}
            showBorder={selectedAvatar === user.id}
            borderColor="#007bff"
            onClick={() => setSelectedAvatar(user.id)}
            style={{
              transform: selectedAvatar === user.id ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
          />
        ))}
      </div>
      {selectedAvatar && (
        <p style={{ 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#374151' 
        }}>
          Selected: {users.find(u => u.id === selectedAvatar)?.name}
        </p>
      )}
    </div>
  );
};

export const AvatarGroups = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4 style={{ 
        margin: '0 0 12px 0', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        Team Members (Default)
      </h4>
      <AvatarGroup>
        <Avatar name="Alice Johnson" variant="primary" />
        <Avatar name="Bob Smith" variant="success" />
        <Avatar name="Carol Davis" variant="warning" />
        <Avatar name="David Wilson" variant="danger" />
        <Avatar name="Eve Brown" variant="info" />
      </AvatarGroup>
    </div>

    <div>
      <h4 style={{ 
        margin: '0 0 12px 0', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        Small Group (Max 2)
      </h4>
      <AvatarGroup max={2} size="small">
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Mike Johnson" />
        <Avatar name="Sarah Wilson" />
      </AvatarGroup>
    </div>

    <div>
      <h4 style={{ 
        margin: '0 0 12px 0', 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        Large Group (Close spacing)
      </h4>
      <AvatarGroup max={4} spacing={-12} size="large">
        <Avatar name="User 1" variant="primary" />
        <Avatar name="User 2" variant="success" />
        <Avatar name="User 3" variant="warning" />
        <Avatar name="User 4" variant="danger" />
        <Avatar name="User 5" variant="info" />
        <Avatar name="User 6" variant="default" />
        <Avatar name="User 7" variant="primary" />
      </AvatarGroup>
    </div>
  </div>
);

export const UserProfile = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    maxWidth: '400px'
  }}>
    <Avatar 
      src="https://images.unsplash.com/photo-1494790108755-2616b612b1c1?w=100&h=100&fit=crop&crop=face"
      name="Sarah Johnson"
      size="xl"
      showStatus
      status="online"
      showBorder
      borderColor="#ffffff"
    />
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600', color: '#111827' }}>
        Sarah Johnson
      </h3>
      <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6b7280' }}>
        Senior Product Designer
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#10b981' 
        }} />
        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>
          Online
        </span>
      </div>
    </div>
  </div>
);

export const NotificationList = () => {
  const notifications = [
    { id: 1, user: 'Alice Johnson', action: 'liked your post', time: '2m ago', avatar: null },
    { id: 2, user: 'Bob Smith', action: 'commented on your photo', time: '5m ago', avatar: null },
    { id: 3, user: 'Carol Davis', action: 'started following you', time: '1h ago', avatar: null },
    { id: 4, user: 'System', action: 'Your backup is complete', time: '2h ago', avatar: '🔔' }
  ];

  return (
    <div style={{ 
      width: '350px', 
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        padding: '16px', 
        borderBottom: '1px solid #e5e7eb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        Notifications
      </div>
      {notifications.map(notification => (
        <div key={notification.id} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '12px 16px',
          borderBottom: '1px solid #f3f4f6',
          fontSize: '14px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <Avatar 
            name={notification.user}
            size="small"
            fallbackIcon={notification.avatar}
          />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#111827' }}>
              <strong>{notification.user}</strong> {notification.action}
            </div>
            <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '2px' }}>
              {notification.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Export AvatarGroup component
export { AvatarGroup };