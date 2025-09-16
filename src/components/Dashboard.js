import React from 'react';
import { useAuth } from '../context/AuthContext';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Alert from './ui/Alert';

// Avatar component for dashboard
const AvatarComponent = ({ name, size = 'medium' }) => {
  const sizes = { small: '32px', medium: '40px', large: '48px' };
  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#6b7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600'
      }}
    >
      {name?.charAt(0) || '?'}
    </div>
  );
};

const Dashboard = () => {
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navigateToStorybook = () => {
    if (isAdmin()) {
      window.location.href = '/storybook';
    } else {
      // For regular users, navigate to component showcase
      window.location.href = '/components';
    }
  };

  const navigateToComponents = () => {
    window.location.href = '/components';
  };

  const stats = {
    totalComponents: 8,
    activeProjects: 12,
    teamMembers: 24,
    lastUpdate: '2 hours ago'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0
          }}>
            ComponentHub
          </h1>
          <Badge variant="primary" size="small">
            {isAdmin() ? 'Admin' : 'User'}
          </Badge>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AvatarComponent name={user?.name} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {user?.email}
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        {/* Welcome Alert */}
        <div style={{ marginBottom: '24px' }}>
          <Alert variant="info" title={`Welcome back, ${user?.name}!`}>
            {isAdmin() 
              ? 'As an admin, you have full access to create and manage components in Storybook.'
              : 'Explore and use our component library to build amazing interfaces.'
            }
          </Alert>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Quick Actions
          </h2>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button 
              variant="primary" 
              onClick={navigateToStorybook}
              icon="🎨"
            >
              {isAdmin() ? 'Open Storybook Editor' : 'Browse Components'}
            </Button>
            {isAdmin() && (
              <>
                <Button variant="outline" icon="📊">
                  View Analytics
                </Button>
                <Button variant="outline" icon="👥">
                  Manage Users
                </Button>
              </>
            )}
            <Button variant="outline" icon="📚">
              Documentation
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            Overview
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                    {stats.totalComponents}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Total Components
                  </div>
                </div>
                <div style={{ fontSize: '32px' }}>🧩</div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                    {stats.activeProjects}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Active Projects
                  </div>
                </div>
                <div style={{ fontSize: '32px' }}>📁</div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                    {stats.teamMembers}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Team Members
                  </div>
                </div>
                <div style={{ fontSize: '32px' }}>👥</div>
              </div>
            </Card>

            <Card>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                    Last Update
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {stats.lastUpdate}
                  </div>
                </div>
                <div style={{ fontSize: '32px' }}>🕒</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Component Library Preview */}
        <Card>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              Available Components
            </h3>
            <p style={{ 
              fontSize: '14px', 
              color: '#6b7280',
              margin: 0
            }}>
              ComponentHub includes the following UI components ready for use:
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {[
              { name: 'Button', icon: '🔘', description: 'Interactive buttons with variants' },
              { name: 'Input', icon: '📝', description: 'Form inputs with validation' },
              { name: 'Card', icon: '🃏', description: 'Content containers' },
              { name: 'Alert', icon: '⚠️', description: 'System notifications' },
              { name: 'Avatar', icon: '👤', description: 'User profile images' },
              { name: 'Badge', icon: '🏷️', description: 'Status indicators' },
              { name: 'Progress', icon: '📊', description: 'Loading indicators' },
              { name: 'Tabs', icon: '📂', description: 'Content navigation' }
            ].map(component => (
              <div key={component.name} style={{
                padding: '12px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '16px' }}>{component.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                    {component.name}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {component.description}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Button 
              variant="primary" 
              onClick={navigateToComponents}
            >
              Explore Components
            </Button>
            {isAdmin() && (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/storybook'}
              >
                Open Storybook Editor
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;