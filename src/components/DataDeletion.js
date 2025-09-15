import React, { useState } from 'react';

const DataDeletion = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend API
    // For now, we'll just show a confirmation message
    console.log('Data deletion request for email:', email);
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'white',
        borderRadius: '10px',
        padding: '40px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Data Deletion Request
        </h1>

        {!submitted ? (
          <>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '30px'
            }}>
              If you would like to delete your data associated with ComponentHub, 
              please submit your request below. We will process your request and 
              delete all personal data within 30 days.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333'
                }}>
                  Email Address:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.background = '#c82333'}
                onMouseOut={(e) => e.target.style.background = '#dc3545'}
              >
                Submit Data Deletion Request
              </button>
            </form>

            <div style={{
              marginTop: '30px',
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '5px',
              border: '1px solid #e9ecef'
            }}>
              <h3 style={{ color: '#495057', marginBottom: '10px' }}>
                What data will be deleted?
              </h3>
              <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
                <li>Your account information and profile data</li>
                <li>Authentication records</li>
                <li>Any content or data you've created</li>
                <li>Usage analytics and logs</li>
              </ul>
              
              <p style={{ 
                color: '#6c757d', 
                marginTop: '15px',
                fontSize: '14px'
              }}>
                Note: This process is irreversible. Once deleted, your data cannot be recovered.
              </p>
            </div>
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px'
          }}>
            <div style={{
              fontSize: '48px',
              color: '#28a745',
              marginBottom: '20px'
            }}>
              ✓
            </div>
            <h2 style={{ color: '#28a745', marginBottom: '15px' }}>
              Request Submitted
            </h2>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Your data deletion request has been received. We will process 
              your request and delete all associated data within 30 days.
            </p>
            <p style={{ 
              color: '#666', 
              marginTop: '15px',
              fontSize: '14px'
            }}>
              You will receive a confirmation email at <strong>{email}</strong> 
              once the deletion is complete.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataDeletion;