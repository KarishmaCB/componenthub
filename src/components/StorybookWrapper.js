import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';
import Alert from './ui/Alert';

const StorybookWrapper = () => {
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [storybookError, setStorybookError] = useState(false);

  useEffect(() => {
    // Check if Storybook is accessible
    const checkStorybook = async () => {
      try {
        const response = await fetch('http://localhost:6006', { mode: 'no-cors' });
        setIsLoading(false);
      } catch (error) {
        setStorybookError(true);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkStorybook, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const openInNewTab = () => {
    window.open('http://localhost:6006', '_blank');
  };

  if (!isAdmin()) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Alert variant="error" title="Access Denied">
          You need admin privileges to access the Storybook editor.
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading Storybook...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (storybookError) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '24px'
      }}>
        <Alert variant="error" title="Storybook Unavailable">
          Cannot connect to Storybook server. Please make sure Storybook is running on localhost:6006.
        </Alert>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <Button variant="outline" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
          <Button variant="primary" onClick={openInNewTab}>
            Try Opening in New Tab
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header Bar */}
      <div style={{
        height: '60px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        zIndex: 1001
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            ComponentHub Storybook
          </h1>
          <div style={{
            padding: '4px 8px',
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            Admin Mode
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Welcome, {user?.name}
          </div>
          <Button variant="outline" size="small" onClick={openInNewTab}>
            Open in New Tab
          </Button>
          <Button variant="outline" size="small" onClick={handleBackToDashboard}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {/* Storybook Iframe */}
      <div style={{
        flex: 1,
        width: '100%',
        height: 'calc(100vh - 60px)',
        overflow: 'hidden'
      }}>
        <iframe
          src="http://localhost:6006"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
          title="ComponentHub Storybook"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
};

export default StorybookWrapper;