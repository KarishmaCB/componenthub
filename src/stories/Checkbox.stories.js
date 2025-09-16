import React, { useState } from 'react';

// Checkbox component with various states and styles
const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  size = 'medium',
  label = '',
  helperText = '',
  error = false,
  errorMessage = '',
  required = false,
  onChange,
  name,
  value,
  ...props
}) => {
  const getSizeStyles = () => {
    const sizes = {
      small: {
        width: '14px',
        height: '14px',
        fontSize: '10px'
      },
      medium: {
        width: '18px',
        height: '18px',
        fontSize: '12px'
      },
      large: {
        width: '22px',
        height: '22px',
        fontSize: '14px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  const checkboxStyle = {
    width: sizeStyles.width,
    height: sizeStyles.height,
    border: `2px solid ${error ? '#ef4444' : disabled ? '#d1d5db' : checked ? '#3b82f6' : '#d1d5db'}`,
    borderRadius: '4px',
    backgroundColor: checked || indeterminate ? '#3b82f6' : disabled ? '#f3f4f6' : '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    flexShrink: 0
  };

  const checkmarkStyle = {
    color: '#ffffff',
    fontSize: sizeStyles.fontSize,
    fontWeight: 'bold',
    opacity: checked ? 1 : 0,
    transform: checked ? 'scale(1)' : 'scale(0.8)',
    transition: 'all 0.15s ease'
  };

  const indeterminateStyle = {
    width: '8px',
    height: '2px',
    backgroundColor: '#ffffff',
    opacity: indeterminate ? 1 : 0,
    transform: indeterminate ? 'scale(1)' : 'scale(0.8)',
    transition: 'all 0.15s ease'
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const labelStyle = {
    fontSize: '14px',
    color: error ? '#ef4444' : '#374151',
    fontWeight: '500',
    lineHeight: '1.4',
    userSelect: 'none'
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#ef4444' : '#6b7280',
    marginTop: '4px',
    lineHeight: '1.4'
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle} onClick={handleClick}>
        <div
          style={checkboxStyle}
          tabIndex={disabled ? -1 : 0}
          role="checkbox"
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={error}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {indeterminate ? (
            <div style={indeterminateStyle} />
          ) : (
            <span style={checkmarkStyle}>✓</span>
          )}
        </div>
        {label && (
          <label style={labelStyle}>
            {label}
            {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
          </label>
        )}
      </div>
      {(helperText || errorMessage) && (
        <div style={helperTextStyle}>
          {error && errorMessage ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

// Controlled Checkbox wrapper for stories
const ControlledCheckbox = (args) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={setChecked}
    />
  );
};

// Checkbox Group component
const CheckboxGroup = ({ children, label, helperText, error, errorMessage, required, ...props }) => {
  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const groupLabelStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: error ? '#ef4444' : '#374151',
    marginBottom: '8px'
  };

  const helperTextStyle = {
    fontSize: '12px',
    color: error ? '#ef4444' : '#6b7280',
    marginTop: '4px'
  };

  return (
    <div style={groupStyle} {...props}>
      {label && (
        <div style={groupLabelStyle}>
          {label}
          {required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
      {(helperText || errorMessage) && (
        <div style={helperTextStyle}>
          {error && errorMessage ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

export default {
  title: 'Core UI Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible checkbox component with support for indeterminate state, various sizes, labels, and error handling. Includes accessibility features and keyboard navigation.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export const Default = {
  render: ControlledCheckbox,
  args: {
    label: 'Default checkbox',
  },
};

export const WithLabel = {
  render: ControlledCheckbox,
  args: {
    label: 'I agree to the terms and conditions',
    helperText: 'Please read our terms before agreeing',
  },
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <ControlledCheckbox size="small" label="Small checkbox" />
    <ControlledCheckbox size="medium" label="Medium checkbox" />
    <ControlledCheckbox size="large" label="Large checkbox" />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <ControlledCheckbox label="Unchecked" checked={false} />
    <ControlledCheckbox label="Checked" checked={true} />
    <ControlledCheckbox label="Indeterminate" indeterminate={true} />
    <ControlledCheckbox label="Disabled unchecked" disabled={true} checked={false} />
    <ControlledCheckbox label="Disabled checked" disabled={true} checked={true} />
    <ControlledCheckbox label="Error state" error={true} errorMessage="This field is required" />
  </div>
);

export const Required = {
  render: ControlledCheckbox,
  args: {
    label: 'Required checkbox',
    required: true,
    helperText: 'This field is required',
  },
};

export const CheckboxGroupExample = () => {
  const [selectedItems, setSelectedItems] = useState({
    option1: false,
    option2: true,
    option3: false,
    option4: false
  });

  const handleChange = (key) => (checked) => {
    setSelectedItems(prev => ({ ...prev, [key]: checked }));
  };

  const allSelected = Object.values(selectedItems).every(Boolean);
  const someSelected = Object.values(selectedItems).some(Boolean);
  const indeterminate = someSelected && !allSelected;

  const handleSelectAll = (checked) => {
    const newState = Object.keys(selectedItems).reduce((acc, key) => {
      acc[key] = checked;
      return acc;
    }, {});
    setSelectedItems(newState);
  };

  return (
    <div style={{ width: '300px' }}>
      <CheckboxGroup 
        label="Select your preferences" 
        helperText="Choose all that apply"
      >
        <Checkbox
          label="Select all"
          checked={allSelected}
          indeterminate={indeterminate}
          onChange={handleSelectAll}
        />
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '8px' }}>
          <Checkbox
            label="Email notifications"
            checked={selectedItems.option1}
            onChange={handleChange('option1')}
          />
          <Checkbox
            label="SMS notifications"
            checked={selectedItems.option2}
            onChange={handleChange('option2')}
          />
          <Checkbox
            label="Push notifications"
            checked={selectedItems.option3}
            onChange={handleChange('option3')}
          />
          <Checkbox
            label="Marketing emails"
            checked={selectedItems.option4}
            onChange={handleChange('option4')}
          />
        </div>
      </CheckboxGroup>
    </div>
  );
};

export const FormExample = () => {
  const [formData, setFormData] = useState({
    newsletter: false,
    terms: false,
    marketing: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (checked) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.terms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Subscription Preferences
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={handleChange('newsletter')}
          helperText="Receive weekly updates about new features"
        />
        
        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.terms}
          onChange={handleChange('terms')}
          required={true}
          error={!!errors.terms}
          errorMessage={errors.terms}
        />
        
        <Checkbox
          label="Send me marketing emails"
          checked={formData.marketing}
          onChange={handleChange('marketing')}
          helperText="Occasional promotional content"
        />
      </div>
      
      <button
        type="submit"
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        Submit
      </button>
    </form>
  );
};

// Export components for external use
export { Checkbox, CheckboxGroup };