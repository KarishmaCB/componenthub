import React from 'react';
import PropTypes from 'prop-types';
import './SocialLoginButton.css';

const SocialLoginButton = ({ provider, loading = false, disabled = false, onClick }) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          text: 'Continue with Google',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginRight: '12px' }}>
              <path fill="#4285F4" d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"/>
              <path fill="#34A853" d="M10 20c2.7 0 4.94-.89 6.6-2.41l-3.16-2.45c-.88.59-2.03.94-3.44.94-2.64 0-4.88-1.78-5.68-4.17H1.07v2.52C2.72 17.75 6.09 20 10 20z"/>
              <path fill="#FBBC05" d="M4.32 11.91c-.2-.59-.31-1.22-.31-1.91s.11-1.32.31-1.91V5.57H1.07C.39 6.93 0 8.41 0 10s.39 3.07 1.07 4.43l3.25-2.52z"/>
              <path fill="#EA4335" d="M10 3.98c1.5 0 2.54.65 3.14 1.19l2.31-2.31C14.94.98 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.57l3.25 2.52C5.12 5.76 7.36 3.98 10 3.98z"/>
            </svg>
          ),
          backgroundColor: '#ffffff',
          color: '#1f1f1f',
          border: '1px solid #dadce0',
        };
      case 'facebook':
        return {
          text: 'Continue with Facebook',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginRight: '12px' }}>
              <path fill="#ffffff" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
            </svg>
          ),
          backgroundColor: '#1877f2',
          color: '#ffffff',
          border: 'none',
        };
      case 'linkedin':
        return {
          text: 'Continue with LinkedIn',
          icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginRight: '12px' }}>
              <path fill="#ffffff" d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM4.943 8.57c-.86 0-1.548-.69-1.548-1.54s.688-1.54 1.548-1.54c.854 0 1.548.69 1.548 1.54S5.797 8.57 4.943 8.57zM6.277 18.339H3.61V9.75h2.667v8.589zM19.67 0H.329C.146 0 0 .154 0 .329v19.342c0 .175.146.329.329.329h19.341c.176 0 .329-.154.329-.329V.329C20 .154 19.846 0 19.67 0z"/>
            </svg>
          ),
          backgroundColor: '#0077b5',
          color: '#ffffff',
          border: 'none',
        };
      default:
        return {
          text: 'Continue',
          icon: null,
          backgroundColor: '#f5f5f5',
          color: '#333333',
          border: '1px solid #cccccc',
        };
    }
  };

  const config = getProviderConfig();
  
  const buttonClass = `social-button ${provider} ${loading ? 'btn-loading' : ''} ${disabled ? 'disabled' : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        backgroundColor: config.backgroundColor,
        color: config.color,
        border: config.border,
      }}
    >
      {!loading && config.icon}
      <span>{config.text}</span>
    </button>
  );
};

SocialLoginButton.propTypes = {
  provider: PropTypes.oneOf(['google', 'facebook', 'linkedin']).isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SocialLoginButton;