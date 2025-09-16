import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ComponentHubLogo from './ComponentHubLogo';
import UserManagement from './UserManagement';
import './StorybookDashboard.css';

const StorybookDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('components');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const components = [
    {
      id: 'social-login-button',
      name: 'SocialLoginButton',
      category: 'Authentication',
      description: 'OAuth social login buttons with platform-specific styling',
      usage: 'Authentication forms, login pages',
      props: ['provider', 'loading', 'disabled', 'onClick'],
      examples: ['Google Login', 'Facebook Login', 'LinkedIn Login']
    },
    {
      id: 'component-hub-logo',
      name: 'ComponentHubLogo',
      category: 'Brand',
      description: 'Scalable brand logo with customization options',
      usage: 'Headers, navigation, brand displays',
      props: ['size', 'color', 'animated', 'variant'],
      examples: ['Header Logo', 'Footer Logo', 'Loading Screen']
    },
    {
      id: 'auth-page',
      name: 'AuthPage',
      category: 'Authentication',
      description: 'Complete authentication experience with forms and animations',
      usage: 'Login pages, signup flows, user onboarding',
      props: ['defaultMode', 'onSuccess', 'showWelcome'],
      examples: ['Login Form', 'Signup Form', 'Mobile View']
    }
  ];

  const ComponentCard = ({ component }) => (
    <div className="component-card">
      <div className="component-header">
        <h3>{component.name}</h3>
        <span className="component-category">{component.category}</span>
      </div>
      <p className="component-description">{component.description}</p>
      <div className="component-meta">
        <div className="component-usage">
          <strong>Use case:</strong> {component.usage}
        </div>
        <div className="component-props">
          <strong>Props:</strong> {component.props.join(', ')}
        </div>
        <div className="component-examples">
          <strong>Examples:</strong> {component.examples.join(', ')}
        </div>
      </div>
      <div className="component-actions">
        <button className="btn-primary" onClick={() => openStorybookComponent(component.id)}>
          View in Storybook
        </button>
        <button className="btn-secondary" onClick={() => copyInstallCommand(component.name)}>
          Copy Install
        </button>
        {isAdmin() && (
          <button className="btn-admin" onClick={() => editComponent(component.id)}>
            Edit Component
          </button>
        )}
      </div>
    </div>
  );

  const openStorybookComponent = (componentId) => {
    // Open specific component in Storybook
    const storybookUrl = `http://localhost:6006/?path=/story/componenthub-${componentId.replace('-', '-')}--default`;
    window.open(storybookUrl, '_blank');
  };

  const copyInstallCommand = (componentName) => {
    const installCommand = `npm install @componenthub/${componentName.toLowerCase()}`;
    navigator.clipboard.writeText(installCommand);
    // Show toast notification
    showToast(`Install command copied: ${installCommand}`);
  };

  const editComponent = (componentId) => {
    if (isAdmin()) {
      setActiveSection('create');
      // Pre-populate form with existing component data
    }
  };

  const showToast = (message) => {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const CreateComponentForm = () => (
    <div className="create-component-form">
      <h2>Create New Component</h2>
      <form>
        <div className="form-group">
          <label>Component Name</label>
          <input type="text" placeholder="e.g. CustomButton" />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select>
            <option value="authentication">Authentication</option>
            <option value="brand">Brand</option>
            <option value="forms">Forms</option>
            <option value="navigation">Navigation</option>
            <option value="layout">Layout</option>
          </select>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Brief description of the component"></textarea>
        </div>
        <div className="form-group">
          <label>Component Code (JSX)</label>
          <textarea rows="10" placeholder="Paste your React component code here"></textarea>
        </div>
        <div className="form-group">
          <label>Story Configuration</label>
          <textarea rows="5" placeholder="Storybook story configuration"></textarea>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => setShowCreateForm(false)}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Component
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="storybook-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <ComponentHubLogo size={40} />
          <h1>ComponentHub</h1>
          <span className="user-role">{isAdmin() ? 'Admin' : 'User'}</span>
        </div>
        <div className="header-right">
          <span className="welcome-text">Welcome, {user?.name}</span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={`nav-item ${activeSection === 'components' ? 'active' : ''}`}
          onClick={() => setActiveSection('components')}
        >
          Components
        </button>
        <button 
          className={`nav-item ${activeSection === 'storybook' ? 'active' : ''}`}
          onClick={() => setActiveSection('storybook')}
        >
          Storybook
        </button>
        {isAdmin() && (
          <button 
            className={`nav-item ${activeSection === 'create' ? 'active' : ''}`}
            onClick={() => setActiveSection('create')}
          >
            Create Component
          </button>
        )}
        {isAdmin() && (
          <button 
            className={`nav-item ${activeSection === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveSection('manage')}
          >
            Manage Users
          </button>
        )}
      </nav>

      <main className="dashboard-content">
        {activeSection === 'components' && (
          <div className="components-section">
            <div className="section-header">
              <h2>Component Library</h2>
              <p>Browse and use ComponentHub components in your projects</p>
            </div>
            <div className="components-grid">
              {components.map(component => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'storybook' && (
          <div className="storybook-section">
            <div className="section-header">
              <h2>Interactive Storybook</h2>
              <p>Explore components with live examples and documentation</p>
            </div>
            <div className="storybook-iframe-container">
              <iframe 
                src="http://localhost:6006"
                title="Storybook"
                className="storybook-iframe"
                frameBorder="0"
              />
            </div>
          </div>
        )}

        {activeSection === 'create' && isAdmin() && (
          <div className="create-section">
            <CreateComponentForm />
          </div>
        )}

        {activeSection === 'manage' && isAdmin() && (
          <div className="manage-section">
            <UserManagement />
          </div>
        )}
      </main>
    </div>
  );
};

export default StorybookDashboard;