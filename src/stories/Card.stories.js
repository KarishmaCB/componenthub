import React from 'react';

// Card component with header, body, and footer sections
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
      },
      primary: {
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        borderColor: '#dbeafe'
      },
      success: {
        backgroundColor: '#f0fdf4',
        color: '#166534',
        borderColor: '#dcfce7'
      },
      warning: {
        backgroundColor: '#fffbeb',
        color: '#92400e',
        borderColor: '#fef3c7'
      },
      danger: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        borderColor: '#fecaca'
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
      large: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
      xl: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
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
    ...style,
    ...(hoverable && onClick ? {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    } : {})
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

// Sample button component for stories
const Button = ({ variant = 'primary', size = 'small', children, ...props }) => {
  const getButtonStyle = () => {
    const variants = {
      primary: { backgroundColor: '#007bff', color: '#ffffff', border: '1px solid #007bff' },
      secondary: { backgroundColor: '#6c757d', color: '#ffffff', border: '1px solid #6c757d' },
      outline: { backgroundColor: 'transparent', color: '#007bff', border: '1px solid #007bff' },
      ghost: { backgroundColor: 'transparent', color: '#6b7280', border: 'none' }
    };
    
    const sizes = {
      small: { padding: '6px 12px', fontSize: '12px' },
      medium: { padding: '8px 16px', fontSize: '14px' }
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

export default {
  title: 'Core UI Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Versatile card component for displaying content with optional header and footer. Supports multiple variants, sizes, and interactive states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'filled', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'xl'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    border: { control: 'boolean' },
    hoverable: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Card Title</h3>
        <p style={{ margin: '0', color: '#6b7280', lineHeight: '1.5' }}>
          This is a basic card with some content. Cards are great for grouping related information.
        </p>
      </div>
    ),
  },
};

export const WithHeader = {
  args: {
    header: 'Card Header',
    children: (
      <div>
        <p style={{ margin: '0', lineHeight: '1.5' }}>
          This card has a header section that's perfect for titles or actions.
        </p>
      </div>
    ),
  },
};

export const WithFooter = {
  args: {
    header: 'Settings',
    footer: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    ),
    children: (
      <div>
        <p style={{ margin: '0 0 16px 0', lineHeight: '1.5' }}>
          Configure your application settings below.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input type="checkbox" /> Enable notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input type="checkbox" /> Auto-save changes
          </label>
        </div>
      </div>
    ),
  },
};

export const Variants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
    <Card variant="default" header="Default Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Standard card with default styling.</p>
    </Card>
    <Card variant="outlined" header="Outlined Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Card with emphasized border.</p>
    </Card>
    <Card variant="elevated" header="Elevated Card" shadow="large">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Card with enhanced shadow.</p>
    </Card>
    <Card variant="filled" header="Filled Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Card with background fill.</p>
    </Card>
  </div>
);

export const ColorVariants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
    <Card variant="primary" header="Primary Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Important information or primary actions.</p>
    </Card>
    <Card variant="success" header="Success Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Success messages or completed tasks.</p>
    </Card>
    <Card variant="warning" header="Warning Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Caution or attention required.</p>
    </Card>
    <Card variant="danger" header="Danger Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Errors or destructive actions.</p>
    </Card>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
    <Card size="small" header="Small Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Compact card for minimal content.</p>
    </Card>
    <Card size="medium" header="Medium Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Standard card size for most use cases.</p>
    </Card>
    <Card size="large" header="Large Card">
      <p style={{ margin: '0', lineHeight: '1.5' }}>Spacious card for detailed content.</p>
    </Card>
  </div>
);

export const Interactive = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
    <Card 
      hoverable 
      onClick={() => alert('Card clicked!')}
      header="Clickable Card"
    >
      <p style={{ margin: '0', lineHeight: '1.5' }}>
        This card is interactive. Hover over it and click to see the effect.
      </p>
    </Card>
    <Card 
      hoverable 
      shadow="small"
      onClick={() => alert('Another card clicked!')}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Product Card</h3>
        <p style={{ margin: '0 0 12px 0', color: '#6b7280', lineHeight: '1.5' }}>
          Click to view product details
        </p>
        <div style={{ fontSize: '18px', fontWeight: '600', color: '#007bff' }}>$29.99</div>
      </div>
    </Card>
  </div>
);

export const NoShadow = {
  args: {
    shadow: 'none',
    border: true,
    header: 'Flat Card',
    children: (
      <p style={{ margin: '0', lineHeight: '1.5' }}>
        This card has no shadow for a flat appearance.
      </p>
    ),
  },
};

export const NoPadding = {
  args: {
    padding: 'none',
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Custom Padding</h3>
        <p style={{ margin: '0', lineHeight: '1.5' }}>
          This card has no default padding, allowing for custom spacing.
        </p>
      </div>
    ),
  },
};

export const UserProfile = () => (
  <Card 
    style={{ maxWidth: '300px' }}
    header={
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          JD
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '14px' }}>John Doe</div>
          <div style={{ fontSize: '12px', color: '#6b7280' }}>john@example.com</div>
        </div>
      </div>
    }
    footer={
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline">Message</Button>
        <Button variant="primary">Follow</Button>
      </div>
    }
  >
    <div style={{ lineHeight: '1.5' }}>
      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>
        Frontend Developer passionate about creating beautiful user experiences.
      </p>
      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
        <span><strong>120</strong> Following</span>
        <span><strong>1.2k</strong> Followers</span>
      </div>
    </div>
  </Card>
);