import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #dc3545'
        }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>
              🛡️ Admin Panel
            </h1>
            <p style={{ margin: 0, color: '#666' }}>
              Welcome, {user?.name}! You have administrative privileges.
            </p>
          </div>
          <button 
            onClick={logout}
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>User Management</h3>
            <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
              <li>View all users</li>
              <li>Edit user roles</li>
              <li>Deactivate accounts</li>
              <li>Reset passwords</li>
            </ul>
            <button style={{
              padding: '8px 15px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Manage Users
            </button>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>System Settings</h3>
            <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
              <li>OAuth configurations</li>
              <li>Security settings</li>
              <li>Email templates</li>
              <li>System maintenance</li>
            </ul>
            <button style={{
              padding: '8px 15px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              View Settings
            </button>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>Analytics</h3>
            <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px' }}>
              <li>User registration stats</li>
              <li>Login method analysis</li>
              <li>Security events</li>
              <li>System performance</li>
            </ul>
            <button style={{
              padding: '8px 15px',
              background: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              View Analytics
            </button>
          </div>
        </div>

        <div style={{
          background: '#e7f3ff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #b3d9ff'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#0066cc' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
              <strong>User Registration:</strong> john.doe@example.com registered via Google OAuth
              <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>2 hours ago</span>
            </div>
            <div style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
              <strong>Role Change:</strong> jane.smith@example.com promoted to Admin
              <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>5 hours ago</span>
            </div>
            <div style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
              <strong>System Update:</strong> OAuth configuration updated
              <span style={{ float: 'right', color: '#666', fontSize: '14px' }}>1 day ago</span>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#d4edda',
          borderRadius: '8px',
          border: '1px solid #c3e6cb'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>Admin Access Confirmed</h4>
          <p style={{ margin: 0, color: '#155724' }}>
            ✅ You are successfully logged in with <strong>admin</strong> role privileges. 
            This page would normally be protected and only accessible to admin users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;