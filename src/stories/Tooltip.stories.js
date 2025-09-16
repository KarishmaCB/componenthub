import React, { useState, useRef, useEffect } from 'react';

// Tooltip component with various positions and triggers
const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  delay = 0,
  offset = 8,
  disabled = false,
  maxWidth = '200px',
  arrow = true,
  theme = 'dark',
  multiline = false,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const showTooltip = () => {
    if (disabled || !content) return;
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (disabled || !content) return;
    setIsVisible(!isVisible);
  };

  const getTooltipPosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top, left, adjustedPosition = position;

    switch (position) {
      case 'top':
        top = -tooltipRect.height - offset;
        left = (triggerRect.width - tooltipRect.width) / 2;
        
        // Check if tooltip would be cut off at the top
        if (triggerRect.top + top < 0) {
          adjustedPosition = 'bottom';
          top = triggerRect.height + offset;
        }
        break;
        
      case 'bottom':
        top = triggerRect.height + offset;
        left = (triggerRect.width - tooltipRect.width) / 2;
        
        // Check if tooltip would be cut off at the bottom
        if (triggerRect.bottom + top + tooltipRect.height > viewportHeight) {
          adjustedPosition = 'top';
          top = -tooltipRect.height - offset;
        }
        break;
        
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - offset;
        
        // Check if tooltip would be cut off on the left
        if (triggerRect.left + left < 0) {
          adjustedPosition = 'right';
          left = triggerRect.width + offset;
        }
        break;
        
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + offset;
        
        // Check if tooltip would be cut off on the right
        if (triggerRect.right + left + tooltipRect.width > viewportWidth) {
          adjustedPosition = 'left';
          left = -tooltipRect.width - offset;
        }
        break;
        
      default:
        top = -tooltipRect.height - offset;
        left = (triggerRect.width - tooltipRect.width) / 2;
    }

    // Ensure tooltip doesn't go off screen horizontally
    if (position === 'top' || position === 'bottom') {
      const maxLeft = viewportWidth - triggerRect.left - tooltipRect.width - 8;
      const minLeft = -triggerRect.left + 8;
      left = Math.max(minLeft, Math.min(left, maxLeft));
    }

    setActualPosition(adjustedPosition);
    return { top, left };
  };

  const getThemeStyles = () => {
    const themes = {
      dark: {
        backgroundColor: '#374151',
        color: '#ffffff',
        border: '1px solid #374151'
      },
      light: {
        backgroundColor: '#ffffff',
        color: '#374151',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      },
      info: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        border: '1px solid #3b82f6'
      },
      success: {
        backgroundColor: '#10b981',
        color: '#ffffff',
        border: '1px solid #10b981'
      },
      warning: {
        backgroundColor: '#f59e0b',
        color: '#ffffff',
        border: '1px solid #f59e0b'
      },
      error: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
        border: '1px solid #ef4444'
      }
    };
    return themes[theme] || themes.dark;
  };

  const getArrowStyles = () => {
    const arrowSize = 6;
    const themeStyles = getThemeStyles();
    
    const baseArrow = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };

    switch (actualPosition) {
      case 'top':
        return {
          ...baseArrow,
          top: '100%',
          left: '50%',
          marginLeft: `-${arrowSize}px`,
          borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
          borderColor: `${themeStyles.backgroundColor} transparent transparent transparent`
        };
        
      case 'bottom':
        return {
          ...baseArrow,
          bottom: '100%',
          left: '50%',
          marginLeft: `-${arrowSize}px`,
          borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent ${themeStyles.backgroundColor} transparent`
        };
        
      case 'left':
        return {
          ...baseArrow,
          left: '100%',
          top: '50%',
          marginTop: `-${arrowSize}px`,
          borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent transparent ${themeStyles.backgroundColor}`
        };
        
      case 'right':
        return {
          ...baseArrow,
          right: '100%',
          top: '50%',
          marginTop: `-${arrowSize}px`,
          borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
          borderColor: `transparent ${themeStyles.backgroundColor} transparent transparent`
        };
        
      default:
        return {};
    }
  };

  const triggerProps = {
    ref: triggerRef,
    ...(trigger === 'hover' && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip
    }),
    ...(trigger === 'focus' && {
      onFocus: showTooltip,
      onBlur: hideTooltip
    }),
    ...(trigger === 'click' && {
      onClick: toggleTooltip
    })
  };

  const tooltipStyle = {
    position: 'absolute',
    zIndex: 1000,
    padding: multiline ? '8px 12px' : '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: multiline ? '1.4' : '1.2',
    maxWidth: maxWidth,
    whiteSpace: multiline ? 'normal' : 'nowrap',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transform: `scale(${isVisible ? 1 : 0.9})`,
    transition: 'all 0.15s ease-out',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    wordWrap: multiline ? 'break-word' : 'normal',
    ...getThemeStyles(),
    ...getTooltipPosition()
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} {...props}>
      {React.cloneElement(children, triggerProps)}
      {(isVisible && content) && (
        <div ref={tooltipRef} style={tooltipStyle}>
          {content}
          {arrow && <div style={getArrowStyles()} />}
        </div>
      )}
    </div>
  );
};

// Sample Button component for tooltip examples
const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => {
  const getButtonStyle = () => {
    const variants = {
      primary: { backgroundColor: '#007bff', color: '#ffffff', border: '1px solid #007bff' },
      secondary: { backgroundColor: '#6c757d', color: '#ffffff', border: '1px solid #6c757d' },
      outline: { backgroundColor: 'transparent', color: '#007bff', border: '1px solid #007bff' }
    };
    
    const sizes = {
      small: { padding: '6px 12px', fontSize: '12px' },
      medium: { padding: '8px 16px', fontSize: '14px' },
      large: { padding: '12px 24px', fontSize: '16px' }
    };
    
    return {
      ...variants[variant],
      ...sizes[size],
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    };
  };

  return <button style={getButtonStyle()} {...props}>{children}</button>;
};

// Sample Icon component
const Icon = ({ children, ...props }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  }} {...props}>
    {children}
  </span>
);

export default {
  title: 'Core UI Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible tooltip component with multiple positioning options, themes, and trigger methods. Supports auto-positioning to stay within viewport bounds.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'focus', 'click'],
    },
    theme: {
      control: { type: 'select' },
      options: ['dark', 'light', 'info', 'success', 'warning', 'error'],
    },
    delay: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    offset: { control: { type: 'number', min: 0, max: 20 } },
    arrow: { control: 'boolean' },
    multiline: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => (
    <div style={{ padding: '100px' }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
  args: {
    content: 'This is a helpful tooltip',
    position: 'top',
  },
};

export const Positions = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '60px',
    padding: '100px',
    justifyItems: 'center'
  }}>
    <Tooltip content="Top tooltip" position="top">
      <Button>Top</Button>
    </Tooltip>
    <Tooltip content="Bottom tooltip" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <Tooltip content="Left tooltip" position="left">
      <Button>Left</Button>
    </Tooltip>
    <Tooltip content="Right tooltip" position="right">
      <Button>Right</Button>
    </Tooltip>
  </div>
);

export const Triggers = () => (
  <div style={{ display: 'flex', gap: '20px', padding: '100px' }}>
    <Tooltip content="Appears on hover" trigger="hover">
      <Button>Hover</Button>
    </Tooltip>
    <Tooltip content="Appears on focus" trigger="focus">
      <Button>Focus</Button>
    </Tooltip>
    <Tooltip content="Appears on click" trigger="click">
      <Button>Click</Button>
    </Tooltip>
  </div>
);

export const Themes = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    padding: '100px'
  }}>
    <Tooltip content="Dark theme (default)" theme="dark">
      <Button>Dark</Button>
    </Tooltip>
    <Tooltip content="Light theme" theme="light">
      <Button variant="outline">Light</Button>
    </Tooltip>
    <Tooltip content="Info theme" theme="info">
      <Button>Info</Button>
    </Tooltip>
    <Tooltip content="Success message" theme="success">
      <Button>Success</Button>
    </Tooltip>
    <Tooltip content="Warning message" theme="warning">
      <Button>Warning</Button>
    </Tooltip>
    <Tooltip content="Error message" theme="error">
      <Button>Error</Button>
    </Tooltip>
  </div>
);

export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '100px' }}>
    <Tooltip content="Help information">
      <Icon>❓</Icon>
    </Tooltip>
    <Tooltip content="Settings">
      <Icon>⚙️</Icon>
    </Tooltip>
    <Tooltip content="Notifications">
      <Icon>🔔</Icon>
    </Tooltip>
    <Tooltip content="User profile">
      <Icon>👤</Icon>
    </Tooltip>
  </div>
);

export const MultilineTooltip = () => (
  <div style={{ padding: '100px' }}>
    <Tooltip
      content="This is a longer tooltip that demonstrates multiline text. It can contain multiple sentences and will wrap to fit within the specified maximum width."
      multiline
      maxWidth="250px"
      theme="light"
    >
      <Button>Multiline Info</Button>
    </Tooltip>
  </div>
);

export const WithDelay = () => (
  <div style={{ display: 'flex', gap: '20px', padding: '100px' }}>
    <Tooltip content="No delay" delay={0}>
      <Button size="small">No Delay</Button>
    </Tooltip>
    <Tooltip content="500ms delay" delay={500}>
      <Button size="small">500ms Delay</Button>
    </Tooltip>
    <Tooltip content="1000ms delay" delay={1000}>
      <Button size="small">1s Delay</Button>
    </Tooltip>
  </div>
);

export const DisabledTooltip = () => (
  <div style={{ display: 'flex', gap: '20px', padding: '100px' }}>
    <Tooltip content="This tooltip is enabled">
      <Button>Enabled</Button>
    </Tooltip>
    <Tooltip content="This tooltip is disabled" disabled>
      <Button variant="secondary">Disabled Tooltip</Button>
    </Tooltip>
    <Tooltip content="">
      <Button variant="outline">Empty Content</Button>
    </Tooltip>
  </div>
);

export const FormElements = () => (
  <div style={{ padding: '100px', maxWidth: '400px' }}>
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Email Address
        <Tooltip content="We'll never share your email with anyone else" theme="info" position="right">
          <Icon style={{ marginLeft: '4px' }}>ℹ️</Icon>
        </Tooltip>
      </label>
      <input
        type="email"
        placeholder="Enter your email"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      />
    </div>
    
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
        Password
        <Tooltip 
          content="Password must be at least 8 characters long and contain uppercase, lowercase, and numbers"
          theme="warning"
          multiline
          maxWidth="200px"
          position="right"
        >
          <Icon style={{ marginLeft: '4px' }}>⚠️</Icon>
        </Tooltip>
      </label>
      <input
        type="password"
        placeholder="Enter your password"
        style={{
          width: '100%',
          padding: '10px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      />
    </div>
  </div>
);

export const InteractiveDemo = () => {
  const [tooltipContent, setTooltipContent] = useState('Dynamic tooltip content');
  const [position, setPosition] = useState('top');
  const [theme, setTheme] = useState('dark');

  return (
    <div style={{ padding: '100px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '20px' }}>Interactive Tooltip Demo</h3>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              Content:
            </label>
            <input
              type="text"
              value={tooltipContent}
              onChange={(e) => setTooltipContent(e.target.value)}
              style={{
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              Position:
            </label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={{
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '500' }}>
              Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </div>
      
      <Tooltip content={tooltipContent} position={position} theme={theme}>
        <Button>Test Tooltip</Button>
      </Tooltip>
    </div>
  );
};

// Export component for external use
export { Tooltip };