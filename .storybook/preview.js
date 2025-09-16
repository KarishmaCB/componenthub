import React from 'react';

// Create a mock useAuth hook
const mockUseAuth = () => ({
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

// Mock the AuthContext module
const MockAuthProvider = ({ children }) => children;

// Global mock for useAuth
window.mockUseAuth = mockUseAuth;

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MockAuthProvider>
        <Story />
      </MockAuthProvider>
    ),
  ],
};

export default preview;