import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import Alert from './ui/Alert';

// Import actual component examples for preview
const ComponentShowcase = () => {
  const { isAdmin } = useAuth();
  const [selectedComponent, setSelectedComponent] = useState('button');
  

  const components = {
    button: {
      name: 'Button',
      description: 'Interactive buttons with multiple variants and states',
      category: 'Actions'
    },
    input: {
      name: 'Input',
      description: 'Form inputs with validation and different states',
      category: 'Forms'
    },
    card: {
      name: 'Card',
      description: 'Content containers with headers and footers',
      category: 'Layout'
    },
    alert: {
      name: 'Alert',
      description: 'System notifications and feedback messages',
      category: 'Feedback'
    }
  };

  const renderComponentPreview = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon="⭐">With Icon</Button>
            </div>
          </div>
        );
      
      case 'input':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <Input 
              placeholder="Default input"
              fullWidth
            />
            <Input 
              placeholder="Input with label"
              label="Email Address"
              fullWidth
            />
            <Input 
              placeholder="Error state"
              error
              errorMessage="This field is required"
              fullWidth
            />
            <Input 
              placeholder="Success state"
              success
              successMessage="Looks good!"
              fullWidth
            />
            <Input 
              placeholder="With left icon"
              leftIcon="🔍"
              fullWidth
            />
          </div>
        );
      
      case 'card':
        return (
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Card style={{ width: '200px' }}>
              <h4 style={{ margin: '0 0 8px 0' }}>Simple Card</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                Basic card with content
              </p>
            </Card>
            <Card 
              header="Card with Header"
              style={{ width: '200px' }}
            >
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                Card content with header
              </p>
            </Card>
            <Card 
              header="Full Card"
              footer={<Button size="small">Action</Button>}
              style={{ width: '200px' }}
            >
              <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                Complete card with header and footer
              </p>
            </Card>
          </div>
        );
      
      case 'alert':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Alert variant="info" title="Information">
              This is an informational alert message.
            </Alert>
            <Alert variant="success" title="Success">
              Operation completed successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review your settings.
            </Alert>
            <Alert variant="error" title="Error">
              Something went wrong.
            </Alert>
          </div>
        );
      
      default:
        return <div>Select a component to preview</div>;
    }
  };

  const openInStorybook = (component) => {
    if (isAdmin()) {
      window.location.href = `/storybook/?path=/story/core-ui-components-${component}--default`;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0
        }}>
          Component Showcase
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: '4px 0 0 0'
        }}>
          Explore and interact with ComponentHub components
        </p>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '280px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Components
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(components).map(([key, component]) => (
              <button
                key={key}
                onClick={() => setSelectedComponent(key)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: selectedComponent === key ? '#eff6ff' : 'transparent',
                  border: selectedComponent === key ? '1px solid #dbeafe' : '1px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedComponent !== key) {
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedComponent !== key) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: selectedComponent === key ? '#1e40af' : '#1f2937',
                  marginBottom: '2px'
                }}>
                  {component.name}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {component.category}
                </div>
              </button>
            ))}
          </div>

          {isAdmin() && (
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => window.location.href = '/storybook'}
              >
                Open Full Storybook
              </Button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px' }}>
          <Card>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {components[selectedComponent]?.name}
                  </h2>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {components[selectedComponent]?.description}
                  </p>
                </div>
                
                {isAdmin() && (
                  <Button 
                    variant="outline" 
                    size="small"
                    onClick={() => openInStorybook(selectedComponent)}
                  >
                    Edit in Storybook
                  </Button>
                )}
              </div>

              {!isAdmin() && (
                <Alert variant="info" size="small">
                  You're viewing components in read-only mode. Contact an admin for editing access.
                </Alert>
              )}
            </div>

            {/* Component Preview */}
            <div style={{
              padding: '24px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 16px 0'
              }}>
                Preview
              </h4>
              
              {renderComponentPreview()}
            </div>

            {/* Usage Example */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 12px 0'
              }}>
                Usage Example
              </h4>
              
              <div style={{
                padding: '16px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                fontFamily: 'Monaco, Consolas, monospace',
                fontSize: '13px',
                color: '#e5e7eb',
                overflow: 'auto'
              }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{selectedComponent === 'button' && `import Button from './ui/Button';

<Button variant="primary" size="medium">
  Click Me
</Button>`}

{selectedComponent === 'input' && `import Input from './ui/Input';

<Input
  label="Email"
  placeholder="Enter your email"
  fullWidth
/>`}

{selectedComponent === 'card' && `import Card from './ui/Card';

<Card header="Card Title">
  Your content here
</Card>`}

{selectedComponent === 'alert' && `import Alert from './ui/Alert';

<Alert variant="success" title="Success">
  Operation completed!
</Alert>`}
                </pre>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;