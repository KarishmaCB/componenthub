import React, { useState, useRef, useEffect } from 'react';

// Textarea component with auto-resize and validation features
const Textarea = ({
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
  autoResize = false,
  minRows = 3,
  maxRows = 10,
  maxLength = null,
  showCharCount = false,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [charCount, setCharCount] = useState(value?.length || 0);
  const textareaRef = useRef(null);

  // Auto-resize functionality
  useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current;
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyle.lineHeight);
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);
      
      // Reset height to auto to get the scroll height
      textarea.style.height = 'auto';
      
      // Calculate the height based on content
      const minHeight = lineHeight * minRows + paddingTop + paddingBottom;
      const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom;
      const scrollHeight = textarea.scrollHeight;
      
      // Set the height within min/max bounds
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, minRows, maxRows]);

  const getSizeStyles = () => {
    const sizes = {
      small: {
        padding: '6px 12px',
        fontSize: '12px',
        lineHeight: '1.4',
        borderRadius: '4px',
        minHeight: '60px'
      },
      medium: {
        padding: '10px 14px',
        fontSize: '14px',
        lineHeight: '1.4',
        borderRadius: '6px',
        minHeight: '80px'
      },
      large: {
        padding: '12px 16px',
        fontSize: '16px',
        lineHeight: '1.4',
        borderRadius: '8px',
        minHeight: '100px'
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
      resize: autoResize ? 'none' : 'vertical',
    };

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: '#f3f4f6',
        color: '#9ca3af',
        cursor: 'not-allowed',
        borderColor: '#d1d5db',
        resize: 'none'
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

  const textareaStyle = {
    ...variantStyles,
    ...sizeStyles,
    width: fullWidth ? '100%' : 'auto',
    height: autoResize ? 'auto' : sizeStyles.minHeight,
  };

  const containerStyle = {
    display: 'inline-block',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative'
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
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const charCountStyle = {
    fontSize: '12px',
    color: maxLength && charCount > maxLength ? '#ef4444' : '#6b7280',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange?.(e);
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
      <textarea
        ref={textareaRef}
        style={textareaStyle}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        rows={autoResize ? minRows : undefined}
        {...props}
      />
      {(helperText || errorMessage || successMessage || showCharCount) && (
        <div style={helperTextStyle}>
          <span>
            {error && errorMessage ? errorMessage : success && successMessage ? successMessage : helperText}
          </span>
          {showCharCount && (
            <span style={charCountStyle}>
              {charCount}{maxLength && `/${maxLength}`}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Controlled textarea wrapper for stories
const ControlledTextarea = (args) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default {
  title: 'Core UI Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible textarea component for multi-line text input with auto-resize, character counting, and validation states.',
      },
    },
  },
  argTypes: {
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
    autoResize: { control: 'boolean' },
    showCharCount: { control: 'boolean' },
    minRows: { control: { type: 'range', min: 1, max: 10 } },
    maxRows: { control: { type: 'range', min: 1, max: 20 } },
    maxLength: { control: { type: 'number', min: 0, max: 1000 } },
  },
};

export const Default = {
  render: ControlledTextarea,
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel = {
  render: ControlledTextarea,
  args: {
    label: 'Description',
    placeholder: 'Describe your project...',
    required: true,
    helperText: 'Provide a detailed description of your project',
  },
};

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
    <ControlledTextarea 
      size="small" 
      label="Small Textarea"
      placeholder="Small size for compact layouts" 
    />
    <ControlledTextarea 
      size="medium" 
      label="Medium Textarea"
      placeholder="Standard size for most use cases" 
    />
    <ControlledTextarea 
      size="large" 
      label="Large Textarea"
      placeholder="Large size for detailed content" 
    />
  </div>
);

export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
    <ControlledTextarea 
      label="Default State"
      placeholder="Normal textarea" 
    />
    <ControlledTextarea 
      label="Error State"
      placeholder="Textarea with error"
      error 
      errorMessage="This field is required" 
    />
    <ControlledTextarea 
      label="Success State"
      placeholder="Textarea with success"
      success 
      successMessage="Looks good!" 
    />
    <ControlledTextarea 
      label="Disabled State"
      placeholder="Disabled textarea"
      disabled 
      value="This textarea is disabled"
    />
  </div>
);

export const AutoResize = () => {
  const [value, setValue] = useState('This textarea will automatically resize as you type more content.\n\nTry adding more lines to see it grow!');
  
  return (
    <div style={{ width: '400px' }}>
      <Textarea
        label="Auto-Resize Textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoResize
        minRows={3}
        maxRows={8}
        placeholder="Start typing to see auto-resize in action..."
        helperText="Automatically adjusts height based on content"
      />
    </div>
  );
};

export const WithCharacterCount = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
    <ControlledTextarea
      label="Message (with character count)"
      placeholder="Type your message..."
      showCharCount
      helperText="Share your thoughts"
    />
    <ControlledTextarea
      label="Bio (limited to 150 characters)"
      placeholder="Tell us about yourself..."
      maxLength={150}
      showCharCount
      helperText="Keep it concise"
    />
  </div>
);

export const FormExample = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    feedback: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '500px', padding: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Project Submission
      </h3>
      
      <div style={{ marginBottom: '16px' }}>
        <Textarea
          label="Project Title"
          value={formData.title}
          onChange={handleChange('title')}
          placeholder="Enter project title..."
          required
          error={!!errors.title}
          errorMessage={errors.title}
          size="small"
          fullWidth
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Textarea
          label="Project Description"
          value={formData.description}
          onChange={handleChange('description')}
          placeholder="Describe your project in detail..."
          required
          error={!!errors.description}
          errorMessage={errors.description}
          helperText="Minimum 10 characters required"
          autoResize
          minRows={3}
          maxRows={6}
          fullWidth
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Textarea
          label="Additional Feedback"
          value={formData.feedback}
          onChange={handleChange('feedback')}
          placeholder="Any additional comments or feedback..."
          maxLength={500}
          showCharCount
          helperText="Optional feedback"
          fullWidth
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Textarea
          label="Internal Notes"
          value={formData.notes}
          onChange={handleChange('notes')}
          placeholder="Private notes (not visible to others)..."
          size="small"
          fullWidth
        />
      </div>
      
      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: '#ffffff',
          border: '1px solid #007bff',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Submit Project
      </button>
    </form>
  );
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
    { id: 2, text: 'I need help with my project setup.', sender: 'user' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: Date.now(), 
        text: newMessage, 
        sender: 'user' 
      }]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "I'd be happy to help you with your project setup. Can you provide more details?",
          sender: 'bot'
        }]);
      }, 1000);
    }
  };

  return (
    <div style={{ width: '400px', height: '500px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ 
        height: '60px', 
        backgroundColor: '#f9fafb', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontWeight: '600',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        Chat Support
      </div>
      
      <div style={{ 
        height: 'calc(100% - 140px)', 
        overflowY: 'auto', 
        padding: '16px',
        backgroundColor: '#ffffff'
      }}>
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: message.sender === 'user' ? '#007bff' : '#f3f4f6',
                color: message.sender === 'user' ? '#ffffff' : '#374151',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                lineHeight: '1.4'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        height: '80px', 
        borderTop: '1px solid #e5e7eb',
        padding: '12px',
        backgroundColor: '#f9fafb',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end'
      }}>
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          size="small"
          autoResize
          minRows={1}
          maxRows={3}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim()}
          style={{
            backgroundColor: newMessage.trim() ? '#007bff' : '#d1d5db',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            height: '36px'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};