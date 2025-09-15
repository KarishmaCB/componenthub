import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  redirectTo = null 
}) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ margin: 0, color: '#666' }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>🔒 Access Denied</h2>
          <p style={{ marginBottom: '25px', color: '#666' }}>
            You need to be logged in to access this page.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '12px 24px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>⛔ Access Restricted</h2>
          <p style={{ marginBottom: '15px', color: '#666' }}>
            You don't have the required permissions to access this page.
          </p>
          <div style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '25px'
          }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
              <strong>Your Role:</strong> 
              <span style={{ 
                marginLeft: '8px',
                padding: '2px 8px',
                background: user?.role === 'admin' ? '#dc3545' : '#28a745',
                color: 'white',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {user?.role?.toUpperCase()}
              </span>
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              <strong>Required Role:</strong> 
              <span style={{ 
                marginLeft: '8px',
                padding: '2px 8px',
                background: '#ffc107',
                color: '#212529',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                {requiredRole?.toUpperCase()}
              </span>
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/dashboard'}
            style={{
              padding: '12px 24px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '16px'
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected content
  return children;
};

export default ProtectedRoute;