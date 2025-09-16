import React, { useState, useCallback, useRef, useEffect } from 'react';
import ComponentHubLogo from '../ComponentHubLogo';
import { useAuth } from '../../context/AuthContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

const AuthPageNew = () => {
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
    if (isAnimating) return;
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setIsAnimating(true);
    setIsLogin(false);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationTimeoutRef.current = null;
    }, 1500);
  }, [isAnimating]);
  
  const switchToLogin = useCallback(() => {
    if (isAnimating) return;
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setIsAnimating(true);
    setIsLogin(true);
    setErrors({});
    setFormData({ email: '', password: '', name: '' });
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      animationTimeoutRef.current = null;
    }, 1500);
  }, [isAnimating]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '60px',
        height: '60px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        transform: 'rotate(45deg)',
        animation: 'float 4s ease-in-out infinite reverse'
      }} />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Main Card Container */}
      <div style={{
        display: 'flex',
        maxWidth: '900px',
        width: '100%',
        height: '600px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        {/* Form Card - Slides based on login state */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: isLogin ? '0' : '50%',
          width: '50%',
          height: '100%',
          transition: 'left 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          zIndex: 10
        }}>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '0',
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: isLogin ? '20px' : '0',
              borderTopRightRadius: isLogin ? '0' : '20px',
              borderBottomRightRadius: isLogin ? '0' : '20px'
            }}
            padding="large"
          >
            {/* Logo */}
            <div style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ComponentHubLogo size="32px" />
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151'
              }}>
                ComponentHub
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              padding: '0 40px'
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>

              {/* Error Alert */}
              {errors.submit && (
                <div style={{ width: '100%', marginBottom: '20px' }}>
                  <Alert variant="error" closable onClose={() => setErrors({})}>
                    {errors.submit}
                  </Alert>
                </div>
              )}

              {/* Social Login Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                marginBottom: '24px'
              }}>
                <Button
                  variant="social"
                  fullWidth
                  onClick={handleFacebookLogin}
                  disabled={loading || isSubmitting}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877f2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  }
                >
                  Continue with Facebook
                </Button>
                
                <Button
                  variant="social"
                  fullWidth
                  onClick={handleGoogleLogin}
                  disabled={loading || isSubmitting}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  }
                >
                  Continue with Google
                </Button>
                
                <Button
                  variant="social"
                  fullWidth
                  onClick={handleLinkedInLogin}
                  disabled={loading || isSubmitting}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077b5">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  }
                >
                  Continue with LinkedIn
                </Button>
              </div>

              {/* Divider */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                margin: '20px 0',
                color: '#6b7280',
                fontSize: '14px'
              }}>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: '#e5e7eb'
                }}></div>
                <span style={{ padding: '0 16px' }}>or</span>
                <div style={{
                  flex: 1,
                  height: '1px',
                  background: '#e5e7eb'
                }}></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                {!isLogin && (
                  <div style={{ marginBottom: '16px' }}>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading || isSubmitting}
                      fullWidth
                      error={!!errors.name}
                      errorMessage={errors.name}
                      required
                    />
                  </div>
                )}
                
                <div style={{ marginBottom: '16px' }}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    fullWidth
                    error={!!errors.email}
                    errorMessage={errors.email}
                    required
                  />
                </div>
                
                <div style={{ marginBottom: isLogin ? '16px' : '24px' }}>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={loading || isSubmitting}
                    fullWidth
                    error={!!errors.password}
                    errorMessage={errors.password}
                    required
                  />
                </div>

                {isLogin && (
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <Button variant="link" size="small">
                      Forgot your password?
                    </Button>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading || isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Side Panel - Shows opposite of current form */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: isLogin ? '50%' : '0',
          width: '50%',
          height: '100%',
          background: isLogin 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 1,
          borderRadius: '0',
          borderTopRightRadius: isLogin ? '20px' : '0',
          borderBottomRightRadius: isLogin ? '20px' : '0',
          borderTopLeftRadius: isLogin ? '0' : '20px',
          borderBottomLeftRadius: isLogin ? '0' : '20px',
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '300px',
            padding: '0 20px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '300',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              {isLogin ? 'New Here?' : 'Already Have Account?'}
            </h2>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '30px',
              opacity: '0.9'
            }}>
              {isLogin 
                ? 'Join ComponentHub and start building amazing user interfaces with our component library.' 
                : 'Sign in to access your ComponentHub dashboard and continue building.'
              }
            </p>
            <Button
              variant="outline"
              onClick={isAnimating ? null : (isLogin ? switchToSignup : switchToLogin)}
              disabled={isAnimating}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid white',
                color: 'white'
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageNew;