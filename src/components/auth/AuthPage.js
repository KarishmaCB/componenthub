import React, { useState, useCallback, useRef, useEffect } from 'react';
import ComponentHubLogo from '../ComponentHubLogo';
import { useAuth } from '../../context/AuthContext';
import './AuthForms.css';
import './AuthEnhancements.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);

  const { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithFacebook, loginWithLinkedIn, loading } = useAuth();

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const switchToSignup = useCallback(() => {
    if (isAnimating) return; // Prevent clicks during animation
    
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setIsAnimating(true);
    setIsLogin(false);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
    
    // Reset animation state after transition completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationTimeoutRef.current = null;
    }, 1500); // Match the CSS transition duration
  }, [isAnimating]);
  
  const switchToLogin = useCallback(() => {
    if (isAnimating) return; // Prevent clicks during animation
    
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setIsAnimating(true);
    setIsLogin(true);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
    
    // Reset animation state after transition completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationTimeoutRef.current = null;
    }, 1500); // Match the CSS transition duration
  }, [isAnimating]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      let result;
      
      if (isLogin) {
        result = await loginWithEmail(formData.email, formData.password);
      } else {
        result = await signupWithEmail(formData.email, formData.password, formData.name);
      }

      if (!result.success) {
        setErrors({ submit: result.error });
      }
      // If successful, AuthContext will handle the redirect via the auth state change
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrors({});
    
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Google login failed. Please try again.' });
    }
  };

  const handleFacebookLogin = async () => {
    setErrors({});
    
    try {
      const result = await loginWithFacebook();
      if (!result.success) {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Facebook login failed. Please try again.' });
    }
  };

  const handleLinkedInLogin = async () => {
    setErrors({});
    
    try {
      const result = await loginWithLinkedIn();
      if (!result.success) {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'LinkedIn login failed. Please try again.' });
    }
  };

  return (
    <div className="auth-main-container" style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#f5f5f5',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Form Container - Slides based on button hover */}
      <div className="auth-form-container" style={{
        position: 'absolute',
        top: '0',
        left: isLogin ? '0' : '50%',
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        transition: 'left 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 10,
        padding: '40px',
        boxShadow: '0 0 50px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div className="auth-logo" style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <ComponentHubLogo size="32px" />
          <span style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#333'
          }}>
            ComponentHub
          </span>
        </div>


        <div style={{ 
          maxWidth: '400px', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h1 className="auth-title" style={{
            fontSize: '28px',
            fontWeight: '300',
            color: '#4a9b8e',
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            {isLogin ? 'Sign in to ComponentHub' : 'Join ComponentHub'}
          </h1>

          {/* Error Message */}
          {errors.submit && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '25px',
              fontSize: '14px',
              textAlign: 'center',
              border: '1px solid #ffcdd2'
            }}>
              {errors.submit}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="social-buttons" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '30px'
          }}>
            <button 
              type="button"
              onClick={handleFacebookLogin}
              disabled={loading || isSubmitting}
              className="social-button"
              style={{
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                background: '#1877f2',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '500',
                opacity: loading || isSubmitting ? 0.7 : 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = '#166fe5';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(24,119,242,0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = '#1877f2';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || isSubmitting}
              className="social-button"
              style={{
                width: '100%',
                padding: '12px 20px',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                background: 'white',
                color: '#3c4043',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '500',
                opacity: loading || isSubmitting ? 0.7 : 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = '#f8f9fa';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = 'white';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            <button 
              type="button"
              onClick={handleLinkedInLogin}
              disabled={loading || isSubmitting}
              className="social-button"
              style={{
                width: '100%',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                background: '#0077b5',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '500',
                opacity: loading || isSubmitting ? 0.7 : 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = '#005885';
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,119,181,0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading && !isSubmitting) {
                  e.target.style.background = '#0077b5';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            margin: '30px 0',
            color: '#666',
            fontSize: '14px'
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to right, transparent, #e0e0e0, transparent)'
            }}></div>
            <span style={{
              padding: '0 20px',
              background: 'white',
              color: '#666'
            }}>or continue with email</span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(to left, transparent, #e0e0e0, transparent)'
            }}></div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            {isLogin ? (
              <div>
                <div style={{ marginBottom: '25px' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 25px',
                      border: errors.email ? '2px solid #c62828' : '1px solid #e0e0e0',
                      borderRadius: '30px',
                      fontSize: '16px',
                      outline: 'none',
                      background: loading || isSubmitting ? '#f5f5f5' : '#f9f9f9',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      cursor: loading || isSubmitting ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                      if (!errors.email && !loading && !isSubmitting) {
                        e.target.style.border = '2px solid #4a9b8e';
                        e.target.style.background = 'white';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email && !loading && !isSubmitting) {
                        e.target.style.border = '1px solid #e0e0e0';
                        e.target.style.background = '#f9f9f9';
                      }
                    }}
                  />
                  {errors.email && (
                    <div style={{
                      color: '#c62828',
                      fontSize: '14px',
                      marginTop: '8px',
                      marginLeft: '20px'
                    }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 25px',
                      border: errors.password ? '2px solid #c62828' : '1px solid #e0e0e0',
                      borderRadius: '30px',
                      fontSize: '16px',
                      outline: 'none',
                      background: loading || isSubmitting ? '#f5f5f5' : '#f9f9f9',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      cursor: loading || isSubmitting ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                      if (!errors.password && !loading && !isSubmitting) {
                        e.target.style.border = '2px solid #4a9b8e';
                        e.target.style.background = 'white';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.password && !loading && !isSubmitting) {
                        e.target.style.border = '1px solid #e0e0e0';
                        e.target.style.background = '#f9f9f9';
                      }
                    }}
                  />
                  {errors.password && (
                    <div style={{
                      color: '#c62828',
                      fontSize: '14px',
                      marginTop: '8px',
                      marginLeft: '20px'
                    }}>
                      {errors.password}
                    </div>
                  )}
                </div>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '35px'
                }}>
                  <button type="button" style={{
                    color: '#999',
                    textDecoration: 'none',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Forgot your password?
                  </button>
                </div>
                <button 
                  type="submit"
                  disabled={loading || isSubmitting}
                  style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: loading || isSubmitting ? '#9e9e9e' : '#4a9b8e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  opacity: loading || isSubmitting ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading && !isSubmitting) {
                    e.target.style.background = '#3d8b7d';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && !isSubmitting) {
                    e.target.style.background = '#4a9b8e';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '25px' }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 25px',
                      border: errors.name ? '2px solid #c62828' : '1px solid #e0e0e0',
                      borderRadius: '30px',
                      fontSize: '16px',
                      outline: 'none',
                      background: loading || isSubmitting ? '#f5f5f5' : '#f9f9f9',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      cursor: loading || isSubmitting ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                      if (!errors.name && !loading && !isSubmitting) {
                        e.target.style.border = '2px solid #4a9b8e';
                        e.target.style.background = 'white';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.name && !loading && !isSubmitting) {
                        e.target.style.border = '1px solid #e0e0e0';
                        e.target.style.background = '#f9f9f9';
                      }
                    }}
                  />
                  {errors.name && (
                    <div style={{
                      color: '#c62828',
                      fontSize: '14px',
                      marginTop: '8px',
                      marginLeft: '20px'
                    }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 25px',
                      border: errors.email ? '2px solid #c62828' : '1px solid #e0e0e0',
                      borderRadius: '30px',
                      fontSize: '16px',
                      outline: 'none',
                      background: loading || isSubmitting ? '#f5f5f5' : '#f9f9f9',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      cursor: loading || isSubmitting ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                      if (!errors.email && !loading && !isSubmitting) {
                        e.target.style.border = '2px solid #4a9b8e';
                        e.target.style.background = 'white';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email && !loading && !isSubmitting) {
                        e.target.style.border = '1px solid #e0e0e0';
                        e.target.style.background = '#f9f9f9';
                      }
                    }}
                  />
                  {errors.email && (
                    <div style={{
                      color: '#c62828',
                      fontSize: '14px',
                      marginTop: '8px',
                      marginLeft: '20px'
                    }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: '35px' }}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    style={{
                      width: '100%',
                      padding: '18px 25px',
                      border: errors.password ? '2px solid #c62828' : '1px solid #e0e0e0',
                      borderRadius: '30px',
                      fontSize: '16px',
                      outline: 'none',
                      background: loading || isSubmitting ? '#f5f5f5' : '#f9f9f9',
                      boxSizing: 'border-box',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                      cursor: loading || isSubmitting ? 'not-allowed' : 'text'
                    }}
                    onFocus={(e) => {
                      if (!errors.password && !loading && !isSubmitting) {
                        e.target.style.border = '2px solid #4a9b8e';
                        e.target.style.background = 'white';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.password && !loading && !isSubmitting) {
                        e.target.style.border = '1px solid #e0e0e0';
                        e.target.style.background = '#f9f9f9';
                      }
                    }}
                  />
                  {errors.password && (
                    <div style={{
                      color: '#c62828',
                      fontSize: '14px',
                      marginTop: '8px',
                      marginLeft: '20px'
                    }}>
                      {errors.password}
                    </div>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={loading || isSubmitting}
                  style={{
                  width: '100%',
                  padding: '18px 20px',
                  background: loading || isSubmitting ? '#9e9e9e' : '#4a9b8e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading || isSubmitting ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  opacity: loading || isSubmitting ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading && !isSubmitting) {
                    e.target.style.background = '#3d8b7d';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && !isSubmitting) {
                    e.target.style.background = '#4a9b8e';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Background Panels - Fixed positions */}
      
      {/* Dynamic Panels Based on Current Form State */}
      
      {/* Left Panel - Shows opposite of current form */}
      <div className="auth-side-panel" style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '50%',
        height: '100%',
        background: !isLogin ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #4a9b8e 0%, #5fb3a3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 1
      }}>
        {/* Decorative shapes */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: '50px',
          height: '50px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          transform: 'rotate(45deg)'
        }} />
        
        <div style={{
          textAlign: 'center',
          maxWidth: '350px',
          padding: '0 20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            marginBottom: '20px',
            lineHeight: '1.2',
            textAlign: 'center',
            width: '100%',
            margin: '0 auto 20px auto'
          }}>
            {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '40px',
            opacity: '0.9',
            textAlign: 'center',
            width: '100%',
            margin: '0 auto 40px auto'
          }}>
            {isLogin ? 'Enter your personal details and start journey with us' : 'To keep connected with us please login with your personal info'}
          </p>
          <button
            onClick={isAnimating ? null : (isLogin ? switchToSignup : switchToLogin)}
            disabled={isAnimating}
            style={{
              padding: '12px 40px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isAnimating ? 0.6 : 1
            }}
            onMouseOver={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'white';
                e.target.style.color = isLogin ? '#4a9b8e' : '#ee5a24';
              }
            }}
            onMouseOut={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>

      {/* Right Panel - Shows opposite of current form */}
      <div className="auth-side-panel" style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '50%',
        height: '100%',
        background: !isLogin ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' : 'linear-gradient(135deg, #4a9b8e 0%, #5fb3a3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 1
      }}>
        {/* Decorative shapes */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '15%',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '10%',
          width: '40px',
          height: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          transform: 'rotate(30deg)'
        }} />
        
        <div style={{
          textAlign: 'center',
          maxWidth: '350px',
          padding: '0 20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            marginBottom: '20px',
            lineHeight: '1.2',
            textAlign: 'center',
            width: '100%',
            margin: '0 auto 20px auto'
          }}>
            {isLogin ? 'Hello, Friend!' : 'Welcome Back!'}
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '40px',
            opacity: '0.9',
            textAlign: 'center',
            width: '100%',
            margin: '0 auto 40px auto'
          }}>
            {isLogin ? 'Enter your personal details and start journey with us' : 'To keep connected with us please login with your personal info'}
          </p>
          <button
            onClick={isAnimating ? null : (isLogin ? switchToSignup : switchToLogin)}
            disabled={isAnimating}
            style={{
              padding: '12px 40px',
              border: '2px solid white',
              background: 'transparent',
              color: 'white',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isAnimating ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isAnimating ? 0.6 : 1
            }}
            onMouseOver={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'white';
                e.target.style.color = isLogin ? '#4a9b8e' : '#ee5a24';
              }
            }}
            onMouseOut={(e) => {
              if (!isAnimating) {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;