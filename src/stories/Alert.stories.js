import React, { useState } from 'react';

// Alert component for system messages and notifications
const Alert = ({
  variant = 'info',
  size = 'medium',
  title = '',
  children,
  icon = null,
  closable = false,
  onClose,
  border = true,
  filled = false,
  className = '',
  style = {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getVariantStyles = () => {
    const baseVariants = {
      info: {
        color: '#1e40af',
        backgroundColor: filled ? '#dbeafe' : '#eff6ff',
        borderColor: '#3b82f6',
        iconColor: '#3b82f6'
      },
      success: {
        color: '#166534',
        backgroundColor: filled ? '#dcfce7' : '#f0fdf4',
        borderColor: '#22c55e',
        iconColor: '#22c55e'
      },
      warning: {
        color: '#92400e',
        backgroundColor: filled ? '#fef3c7' : '#fffbeb',
        borderColor: '#f59e0b',
        iconColor: '#f59e0b'
      },
      error: {
        color: '#dc2626',
        backgroundColor: filled ? '#fecaca' : '#fef2f2',
        borderColor: '#ef4444',
        iconColor: '#ef4444'
      },
      neutral: {
        color: '#374151',
        backgroundColor: filled ? '#e5e7eb' : '#f9fafb',
        borderColor: '#6b7280',
        iconColor: '#6b7280'
      }
    };
    return baseVariants[variant] || baseVariants.info;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        fontSize: '12px',
        padding: '8px 12px',
        borderRadius: '6px',
        iconSize: '14px'
      },
      medium: {
        fontSize: '14px',
        padding: '12px 16px',
        borderRadius: '8px',
        iconSize: '16px'
      },
      large: {
        fontSize: '16px',
        padding: '16px 20px',
        borderRadius: '10px',
        iconSize: '18px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getDefaultIcon = () => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      neutral: '💬'
    };
    return icons[variant] || icons.info;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const displayIcon = icon || getDefaultIcon();

  const alertStyle = {
    ...variantStyles,
    ...sizeStyles,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: border ? `1px solid ${variantStyles.borderColor}` : 'none',
    borderLeft: border ? `4px solid ${variantStyles.borderColor}` : 'none',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    position: 'relative',
    lineHeight: '1.5',
    ...style
  };

  const iconStyle = {
    fontSize: sizeStyles.iconSize,
    color: variantStyles.iconColor,
    flexShrink: 0,
    marginTop: '1px'
  };

  const contentStyle = {
    flex: 1,
    color: variantStyles.color
  };

  const titleStyle = {
    fontWeight: '600',
    marginBottom: title && children ? '4px' : '0',
    fontSize: size === 'small' ? '13px' : size === 'large' ? '17px' : '15px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: variantStyles.color,
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    marginLeft: '8px',
    opacity: 0.7,
    transition: 'opacity 0.2s ease',
    flexShrink: 0,
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px'
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div
      role="alert"
      style={alertStyle}
      className={className}
      {...props}
    >
      <span style={iconStyle}>{displayIcon}</span>
      <div style={contentStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        {children && <div>{children}</div>}
      </div>
      {closable && (
        <button
          style={closeButtonStyle}
          onClick={handleClose}
          onMouseEnter={(e) => {
            e.target.style.opacity = '1';
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '0.7';
            e.target.style.backgroundColor = 'transparent';
          }}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

// Banner component for page-level notifications
const Banner = ({
  variant = 'info',
  children,
  icon = null,
  closable = false,
  onClose,
  actions = null,
  sticky = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getVariantStyles = () => {
    const variants = {
      info: {
        backgroundColor: '#1e40af',
        color: '#ffffff',
        borderColor: '#1d4ed8'
      },
      success: {
        backgroundColor: '#166534',
        color: '#ffffff',
        borderColor: '#15803d'
      },
      warning: {
        backgroundColor: '#d97706',
        color: '#ffffff',
        borderColor: '#ea580c'
      },
      error: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        borderColor: '#ef4444'
      }
    };
    return variants[variant] || variants.info;
  };

  const variantStyles = getVariantStyles();

  const bannerStyle = {
    ...variantStyles,
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? '0' : 'auto',
    zIndex: sticky ? 1000 : 'auto',
    width: '100%'
  };

  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1
  };

  const actionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px',
    opacity: 0.8,
    transition: 'opacity 0.2s ease',
    borderRadius: '2px'
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div role="banner" style={bannerStyle} {...props}>
      <div style={contentStyle}>
        {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
        <div>{children}</div>
      </div>
      {(actions || closable) && (
        <div style={actionsStyle}>
          {actions}
          {closable && (
            <button
              style={closeButtonStyle}
              onClick={handleClose}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.8';
                e.target.style.backgroundColor = 'transparent';
              }}
              aria-label="Close banner"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// Toast notification component
const Toast = ({
  variant = 'info',
  title = '',
  children,
  duration = 5000,
  onClose,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <Alert
      variant={variant}
      title={title}
      closable
      onClose={() => {
        setIsVisible(false);
        onClose?.();
      }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        minWidth: '300px',
        maxWidth: '400px',
        zIndex: 1000,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        animation: 'slideInRight 0.3s ease-out'
      }}
      {...props}
    >
      {children}
    </Alert>
  );
};

// Button component for examples
const Button = ({ variant = 'primary', size = 'small', children, ...props }) => {
  const getButtonStyle = () => {
    const variants = {
      primary: { backgroundColor: '#007bff', color: '#ffffff', border: '1px solid #007bff' },
      secondary: { backgroundColor: '#6c757d', color: '#ffffff', border: '1px solid #6c757d' },
      outline: { backgroundColor: 'transparent', color: '#007bff', border: '1px solid #007bff' },
      white: { backgroundColor: '#ffffff', color: '#374151', border: '1px solid #d1d5db' }
    };
    
    const sizes = {
      small: { padding: '4px 8px', fontSize: '12px' },
      medium: { padding: '6px 12px', fontSize: '14px' }
    };
    
    return {
      ...variants[variant],
      ...sizes[size],
      borderRadius: '4px',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    };
  };

  return <button style={getButtonStyle()} {...props}>{children}</button>;
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default {
  title: 'Core UI Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert components for displaying important messages, notifications, and system feedback. Includes Alert, Banner, and Toast variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    closable: { control: 'boolean' },
    border: { control: 'boolean' },
    filled: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    variant: 'info',
    children: 'This is an informational alert message.',
  },
};

export const WithTitle = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="info" title="Information" closable>
      This is an informational message with additional context.
    </Alert>
    <Alert variant="success" title="Success" closable>
      Operation completed successfully.
    </Alert>
    <Alert variant="warning" title="Warning" closable>
      Please review your settings before proceeding.
    </Alert>
    <Alert variant="error" title="Error" closable>
      Something went wrong. Please try again.
    </Alert>
    <Alert variant="neutral" title="Notice" closable>
      This is a neutral notification message.
    </Alert>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="info" size="small" title="Small Alert">
      Compact alert for tight spaces.
    </Alert>
    <Alert variant="info" size="medium" title="Medium Alert">
      Standard alert size for most use cases.
    </Alert>
    <Alert variant="info" size="large" title="Large Alert">
      Prominent alert for important messages.
    </Alert>
  </div>
);

export const Filled = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="info" filled title="Filled Info">
      Enhanced visibility with filled background.
    </Alert>
    <Alert variant="success" filled title="Filled Success">
      Success message with filled styling.
    </Alert>
    <Alert variant="warning" filled title="Filled Warning">
      Warning with enhanced background color.
    </Alert>
    <Alert variant="error" filled title="Filled Error">
      Error message with filled background.
    </Alert>
  </div>
);

export const CustomIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="info" icon="🔔" title="Notification">
      You have 3 new messages waiting.
    </Alert>
    <Alert variant="success" icon="🎉" title="Congratulations">
      You've completed all tasks!
    </Alert>
    <Alert variant="warning" icon="🔋" title="Low Battery">
      Your device battery is running low.
    </Alert>
    <Alert variant="error" icon="🚫" title="Access Denied">
      You don't have permission to perform this action.
    </Alert>
  </div>
);

export const WithoutBorder = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="info" border={false} title="Borderless Alert">
      Clean design without borders.
    </Alert>
    <Alert variant="success" border={false} filled title="Filled Without Border">
      Filled alert without border styling.
    </Alert>
  </div>
);

export const BannerExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Banner variant="info" icon="📢" closable>
      New features are now available! Check out our latest updates.
    </Banner>
    <Banner 
      variant="warning" 
      icon="⚠️" 
      closable
      actions={<Button variant="white" size="small">Learn More</Button>}
    >
      Scheduled maintenance will begin at 2:00 AM UTC.
    </Banner>
    <Banner variant="error" icon="🚨" closable>
      Service temporarily unavailable. We're working to resolve this issue.
    </Banner>
  </div>
);

export const ToastExample = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (variant, title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, variant, title, message }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <Button onClick={() => showToast('info', 'Info', 'This is an info toast')}>
          Show Info Toast
        </Button>
        <Button onClick={() => showToast('success', 'Success', 'Operation completed successfully')}>
          Show Success Toast
        </Button>
        <Button onClick={() => showToast('warning', 'Warning', 'Please review your input')}>
          Show Warning Toast
        </Button>
        <Button onClick={() => showToast('error', 'Error', 'Something went wrong')}>
          Show Error Toast
        </Button>
      </div>
      
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          duration={5000}
          onClose={() => removeToast(toast.id)}
          style={{
            position: 'fixed',
            top: `${20 + (toasts.indexOf(toast) * 80)}px`,
            right: '20px'
          }}
        >
          {toast.message}
        </Toast>
      ))}
    </div>
  );
};

export const AlertWithActions = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Alert variant="warning" title="Confirm Action">
      <div>
        <p style={{ margin: '0 0 12px 0' }}>
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="small">Cancel</Button>
          <Button variant="secondary" size="small">Delete</Button>
        </div>
      </div>
    </Alert>
    
    <Alert variant="info" title="Update Available">
      <div>
        <p style={{ margin: '0 0 12px 0' }}>
          A new version is available with bug fixes and improvements.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="small">Later</Button>
          <Button variant="primary" size="small">Update Now</Button>
        </div>
      </div>
    </Alert>
  </div>
);

// Export additional components
export { Banner, Toast };