import React from 'react';

// Mock AuthContext for Storybook
const AuthContext = React.createContext({});

// Mock AuthProvider
export const AuthProvider = ({ children }) => {
  const mockValue = {
    user: { uid: 'mock-user', email: 'mock@example.com', displayName: 'Mock User' },
    loading: false,
    isAuthenticated: () => true,
    hasRole: () => true,
    isAdmin: () => false,
    login: () => Promise.resolve(),
    register: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    updateUserRole: () => Promise.resolve(),
    loginWithGoogle: () => Promise.resolve(),
    loginWithFacebook: () => Promise.resolve(),
  };

  return (
    <AuthContext.Provider value={mockValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock useAuth hook
export const useAuth = () => ({
  user: { uid: 'mock-user', email: 'mock@example.com', displayName: 'Mock User' },
  loading: false,
  isAuthenticated: () => true,
  hasRole: () => true,
  isAdmin: () => false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUserRole: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginWithFacebook: () => Promise.resolve(),
});

export default AuthContext;