import React from 'react';
import { useAuth } from '../context/AuthContext';
import ComponentHubLogo from '../components/ComponentHubLogo';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ComponentHubLogo size="80px" />
            <div>
              <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
                ComponentHub Dashboard
              </h1>
              <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
                Manage your React components and library
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>User Information</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div><strong>Name:</strong> {user?.name || 'N/A'}</div>
            <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
            <div><strong>Role:</strong> 
              <span style={{
                marginLeft: '10px',
                padding: '4px 8px',
                background: user?.role === 'admin' ? '#dc3545' : '#28a745',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {user?.role?.toUpperCase() || 'N/A'}
              </span>
            </div>
            <div><strong>Login Method:</strong> {user?.provider || 'N/A'}</div>
            {user?.avatar && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong>Avatar:</strong>
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isAdmin() ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr',
          gap: '20px'
        }}>
          <div style={{
            background: '#e3f2fd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #bbdefb'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#1565c0' }}>Component Library Features</h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Browse component library</li>
              <li>Create custom components</li>
              <li>Export component packages</li>
              <li>View usage analytics</li>
            </ul>
          </div>

          {isAdmin() && (
            <div style={{
              background: '#ffebee',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ffcdd2'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#c62828' }}>Admin Features</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Manage component library</li>
                <li>User access control</li>
                <li>Component quality review</li>
                <li>System analytics</li>
              </ul>
              <button style={{
                marginTop: '15px',
                padding: '8px 15px',
                background: '#c62828',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                Go to Admin Panel
              </button>
            </div>
          )}
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffeaa7'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>Next Steps</h4>
          <p style={{ margin: 0, color: '#856404' }}>
            🚀 <strong>Coming Soon:</strong> Component creation toolkit, drag & drop builder, 
            and advanced component marketplace features will be available soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;