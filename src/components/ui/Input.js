import React, { useState } from 'react';

const Input = ({
  type = 'text',
  size = 'medium',
  variant = 'default',
  disabled = false,
  error = false,
  success = false,
  placeholder = '',
  label = '',
  helperText = '',
  errorMessage = '',
  successMessage = '',
  required = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '6px 12px',
        fontSize: '12px',
        lineHeight: '1.4',
        borderRadius: '4px'
      },
      medium: {
        padding: '10px 14px',
        fontSize: '14px',
        lineHeight: '1.4',
        borderRadius: '6px'
      },
      large: {
        padding: '12px 16px',
        fontSize: '16px',
        lineHeight: '1.4',
        borderRadius: '8px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const baseStyle = {
      border: '1px solid #d1d5db',
      backgroundColor: '#ffffff',
      color: '#111827',
      transition: 'all 0.2s ease-in-out',
      outline: 'none',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        cursor: 'not-allowed',
        borderColor: '#d1d5db'
      };
    }

    if (error) {
      return {
        ...baseStyle,
        borderColor: '#ef4444',
        backgroundColor: focused ? '#ffffff' : '#fef2f2',
        boxShadow: focused ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
      };
    }

    if (success) {
      return {
        ...baseStyle,
        borderColor: '#10b981',
        backgroundColor: focused ? '#ffffff' : '#f0fdf4',
        boxShadow: focused ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
      };
    }

    return {
      ...baseStyle,
      borderColor: focused ? '#3b82f6' : '#d1d5db',
      backgroundColor: focused ? '#ffffff' : '#ffffff',
      boxShadow: focused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none'
    };
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const inputStyle = {
    ...variantStyles,
    ...sizeStyles,
    width: fullWidth ? '100%' : 'auto',
    paddingLeft: leftIcon ? `${parseInt(sizeStyles.padding.split(' ')[1]) + 24}px` : sizeStyles.padding.split(' ')[1],
    paddingRight: rightIcon ? `${parseInt(sizeStyles.padding.split(' ')[1]) + 24}px` : sizeStyles.padding.split(' ')[1],
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    width: fullWidth ? '100%' : 'auto'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: error ? '#ef4444' : success ? '#10b981' : '#374151',
    marginBottom: '6px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const helperTextStyle = {
    fontSize: '12px',
    marginTop: '4px',
    color: error ? '#ef4444' : success ? '#10b981' : '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '16px',
    pointerEvents: 'none'
  };

  const leftIconStyle = {
    ...iconStyle,
    left: '12px'
  };

  const rightIconStyle = {
    ...iconStyle,
    right: '12px'
  };

  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {leftIcon && <span style={leftIconStyle}>{leftIcon}</span>}
        <input
          type={type}
          style={inputStyle}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <span style={rightIconStyle}>{rightIcon}</span>}
      </div>
      {(helperText || errorMessage || successMessage) && (
        <div style={helperTextStyle}>
          {error && errorMessage ? errorMessage : success && successMessage ? successMessage : helperText}
        </div>
      )}
    </div>
  );
};

export default Input;