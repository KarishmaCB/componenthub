import React, { useState, useRef, useEffect } from 'react';

// Dropdown component with various styles and behaviors
const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-start',
  disabled = false,
  closeOnSelect = true,
  closeOnOutsideClick = true,
  maxHeight = '300px',
  width = 'auto',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closeOnOutsideClick &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnOutsideClick]);

  const getPlacementStyles = () => {
    const styles = {
      'bottom-start': { top: '100%', left: '0' },
      'bottom-end': { top: '100%', right: '0' },
      'top-start': { bottom: '100%', left: '0' },
      'top-end': { bottom: '100%', right: '0' },
      'left': { right: '100%', top: '0' },
      'right': { left: '100%', top: '0' }
    };
    return styles[placement] || styles['bottom-start'];
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const menuStyle = {
    position: 'absolute',
    ...getPlacementStyles(),
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 1000,
    minWidth: '160px',
    width: width,
    maxHeight: maxHeight,
    overflowY: 'auto',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
    transition: 'all 0.2s ease-out',
    marginTop: placement.startsWith('bottom') ? '4px' : '0',
    marginBottom: placement.startsWith('top') ? '4px' : '0'
  };

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (callback) => {
    if (closeOnSelect) {
      setIsOpen(false);
    }
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DropdownItem) {
      return React.cloneElement(child, {
        onClick: (e) => {
          child.props.onClick?.(e);
          handleItemClick(child.props.onClick);
        }
      });
    }
    return child;
  });

  return (
    <div style={dropdownStyle} className={className} {...props}>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        style={{
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1
        }}
      >
        {trigger}
      </div>
      <div ref={dropdownRef} style={menuStyle}>
        {clonedChildren}
      </div>
    </div>
  );
};

// Dropdown Item component
const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  destructive = false,
  icon = null,
  shortcut = null,
  ...props
}) => {
  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    fontSize: '14px',
    color: destructive ? '#dc3545' : disabled ? '#9ca3af' : '#374151',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    borderRadius: '6px',
    margin: '2px',
    opacity: disabled ? 0.6 : 1
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleMouseEnter = (e) => {
    if (!disabled) {
      e.target.style.backgroundColor = destructive ? '#fef2f2' : '#f3f4f6';
    }
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  return (
    <div
      style={itemStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
        <span>{children}</span>
      </div>
      {shortcut && (
        <span style={{
          fontSize: '12px',
          color: '#9ca3af',
          fontFamily: 'monospace',
          backgroundColor: '#f3f4f6',
          padding: '2px 6px',
          borderRadius: '4px'
        }}>
          {shortcut}
        </span>
      )}
    </div>
  );
};

// Dropdown Divider component
const DropdownDivider = () => (
  <div style={{
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '4px 0'
  }} />
);

// Sample Button component for dropdown triggers
const Button = ({ variant = 'primary', children, ...props }) => {
  const getButtonStyle = () => {
    const styles = {
      primary: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: '1px solid #007bff'
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: '#ffffff',
        border: '1px solid #6c757d'
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#007bff',
        border: '1px solid #007bff'
      }
    };
    
    return {
      ...styles[variant],
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    };
  };

  return <button style={getButtonStyle()} {...props}>{children}</button>;
};

// Dropdown wrapper for stories
const DropdownExample = ({ children, ...dropdownProps }) => {
  return (
    <div style={{ padding: '40px', minHeight: '200px' }}>
      <Dropdown {...dropdownProps}>
        {children}
      </Dropdown>
    </div>
  );
};

export default {
  title: 'Core UI Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible dropdown component with customizable triggers, positioning, and menu items. Supports keyboard navigation, outside click detection, and various styling options.',
      },
    },
  },
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left', 'right'],
    },
    disabled: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
    width: { control: 'text' },
    maxHeight: { control: 'text' },
  },
};

export const Default = {
  render: (args) => (
    <DropdownExample
      {...args}
      trigger={<Button>Options <span>▼</span></Button>}
    >
      <DropdownItem icon="📝">Edit</DropdownItem>
      <DropdownItem icon="📋">Copy</DropdownItem>
      <DropdownItem icon="📤">Share</DropdownItem>
      <DropdownDivider />
      <DropdownItem destructive icon="🗑️">Delete</DropdownItem>
    </DropdownExample>
  ),
  args: {
    placement: 'bottom-start',
  },
};

export const WithShortcuts = {
  render: (args) => (
    <DropdownExample
      {...args}
      trigger={<Button>File <span>▼</span></Button>}
    >
      <DropdownItem icon="📄" shortcut="⌘N">New File</DropdownItem>
      <DropdownItem icon="📂" shortcut="⌘O">Open</DropdownItem>
      <DropdownItem icon="💾" shortcut="⌘S">Save</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="📤" shortcut="⌘⇧E">Export</DropdownItem>
      <DropdownItem icon="🖨️" shortcut="⌘P">Print</DropdownItem>
    </DropdownExample>
  ),
  args: {
    placement: 'bottom-start',
  },
};

export const UserMenu = {
  render: (args) => (
    <DropdownExample
      {...args}
      trigger={
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          cursor: 'pointer',
          border: '1px solid #e9ecef'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            JD
          </div>
          <span>John Doe</span>
          <span>▼</span>
        </div>
      }
    >
      <DropdownItem icon="👤">Profile</DropdownItem>
      <DropdownItem icon="⚙️">Settings</DropdownItem>
      <DropdownItem icon="💳">Billing</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon="❓">Help</DropdownItem>
      <DropdownItem destructive icon="🚪">Sign Out</DropdownItem>
    </DropdownExample>
  ),
  args: {
    placement: 'bottom-end',
  },
};

export const Placements = () => {
  const placements = [
    { name: 'Bottom Start', value: 'bottom-start' },
    { name: 'Bottom End', value: 'bottom-end' },
    { name: 'Top Start', value: 'top-start' },
    { name: 'Top End', value: 'top-end' },
    { name: 'Left', value: 'left' },
    { name: 'Right', value: 'right' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      padding: '80px',
      minHeight: '400px'
    }}>
      {placements.map(({ name, value }) => (
        <Dropdown
          key={value}
          placement={value}
          trigger={<Button variant="outline">{name}</Button>}
        >
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem>Option 3</DropdownItem>
        </Dropdown>
      ))}
    </div>
  );
};

export const States = () => (
  <div style={{ display: 'flex', gap: '20px', padding: '40px' }}>
    <Dropdown trigger={<Button>Normal</Button>}>
      <DropdownItem>Available</DropdownItem>
      <DropdownItem>Interactive</DropdownItem>
    </Dropdown>
    
    <Dropdown disabled trigger={<Button>Disabled</Button>}>
      <DropdownItem>Not accessible</DropdownItem>
    </Dropdown>
    
    <Dropdown 
      closeOnSelect={false}
      trigger={<Button variant="secondary">Multi-Select</Button>}
    >
      <DropdownItem>Item 1 (stays open)</DropdownItem>
      <DropdownItem>Item 2 (stays open)</DropdownItem>
      <DropdownItem>Item 3 (stays open)</DropdownItem>
    </Dropdown>
  </div>
);

export const NestedContent = {
  render: (args) => (
    <DropdownExample
      {...args}
      trigger={<Button>Complex Menu <span>▼</span></Button>}
      width="280px"
    >
      <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
          Quick Actions
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          Common tasks and shortcuts
        </div>
      </div>
      <DropdownItem icon="⚡">Quick Start</DropdownItem>
      <DropdownItem icon="📊">Analytics</DropdownItem>
      <DropdownDivider />
      <div style={{ padding: '8px 12px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
          RECENT FILES
        </div>
        <DropdownItem icon="📄">document.pdf</DropdownItem>
        <DropdownItem icon="📊">report.xlsx</DropdownItem>
        <DropdownItem icon="🖼️">image.png</DropdownItem>
      </div>
    </DropdownExample>
  ),
  args: {
    placement: 'bottom-start',
  },
};

// Export components for external use
export { Dropdown, DropdownItem, DropdownDivider };