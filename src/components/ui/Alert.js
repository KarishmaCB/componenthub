import React, { useState } from 'react';

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
      error: '❌'
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

export default Alert;