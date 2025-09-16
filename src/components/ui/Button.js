import React from 'react';

const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  children, 
  onClick,
  fullWidth = false,
  icon = null,
  ...props 
}) => {
  const getVariantStyles = () => {
    const variants = {
      primary: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: '1px solid #007bff',
        '&:hover': {
          backgroundColor: '#0056b3',
          borderColor: '#0056b3',
        }
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: '#ffffff',
        border: '1px solid #6c757d',
        '&:hover': {
          backgroundColor: '#545b62',
          borderColor: '#545b62',
        }
      },
      success: {
        backgroundColor: '#28a745',
        color: '#ffffff',
        border: '1px solid #28a745',
        '&:hover': {
          backgroundColor: '#1e7e34',
          borderColor: '#1e7e34',
        }
      },
      danger: {
        backgroundColor: '#dc3545',
        color: '#ffffff',
        border: '1px solid #dc3545',
        '&:hover': {
          backgroundColor: '#c82333',
          borderColor: '#c82333',
        }
      },
      warning: {
        backgroundColor: '#ffc107',
        color: '#212529',
        border: '1px solid #ffc107',
        '&:hover': {
          backgroundColor: '#e0a800',
          borderColor: '#e0a800',
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#007bff',
        border: '1px solid #007bff',
        '&:hover': {
          backgroundColor: '#007bff',
          color: '#ffffff',
        }
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#007bff',
        border: 'none',
        '&:hover': {
          backgroundColor: '#f8f9fa',
        }
      },
      link: {
        backgroundColor: 'transparent',
        color: '#007bff',
        border: 'none',
        textDecoration: 'underline',
        '&:hover': {
          color: '#0056b3',
        }
      },
      social: {
        backgroundColor: '#ffffff',
        color: '#374151',
        border: '1px solid #d1d5db',
        '&:hover': {
          backgroundColor: '#f9fafb',
        }
      }
    };
    return variants[variant] || variants.primary;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '6px 12px',
        fontSize: '12px',
        lineHeight: '1.5',
        borderRadius: '4px'
      },
      medium: {
        padding: '8px 16px',
        fontSize: '14px',
        lineHeight: '1.5',
        borderRadius: '6px'
      },
      large: {
        padding: '12px 24px',
        fontSize: '16px',
        lineHeight: '1.5',
        borderRadius: '8px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle = {
    ...variantStyles,
    ...sizeStyles,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '500',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textAlign: 'center',
    textDecoration: variant === 'link' ? 'underline' : 'none',
    userSelect: 'none',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            e.target.style.backgroundColor = '#0056b3';
          } else if (variant === 'social') {
            e.target.style.backgroundColor = '#f9fafb';
          } else if (variant === 'outline') {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.color = '#ffffff';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          if (variant === 'primary') {
            e.target.style.backgroundColor = '#007bff';
          } else if (variant === 'social') {
            e.target.style.backgroundColor = '#ffffff';
          } else if (variant === 'outline') {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#007bff';
          }
        }
      }}
      {...props}
    >
      {loading && (
        <div style={{
          width: '14px',
          height: '14px',
          border: '2px solid transparent',
          borderTop: '2px solid currentColor',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;