import React, { useState, useEffect } from 'react';

// Modal component with overlay and various sizes
const Modal = ({
  isOpen = false,
  onClose,
  size = 'medium',
  title = '',
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  footer = null,
  centered = true,
  ...props
}) => {
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const getSizeStyles = () => {
    const sizes = {
      small: {
        maxWidth: '400px',
        width: '90vw'
      },
      medium: {
        maxWidth: '600px',
        width: '90vw'
      },
      large: {
        maxWidth: '800px',
        width: '90vw'
      },
      fullscreen: {
        width: '100vw',
        height: '100vh',
        maxWidth: 'none',
        maxHeight: 'none',
        margin: '0',
        borderRadius: '0'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: centered ? 'center' : 'flex-start',
    justifyContent: 'center',
    padding: size === 'fullscreen' ? '0' : '20px',
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out'
  };

  const modalStyle = {
    backgroundColor: '#ffffff',
    borderRadius: size === 'fullscreen' ? '0' : '8px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: size === 'fullscreen' ? '100vh' : '90vh',
    position: 'relative',
    animation: 'slideIn 0.3s ease-out',
    ...getSizeStyles()
  };

  const headerStyle = {
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0
  };

  const titleStyle = {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    color: '#6b7280',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px'
  };

  const contentStyle = {
    padding: '20px 24px',
    flex: 1,
    overflow: 'auto'
  };

  const footerStyle = {
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    flexShrink: 0
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose?.();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateY(-20px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
        `}
      </style>
      <div style={overlayStyle} onClick={handleOverlayClick} {...props}>
        <div style={modalStyle}>
          {(title || showCloseButton) && (
            <div style={headerStyle}>
              <h2 style={titleStyle}>{title}</h2>
              {showCloseButton && (
                <button
                  style={closeButtonStyle}
                  onClick={onClose}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#6b7280';
                  }}
                >
                  ×
                </button>
              )}
            </div>
          )}
          <div style={contentStyle}>
            {children}
          </div>
          {footer && <div style={footerStyle}>{footer}</div>}
        </div>
      </div>
    </>
  );
};

// Sample button component for stories
const Button = ({ variant = 'primary', children, ...props }) => {
  const getButtonStyle = () => {
    const styles = {
      primary: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: '1px solid #007bff'
      },
      secondary: {
        backgroundColor: '#6c757d',
        color: '#ffffff',
        border: '1px solid #6c757d'
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#007bff',
        border: '1px solid #007bff'
      }
    };
    
    return {
      ...styles[variant],
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    };
  };

  return <button style={getButtonStyle()} {...props}>{children}</button>;
};

// Modal wrapper component for stories
const ModalExample = ({ children, ...modalProps }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        {...modalProps}
      >
        {children}
      </Modal>
    </div>
  );
};

export default {
  title: 'Core UI Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible modal component with overlay, multiple sizes, and customizable behavior. Supports keyboard navigation and click-outside-to-close.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'fullscreen'],
    },
    centered: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => (
    <ModalExample {...args}>
      <p>This is a basic modal with default settings.</p>
      <p>You can close it by clicking the X button, pressing Escape, or clicking outside the modal.</p>
    </ModalExample>
  ),
  args: {
    title: 'Default Modal',
  },
};

export const WithFooter = {
  render: (args) => (
    <ModalExample 
      {...args}
      footer={
        <div>
          <Button variant="outline" onClick={() => {}}>Cancel</Button>
          <Button onClick={() => {}}>Confirm</Button>
        </div>
      }
    >
      <p>This modal includes a footer with action buttons.</p>
      <p>The footer is useful for confirmation dialogs and forms.</p>
    </ModalExample>
  ),
  args: {
    title: 'Modal with Footer',
  },
};

export const Sizes = () => {
  const [openModal, setOpenModal] = useState('');
  
  const sizes = ['small', 'medium', 'large', 'fullscreen'];
  
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {sizes.map(size => (
        <div key={size}>
          <Button onClick={() => setOpenModal(size)}>
            {size.charAt(0).toUpperCase() + size.slice(1)} Modal
          </Button>
          <Modal
            isOpen={openModal === size}
            onClose={() => setOpenModal('')}
            size={size}
            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
          >
            <p>This is a {size} sized modal.</p>
            <p>Content adapts to the modal size automatically.</p>
            {size === 'fullscreen' && (
              <div>
                <p>Fullscreen modals take up the entire viewport.</p>
                <p>Perfect for complex forms or detailed content.</p>
              </div>
            )}
          </Modal>
        </div>
      ))}
    </div>
  );
};

export const ConfirmationDialog = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button variant="secondary" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="small"
          title="Confirm Deletion"
          footer={
            <div>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => {
                  alert('Item deleted!');
                  setIsOpen(false);
                }}
              >
                Delete
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to delete this item?</p>
          <p style={{ color: '#dc3545', fontSize: '14px' }}>
            This action cannot be undone.
          </p>
        </Modal>
      </div>
    );
  },
};

export const LongContent = {
  render: (args) => (
    <ModalExample {...args}>
      <h3>Long Content Modal</h3>
      <p>This modal demonstrates scrollable content when the content exceeds the modal height.</p>
      {Array.from({ length: 20 }, (_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris.
        </p>
      ))}
      <p><strong>End of content</strong></p>
    </ModalExample>
  ),
  args: {
    title: 'Scrollable Content',
  },
};

export const NoCloseButton = {
  render: (args) => (
    <ModalExample 
      {...args}
      footer={
        <Button onClick={() => {}}>Close Modal</Button>
      }
    >
      <p>This modal has no close button in the header.</p>
      <p>You can still close it using the footer button, Escape key, or clicking outside.</p>
    </ModalExample>
  ),
  args: {
    title: 'Custom Close Behavior',
    showCloseButton: false,
  },
};

export const NonDismissible = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Non-Dismissible Modal"
          closeOnOverlayClick={false}
          closeOnEscape={false}
          showCloseButton={false}
          footer={
            <Button onClick={() => setIsOpen(false)}>
              Close Modal
            </Button>
          }
        >
          <p>This modal can only be closed using the footer button.</p>
          <p>Clicking outside or pressing Escape won't work.</p>
        </Modal>
      </div>
    );
  },
};