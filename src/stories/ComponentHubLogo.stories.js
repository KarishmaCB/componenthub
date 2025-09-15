import { ComponentHubLogo } from '../components/ComponentHubLogo';

export default {
  title: 'ComponentHub/Brand/Logo',
  component: ComponentHubLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The ComponentHub brand logo with customizable size and styling options. Used throughout the application for brand identity.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 20, max: 200, step: 10 },
      description: 'Logo size in pixels',
    },
    color: {
      control: 'color',
      description: 'Logo primary color',
    },
    animated: {
      control: 'boolean',
      description: 'Enable hover animation effects',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'dark'],
      description: 'Logo style variant',
    },
  },
};

export const Default = {
  args: {
    size: 60,
    color: '#4a9b8e',
    animated: true,
    variant: 'default',
  },
};

export const Large = {
  args: {
    size: 120,
    color: '#4a9b8e',
    animated: true,
    variant: 'default',
  },
};

export const Small = {
  args: {
    size: 32,
    color: '#4a9b8e',
    animated: false,
    variant: 'minimal',
  },
};

export const DarkVariant = {
  args: {
    size: 80,
    color: '#2d5a52',
    animated: true,
    variant: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const CustomColor = {
  args: {
    size: 80,
    color: '#6366f1',
    animated: true,
    variant: 'default',
  },
};

export const SizeComparison = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <ComponentHubLogo size={32} />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>32px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ComponentHubLogo size={48} />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>48px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ComponentHubLogo size={64} />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>64px</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <ComponentHubLogo size={96} />
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>96px</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different logo sizes for various use cases like navigation bars, headers, and brand displays.',
      },
    },
  },
};