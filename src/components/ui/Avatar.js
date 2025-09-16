import React, { useState } from 'react';

const Avatar = ({
  src = null,
  alt = '',
  name = '',
  size = 'medium',
  shape = 'circle',
  variant = 'default',
  showBorder = false,
  borderColor = '#ffffff',
  fallbackIcon = null,
  onClick = null,
  className = '',
  style = {},
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const getSizeStyles = () => {
    const sizes = {
      xs: { width: '20px', height: '20px', fontSize: '8px' },
      small: { width: '32px', height: '32px', fontSize: '12px' },
      medium: { width: '40px', height: '40px', fontSize: '14px' },
      large: { width: '48px', height: '48px', fontSize: '16px' },
      xl: { width: '64px', height: '64px', fontSize: '20px' }
    };
    return sizes[size] || sizes.medium;
  };

  const getShapeStyles = () => {
    const shapes = {
      circle: { borderRadius: '50%' },
      rounded: { borderRadius: '8px' },
      square: { borderRadius: '4px' }
    };
    return shapes[shape] || shapes.circle;
  };

  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: '#e5e7eb',
        color: '#6b7280'
      },
      primary: {
        backgroundColor: '#dbeafe',
        color: '#1e40af'
      },
      success: {
        backgroundColor: '#dcfce7',
        color: '#166534'
      }
    };
    return variants[variant] || variants.default;
  };

  const generateInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const sizeStyles = getSizeStyles();
  const shapeStyles = getShapeStyles();
  const variantStyles = getVariantStyles();

  const avatarStyle = {
    ...sizeStyles,
    ...shapeStyles,
    ...variantStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    position: 'relative',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out',
    border: showBorder ? `2px solid ${borderColor}` : 'none',
    userSelect: 'none',
    ...style
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: imageError ? 'none' : 'block'
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || name}
          style={imageStyle}
          onError={handleImageError}
        />
      );
    }

    if (fallbackIcon) {
      return <span style={{ fontSize: sizeStyles.fontSize }}>{fallbackIcon}</span>;
    }

    if (name) {
      return <span style={{ fontSize: sizeStyles.fontSize }}>{generateInitials(name)}</span>;
    }

    return <span style={{ fontSize: sizeStyles.fontSize }}>👤</span>;
  };

  return (
    <div
      style={avatarStyle}
      className={className}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </div>
  );
};

export default Avatar;