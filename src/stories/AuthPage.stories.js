// Mock AuthPage component for Storybook
const MockAuthPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
    }}>
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '3rem', 
          borderRadius: '12px', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: '#1f2937'
          }}>
            Welcome to ComponentHub
          </h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 16px',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '12px'
            }}>
              Continue with Google
            </button>
            
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 16px',
              backgroundColor: '#1877f2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginBottom: '12px'
            }}>
              Continue with Facebook
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            <span style={{ 
              padding: '0 1rem', 
              fontSize: '0.875rem', 
              color: '#6b7280' 
            }}>
              or
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
          </div>
          
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <input 
                type="email" 
                placeholder="Email address"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <input 
                type="password" 
                placeholder="Password"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </form>
          
          <p style={{ 
            textAlign: 'center', 
            marginTop: '1.5rem', 
            fontSize: '0.875rem', 
            color: '#6b7280' 
          }}>
            Don't have an account? 
            <a href="#" style={{ 
              color: '#4f46e5', 
              textDecoration: 'none', 
              marginLeft: '4px' 
            }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'ComponentHub/Authentication/AuthPage',
  component: MockAuthPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete authentication page with login/signup forms, social OAuth buttons, and responsive design. Features smooth animations and form switching.',
      },
    },
  },
  tags: ['autodocs'],
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
      <div style={{ height: '100vh', backgroundColor: '#1a202c' }}>
        <Story />
      </div>
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
      <div style={{ height: '100vh', backgroundColor: '#f0f9ff' }}>
        <Story />
      </div>
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