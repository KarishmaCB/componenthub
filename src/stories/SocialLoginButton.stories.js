import SocialLoginButton from '../components/SocialLoginButton';

export default {
  title: 'ComponentHub/Authentication/SocialLoginButton',
  component: SocialLoginButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Social login buttons with platform-specific styling and smooth animations. Used in authentication flows for Google, Facebook, and LinkedIn OAuth integration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    provider: {
      control: { type: 'select' },
      options: ['google', 'facebook', 'linkedin'],
      description: 'OAuth provider platform',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading state with spinner animation',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables button interaction',
    },
    onClick: { action: 'clicked' },
  },
};

// Default story
export const Default = {
  args: {
    provider: 'google',
    loading: false,
    disabled: false,
  },
};

export const Google = {
  args: {
    provider: 'google',
    loading: false,
    disabled: false,
  },
};

export const Facebook = {
  args: {
    provider: 'facebook',
    loading: false,
    disabled: false,
  },
};

export const LinkedIn = {
  args: {
    provider: 'linkedin',
    loading: false,
    disabled: false,
  },
};

export const LoadingState = {
  args: {
    provider: 'google',
    loading: true,
    disabled: false,
  },
};

export const DisabledState = {
  args: {
    provider: 'facebook',
    loading: false,
    disabled: true,
  },
};

export const AllProviders = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <SocialLoginButton provider="google" />
      <SocialLoginButton provider="facebook" />
      <SocialLoginButton provider="linkedin" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three social login providers displayed together as they would appear in the authentication form.',
      },
    },
  },
};