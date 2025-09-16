import React from 'react';

const Card = ({
  variant = 'default',
  size = 'medium',
  shadow = 'medium',
  border = true,
  hoverable = false,
  padding = 'medium',
  header = null,
  footer = null,
  children,
  className = '',
  style = {},
  onClick,
  ...props
}) => {
  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: '#ffffff',
        color: '#111827',
        borderColor: '#e5e7eb'
      },
      outlined: {
        backgroundColor: '#ffffff',
        color: '#111827',
        borderColor: '#d1d5db',
        borderWidth: '1px'
      },
      elevated: {
        backgroundColor: '#ffffff',
        color: '#111827',
        borderColor: 'transparent'
      },
      filled: {
        backgroundColor: '#f9fafb',
        color: '#111827',
        borderColor: '#e5e7eb'
      }
    };
    return variants[variant] || variants.default;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        borderRadius: '6px',
        fontSize: '14px'
      },
      medium: {
        borderRadius: '8px',
        fontSize: '14px'
      },
      large: {
        borderRadius: '12px',
        fontSize: '16px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getPaddingStyles = () => {
    const paddings = {
      none: { padding: '0' },
      small: { padding: '12px' },
      medium: { padding: '16px' },
      large: { padding: '24px' }
    };
    return paddings[padding] || paddings.medium;
  };

  const getShadowStyles = () => {
    const shadows = {
      none: { boxShadow: 'none' },
      small: { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
      medium: { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
      large: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }
    };
    return shadows[shadow] || shadows.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const paddingStyles = getPaddingStyles();
  const shadowStyles = getShadowStyles();

  const cardStyle = {
    ...variantStyles,
    ...sizeStyles,
    ...shadowStyles,
    border: border ? `1px solid ${variantStyles.borderColor}` : 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    transition: 'all 0.2s ease-in-out',
    cursor: onClick ? 'pointer' : 'default',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    ...style
  };

  const headerStyle = {
    padding: paddingStyles.padding,
    borderBottom: header ? `1px solid ${variantStyles.borderColor}` : 'none',
    backgroundColor: variant === 'filled' ? '#f3f4f6' : 'transparent',
    fontWeight: '600',
    fontSize: '16px',
    color: variantStyles.color
  };

  const bodyStyle = {
    ...paddingStyles,
    flex: 1,
    color: variantStyles.color
  };

  const footerStyle = {
    padding: paddingStyles.padding,
    borderTop: footer ? `1px solid ${variantStyles.borderColor}` : 'none',
    backgroundColor: variant === 'filled' ? '#f3f4f6' : 'transparent',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable && onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable && onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = shadowStyles.boxShadow;
        }
      }}
      {...props}
    >
      {header && (
        <div style={headerStyle}>
          {header}
        </div>
      )}
      <div style={bodyStyle}>
        {children}
      </div>
      {footer && (
        <div style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;