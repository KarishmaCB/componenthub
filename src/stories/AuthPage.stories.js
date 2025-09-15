import { AuthPage } from '../components/auth/AuthPage';
import { AuthProvider } from '../context/AuthContext';

export default {
  title: 'ComponentHub/Authentication/AuthPage',
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete authentication page with login/signup forms, social OAuth buttons, and responsive design. Features smooth animations and form switching.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <AuthProvider>
        <div style={{ height: '100vh', backgroundColor: '#f8fafc' }}>
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
};

export const LoginForm = {
  parameters: {
    docs: {
      description: {
        story: 'Default login form with social OAuth options and email/password fields.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile-responsive view with stacked layout and hidden side panel.',
      },
    },
  },
};

export const TabletView = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view with optimized spacing and layout adjustments.',
      },
    },
  },
};

export const DarkBackground = {
  decorators: [
    (Story) => (
      <AuthProvider>
        <div style={{ height: '100vh', backgroundColor: '#1a202c' }}>
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Authentication page on a dark background to test contrast and visibility.',
      },
    },
  },
};

export const WithCustomBranding = {
  decorators: [
    (Story) => (
      <AuthProvider>
        <div style={{ height: '100vh', backgroundColor: '#f0f9ff' }}>
          <Story />
        </div>
      </AuthProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Authentication page with custom background color for brand integration.',
      },
    },
  },
};