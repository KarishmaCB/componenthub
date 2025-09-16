import React, { useState, useRef, useEffect } from 'react';

// Tab component
const Tab = ({ children, disabled = false, icon = null, badge = null, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// TabPanel component
const TabPanel = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// Main Tabs component
const Tabs = ({
  children,
  defaultValue = 0,
  value: controlledValue,
  onChange,
  variant = 'default',
  size = 'medium',
  orientation = 'horizontal',
  scrollable = false,
  centered = false,
  fullWidth = false,
  className = '',
  style = {},
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef(null);
  const tabRefs = useRef([]);
  
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Extract tabs and panels from children
  const tabs = [];
  const panels = [];
  
  React.Children.forEach(children, (child, index) => {
    if (child.type === Tab) {
      tabs.push(React.cloneElement(child, { key: index, index }));
    } else if (child.type === TabPanel) {
      panels.push(React.cloneElement(child, { key: index, index }));
    }
  });

  const getSizeStyles = () => {
    const sizes = {
      small: {
        fontSize: '12px',
        padding: '8px 12px',
        minHeight: '32px'
      },
      medium: {
        fontSize: '14px',
        padding: '12px 16px',
        minHeight: '40px'
      },
      large: {
        fontSize: '16px',
        padding: '16px 20px',
        minHeight: '48px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #e5e7eb',
        tabColor: '#6b7280',
        tabActiveColor: '#3b82f6',
        tabHoverColor: '#374151',
        indicatorColor: '#3b82f6',
        indicatorHeight: '2px'
      },
      pills: {
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        padding: '4px',
        tabColor: '#6b7280',
        tabActiveColor: '#3b82f6',
        tabHoverColor: '#374151',
        tabActiveBg: '#ffffff',
        indicatorColor: 'transparent'
      },
      enclosed: {
        backgroundColor: 'transparent',
        borderBottom: '1px solid #e5e7eb',
        tabColor: '#6b7280',
        tabActiveColor: '#3b82f6',
        tabHoverColor: '#374151',
        tabBorder: '1px solid #e5e7eb',
        tabActiveBorder: '1px solid #3b82f6',
        indicatorColor: 'transparent'
      },
      soft: {
        backgroundColor: 'transparent',
        tabColor: '#6b7280',
        tabActiveColor: '#3b82f6',
        tabHoverColor: '#374151',
        tabActiveBg: '#eff6ff',
        indicatorColor: 'transparent'
      }
    };
    return variants[variant] || variants.default;
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  // Update indicator position when active tab changes
  useEffect(() => {
    if (variant === 'default' && tabRefs.current[currentValue]) {
      const activeTab = tabRefs.current[currentValue];
      const tabsContainer = tabsRef.current;
      
      if (activeTab && tabsContainer) {
        const { offsetLeft, offsetWidth } = activeTab;
        
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`
        });
      }
    }
  }, [currentValue, variant, tabs.length]);

  const handleTabClick = (index) => {
    const tab = tabs[index];
    if (tab.props.disabled) return;

    if (!isControlled) {
      setInternalValue(index);
    }
    onChange?.(index);
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'row' : 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ...style
  };

  const tabListStyle = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    position: 'relative',
    overflow: scrollable ? 'auto' : 'visible',
    justifyContent: centered ? 'center' : 'flex-start',
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: variantStyles.backgroundColor,
    borderBottom: orientation === 'horizontal' ? variantStyles.borderBottom : 'none',
    borderRight: orientation === 'vertical' ? variantStyles.borderBottom : 'none',
    borderRadius: variant === 'pills' ? variantStyles.borderRadius : '0',
    padding: variant === 'pills' ? variantStyles.padding : '0',
    gap: variant === 'pills' ? '2px' : '0'
  };

  const getTabStyle = (index, isActive) => {
    const baseStyle = {
      ...sizeStyles,
      border: 'none',
      background: 'transparent',
      cursor: tabs[index]?.props.disabled ? 'not-allowed' : 'pointer',
      color: isActive ? variantStyles.tabActiveColor : variantStyles.tabColor,
      fontWeight: isActive ? '600' : '500',
      transition: 'all 0.2s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
      opacity: tabs[index]?.props.disabled ? 0.5 : 1,
      flex: fullWidth && orientation === 'horizontal' ? 1 : 'none',
      justifyContent: fullWidth ? 'center' : 'flex-start'
    };

    if (variant === 'pills') {
      return {
        ...baseStyle,
        borderRadius: '6px',
        backgroundColor: isActive ? variantStyles.tabActiveBg : 'transparent'
      };
    }

    if (variant === 'enclosed') {
      return {
        ...baseStyle,
        border: variantStyles.tabBorder,
        borderBottom: orientation === 'horizontal' ? 'none' : variantStyles.tabBorder,
        borderRight: orientation === 'vertical' ? 'none' : variantStyles.tabBorder,
        borderTopLeftRadius: '6px',
        borderTopRightRadius: orientation === 'horizontal' ? '6px' : '0',
        borderBottomLeftRadius: orientation === 'vertical' ? '6px' : '0',
        marginBottom: orientation === 'horizontal' ? '-1px' : '0',
        marginRight: orientation === 'vertical' ? '-1px' : '0',
        ...(isActive && {
          borderColor: variantStyles.tabActiveBorder?.replace('1px solid ', ''),
          backgroundColor: '#ffffff',
          zIndex: 1
        })
      };
    }

    if (variant === 'soft') {
      return {
        ...baseStyle,
        borderRadius: '6px',
        backgroundColor: isActive ? variantStyles.tabActiveBg : 'transparent'
      };
    }

    return baseStyle;
  };

  const indicatorStyle_computed = {
    position: 'absolute',
    bottom: orientation === 'horizontal' ? '0' : 'auto',
    right: orientation === 'vertical' ? '0' : 'auto',
    height: orientation === 'horizontal' ? variantStyles.indicatorHeight : 'auto',
    width: orientation === 'vertical' ? variantStyles.indicatorHeight : 'auto',
    backgroundColor: variantStyles.indicatorColor,
    transition: 'all 0.3s ease-in-out',
    borderRadius: '1px',
    ...indicatorStyle
  };

  const panelStyle = {
    marginTop: orientation === 'horizontal' ? '16px' : '0',
    marginLeft: orientation === 'vertical' ? '16px' : '0',
    flex: 1
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      <div ref={tabsRef} style={tabListStyle} role="tablist">
        {tabs.map((tab, index) => {
          const isActive = index === currentValue;
          return (
            <button
              key={index}
              ref={el => tabRefs.current[index] = el}
              style={getTabStyle(index, isActive)}
              onClick={() => handleTabClick(index)}
              onMouseEnter={(e) => {
                if (!tab.props.disabled && !isActive) {
                  e.target.style.color = variantStyles.tabHoverColor;
                }
              }}
              onMouseLeave={(e) => {
                if (!tab.props.disabled && !isActive) {
                  e.target.style.color = variantStyles.tabColor;
                }
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${index}`}
              disabled={tab.props.disabled}
            >
              {tab.props.icon && <span>{tab.props.icon}</span>}
              <span>{tab.props.children}</span>
              {tab.props.badge && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '16px',
                  textAlign: 'center'
                }}>
                  {tab.props.badge}
                </span>
              )}
            </button>
          );
        })}
        
        {variant === 'default' && variantStyles.indicatorColor !== 'transparent' && (
          <div style={indicatorStyle_computed} />
        )}
      </div>

      <div style={panelStyle}>
        {panels.map((panel, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`panel-${index}`}
            aria-labelledby={`tab-${index}`}
            style={{ display: index === currentValue ? 'block' : 'none' }}
          >
            {panel.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

// Controlled Tabs wrapper for stories
const ControlledTabs = ({ children, ...props }) => {
  const [activeTab, setActiveTab] = useState(props.defaultValue || 0);
  
  return (
    <Tabs
      {...props}
      value={activeTab}
      onChange={setActiveTab}
    >
      {children}
    </Tabs>
  );
};

export default {
  title: 'Core UI Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tab components for organizing content into different sections. Supports multiple variants, orientations, and interactive features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'pills', 'enclosed', 'soft'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    scrollable: { control: 'boolean' },
    centered: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => (
    <ControlledTabs {...args}>
      <Tab>Home</Tab>
      <Tab>About</Tab>
      <Tab>Contact</Tab>
      
      <TabPanel>
        <h3>Home Content</h3>
        <p>Welcome to our website! This is the home page content.</p>
      </TabPanel>
      <TabPanel>
        <h3>About Us</h3>
        <p>Learn more about our company and mission.</p>
      </TabPanel>
      <TabPanel>
        <h3>Contact Information</h3>
        <p>Get in touch with us through the following channels.</p>
      </TabPanel>
    </ControlledTabs>
  ),
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Default</h4>
      <ControlledTabs variant="default">
        <Tab>Overview</Tab>
        <Tab>Analytics</Tab>
        <Tab>Settings</Tab>
        
        <TabPanel>Overview dashboard content</TabPanel>
        <TabPanel>Analytics and metrics</TabPanel>
        <TabPanel>Application settings</TabPanel>
      </ControlledTabs>
    </div>

    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Pills</h4>
      <ControlledTabs variant="pills">
        <Tab>Messages</Tab>
        <Tab>Notifications</Tab>
        <Tab>Profile</Tab>
        
        <TabPanel>Your recent messages</TabPanel>
        <TabPanel>System notifications</TabPanel>
        <TabPanel>User profile settings</TabPanel>
      </ControlledTabs>
    </div>

    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Enclosed</h4>
      <ControlledTabs variant="enclosed">
        <Tab>Code</Tab>
        <Tab>Issues</Tab>
        <Tab>Pull Requests</Tab>
        
        <TabPanel>Repository source code</TabPanel>
        <TabPanel>Open issues and bugs</TabPanel>
        <TabPanel>Pending pull requests</TabPanel>
      </ControlledTabs>
    </div>

    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Soft</h4>
      <ControlledTabs variant="soft">
        <Tab>Gallery</Tab>
        <Tab>Videos</Tab>
        <Tab>Documents</Tab>
        
        <TabPanel>Photo gallery</TabPanel>
        <TabPanel>Video collection</TabPanel>
        <TabPanel>Document library</TabPanel>
      </ControlledTabs>
    </div>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Small</h4>
      <ControlledTabs size="small">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        
        <TabPanel>Small tab content</TabPanel>
        <TabPanel>More content here</TabPanel>
        <TabPanel>Final tab content</TabPanel>
      </ControlledTabs>
    </div>

    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Medium</h4>
      <ControlledTabs size="medium">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        
        <TabPanel>Medium tab content</TabPanel>
        <TabPanel>More content here</TabPanel>
        <TabPanel>Final tab content</TabPanel>
      </ControlledTabs>
    </div>

    <div>
      <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Large</h4>
      <ControlledTabs size="large">
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
        
        <TabPanel>Large tab content</TabPanel>
        <TabPanel>More content here</TabPanel>
        <TabPanel>Final tab content</TabPanel>
      </ControlledTabs>
    </div>
  </div>
);

export const WithIcons = () => (
  <ControlledTabs>
    <Tab icon="🏠">Home</Tab>
    <Tab icon="📊">Dashboard</Tab>
    <Tab icon="⚙️">Settings</Tab>
    <Tab icon="👤">Profile</Tab>
    
    <TabPanel>
      <h3>🏠 Home</h3>
      <p>Welcome to your home dashboard where you can see an overview of everything.</p>
    </TabPanel>
    <TabPanel>
      <h3>📊 Dashboard</h3>
      <p>View your analytics, metrics, and key performance indicators here.</p>
    </TabPanel>
    <TabPanel>
      <h3>⚙️ Settings</h3>
      <p>Configure your application preferences and account settings.</p>
    </TabPanel>
    <TabPanel>
      <h3>👤 Profile</h3>
      <p>Manage your personal information and profile settings.</p>
    </TabPanel>
  </ControlledTabs>
);

export const WithBadges = () => (
  <ControlledTabs>
    <Tab icon="💬" badge="3">Messages</Tab>
    <Tab icon="🔔" badge="12">Notifications</Tab>
    <Tab icon="📋">Tasks</Tab>
    <Tab icon="⭐" badge="99+">Favorites</Tab>
    
    <TabPanel>
      <h3>Messages</h3>
      <p>You have 3 unread messages.</p>
    </TabPanel>
    <TabPanel>
      <h3>Notifications</h3>
      <p>You have 12 new notifications to review.</p>
    </TabPanel>
    <TabPanel>
      <h3>Tasks</h3>
      <p>Your task list and project management.</p>
    </TabPanel>
    <TabPanel>
      <h3>Favorites</h3>
      <p>Your saved items and favorites (99+ items).</p>
    </TabPanel>
  </ControlledTabs>
);

export const DisabledTabs = () => (
  <ControlledTabs>
    <Tab>Available</Tab>
    <Tab disabled>Disabled</Tab>
    <Tab>Another Available</Tab>
    <Tab disabled>Also Disabled</Tab>
    
    <TabPanel>This tab is available and clickable.</TabPanel>
    <TabPanel>This content is not accessible.</TabPanel>
    <TabPanel>This tab is also available.</TabPanel>
    <TabPanel>This content is also not accessible.</TabPanel>
  </ControlledTabs>
);

export const VerticalTabs = () => (
  <div style={{ height: '300px' }}>
    <ControlledTabs orientation="vertical">
      <Tab icon="👤">Account</Tab>
      <Tab icon="🔒">Security</Tab>
      <Tab icon="🔔">Notifications</Tab>
      <Tab icon="💳">Billing</Tab>
      
      <TabPanel>
        <h3>Account Settings</h3>
        <p>Manage your account information, username, and basic preferences.</p>
        <div style={{ marginTop: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>Username:</label>
          <input type="text" placeholder="Enter username" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        </div>
      </TabPanel>
      <TabPanel>
        <h3>Security Settings</h3>
        <p>Configure password, two-factor authentication, and security preferences.</p>
        <div style={{ marginTop: '16px' }}>
          <button style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>
            Change Password
          </button>
        </div>
      </TabPanel>
      <TabPanel>
        <h3>Notification Preferences</h3>
        <p>Choose how and when you want to receive notifications.</p>
        <div style={{ marginTop: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            Email notifications
          </label>
        </div>
      </TabPanel>
      <TabPanel>
        <h3>Billing Information</h3>
        <p>View your subscription details and payment methods.</p>
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
          Current Plan: Premium
        </div>
      </TabPanel>
    </ControlledTabs>
  </div>
);

export const FullWidthTabs = () => (
  <ControlledTabs fullWidth>
    <Tab>Overview</Tab>
    <Tab>Details</Tab>
    <Tab>Analytics</Tab>
    <Tab>Reports</Tab>
    
    <TabPanel>
      <h3>Overview</h3>
      <p>High-level overview of your data and metrics.</p>
    </TabPanel>
    <TabPanel>
      <h3>Details</h3>
      <p>Detailed breakdown of information and statistics.</p>
    </TabPanel>
    <TabPanel>
      <h3>Analytics</h3>
      <p>Advanced analytics and data visualization.</p>
    </TabPanel>
    <TabPanel>
      <h3>Reports</h3>
      <p>Generate and download detailed reports.</p>
    </TabPanel>
  </ControlledTabs>
);

export const ScrollableTabs = () => (
  <div style={{ maxWidth: '400px' }}>
    <ControlledTabs scrollable>
      <Tab>Very Long Tab Name One</Tab>
      <Tab>Another Long Tab</Tab>
      <Tab>Tab Three</Tab>
      <Tab>Fourth Tab Name</Tab>
      <Tab>Fifth Tab</Tab>
      <Tab>Sixth Tab Here</Tab>
      <Tab>Seventh Tab</Tab>
      <Tab>Final Tab</Tab>
      
      <TabPanel>Content for the first very long tab.</TabPanel>
      <TabPanel>Content for the second tab.</TabPanel>
      <TabPanel>Content for the third tab.</TabPanel>
      <TabPanel>Content for the fourth tab.</TabPanel>
      <TabPanel>Content for the fifth tab.</TabPanel>
      <TabPanel>Content for the sixth tab.</TabPanel>
      <TabPanel>Content for the seventh tab.</TabPanel>
      <TabPanel>Content for the final tab.</TabPanel>
    </ControlledTabs>
  </div>
);

export const DashboardExample = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const stats = {
    users: 1234,
    revenue: '$45,678',
    orders: 789,
    growth: '+23%'
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      padding: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '700' }}>
        Analytics Dashboard
      </h2>
      
      <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
        <Tab icon="📊">Overview</Tab>
        <Tab icon="👥" badge={stats.users.toLocaleString()}>Users</Tab>
        <Tab icon="💰">Revenue</Tab>
        <Tab icon="📈">Growth</Tab>
        
        <TabPanel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{stats.users.toLocaleString()}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>Total Users</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#166534' }}>{stats.revenue}</div>
              <div style={{ fontSize: '14px', color: '#16a34a' }}>Revenue</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#92400e' }}>{stats.orders}</div>
              <div style={{ fontSize: '14px', color: '#d97706' }}>Orders</div>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e40af' }}>{stats.growth}</div>
              <div style={{ fontSize: '14px', color: '#3b82f6' }}>Growth</div>
            </div>
          </div>
          <p>Welcome to your analytics overview. Monitor key metrics and track performance.</p>
        </TabPanel>
        
        <TabPanel>
          <h3 style={{ margin: '0 0 16px 0' }}>User Analytics</h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b' }}>{stats.users.toLocaleString()}</div>
            <div style={{ fontSize: '16px', color: '#64748b' }}>Active Users</div>
          </div>
          <p>Detailed user metrics, engagement rates, and user behavior analysis.</p>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
            <strong>Top Countries:</strong> United States, Canada, United Kingdom
          </div>
        </TabPanel>
        
        <TabPanel>
          <h3 style={{ margin: '0 0 16px 0' }}>Revenue Dashboard</h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#166534' }}>{stats.revenue}</div>
            <div style={{ fontSize: '16px', color: '#16a34a' }}>Monthly Revenue</div>
          </div>
          <p>Track revenue streams, payment methods, and financial performance.</p>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
            <strong>This Month:</strong> 15% increase compared to last month
          </div>
        </TabPanel>
        
        <TabPanel>
          <h3 style={{ margin: '0 0 16px 0' }}>Growth Metrics</h3>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e40af' }}>{stats.growth}</div>
            <div style={{ fontSize: '16px', color: '#3b82f6' }}>Monthly Growth</div>
          </div>
          <p>Monitor growth trends, conversion rates, and expansion metrics.</p>
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
            <strong>Key Insight:</strong> User acquisition has increased significantly this quarter
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

// Export Tab and TabPanel components
export { Tab, TabPanel };