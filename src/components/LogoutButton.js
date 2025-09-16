import React from 'react';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '8px',
      padding: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
        Logged in as: {user?.email}
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;