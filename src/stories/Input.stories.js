import React, { useState } from 'react';

// Input component with various types and states
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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

// Controlled input wrapper for stories
const ControlledInput = (args) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default {
  title: 'Core UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible input component with various types, sizes, states, and validation styles. Supports icons, labels, and helper text.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    success: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export const Default = {
  render: ControlledInput,
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel = {
  render: ControlledInput,
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    helperText: 'We will never share your email',
  },
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ControlledInput size="small" placeholder="Small input" />
    <ControlledInput size="medium" placeholder="Medium input" />
    <ControlledInput size="large" placeholder="Large input" />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ControlledInput placeholder="Default state" />
    <ControlledInput error errorMessage="This field is required" placeholder="Error state" />
    <ControlledInput success successMessage="Looks good!" placeholder="Success state" />
    <ControlledInput disabled placeholder="Disabled state" />
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ControlledInput 
      leftIcon={<span>🔍</span>}
      placeholder="Search..."
      type="search"
    />
    <ControlledInput 
      leftIcon={<span>📧</span>}
      rightIcon={<span>✓</span>}
      placeholder="Email with icons"
      type="email"
    />
    <ControlledInput 
      rightIcon={<span>👁️</span>}
      placeholder="Password"
      type="password"
    />
  </div>
);

export const InputTypes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ControlledInput type="text" label="Text" placeholder="Enter text" />
    <ControlledInput type="email" label="Email" placeholder="Enter email" />
    <ControlledInput type="password" label="Password" placeholder="Enter password" />
    <ControlledInput type="number" label="Number" placeholder="Enter number" />
    <ControlledInput type="tel" label="Phone" placeholder="Enter phone" />
    <ControlledInput type="url" label="URL" placeholder="Enter URL" />
    <ControlledInput type="search" label="Search" placeholder="Search..." />
  </div>
);

export const FormExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Registration Form
      </h3>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          placeholder="John"
          required
          error={!!errors.firstName}
          errorMessage={errors.firstName}
          fullWidth
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          placeholder="Doe"
          required
          error={!!errors.lastName}
          errorMessage={errors.lastName}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="john@example.com"
          leftIcon={<span>📧</span>}
          required
          error={!!errors.email}
          errorMessage={errors.email}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter password"
          required
          error={!!errors.password}
          errorMessage={errors.password}
          helperText="Must be at least 8 characters"
          fullWidth
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Input
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          placeholder="Confirm password"
          required
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          fullWidth
        />
      </div>
    </div>
  );
};