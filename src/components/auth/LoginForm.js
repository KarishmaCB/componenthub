import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthForms.css';

const LoginForm = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { loginWithEmail, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await loginWithEmail(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
  };

  // Demo credentials helper - removed since we're using real Firebase auth
  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@test.com',
        password: 'password123'
      });
    } else {
      setFormData({
        email: 'user@test.com',
        password: 'password123'
      });
    }
    setError('');
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      
      {/* Demo Credentials */}
      <div className="demo-credentials">
        <p>Create test accounts or use Google login:</p>
        <button 
          type="button" 
          className="demo-btn admin"
          onClick={() => fillDemoCredentials('admin')}
        >
          Fill Test Admin Email
        </button>
        <button 
          type="button" 
          className="demo-btn user"
          onClick={() => fillDemoCredentials('user')}
        >
          Fill Test User Email
        </button>
        <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
          Note: You'll need to create these accounts first using the signup form.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="auth-button primary"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-switch">
        <p>Don't have an account?</p>
        <button 
          type="button" 
          className="auth-button secondary"
          onClick={onSwitchToSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;