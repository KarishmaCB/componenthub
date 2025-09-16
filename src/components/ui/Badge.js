import React from 'react';

const Badge = ({
  variant = 'default',
  size = 'medium',
  shape = 'rounded',
  children,
  icon = null,
  dot = false,
  outline = false,
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

  return (
    <span
      style={badgeStyle}
      className={className}
      {...props}
    >
      {icon && <span style={iconStyle}>{icon}</span>}
      {!dot && children}
    </span>
  );
};

export default Badge;