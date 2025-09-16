import React, { useState, useEffect } from 'react';

// Progress Bar component
const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'medium',
  variant = 'primary',
  showLabel = false,
  label = '',
  showPercentage = false,
  animated = false,
  striped = false,
  indeterminate = false,
  className = '',
  style = {},
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getSizeStyles = () => {
    const sizes = {
      small: { height: '4px', fontSize: '11px' },
      medium: { height: '8px', fontSize: '12px' },
      large: { height: '12px', fontSize: '14px' },
      xl: { height: '16px', fontSize: '16px' }
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const variants = {
      primary: { backgroundColor: '#3b82f6' },
      success: { backgroundColor: '#10b981' },
      warning: { backgroundColor: '#f59e0b' },
      error: { backgroundColor: '#ef4444' },
      info: { backgroundColor: '#06b6d4' },
      purple: { backgroundColor: '#8b5cf6' },
      pink: { backgroundColor: '#ec4899' }
    };
    return variants[variant] || variants.primary;
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const trackStyle = {
    width: '100%',
    height: sizeStyles.height,
    backgroundColor: '#e5e7eb',
    borderRadius: sizeStyles.height,
    overflow: 'hidden',
    position: 'relative',
    ...style
  };

  const fillStyle = {
    height: '100%',
    width: indeterminate ? '30%' : `${percentage}%`,
    backgroundColor: variantStyles.backgroundColor,
    borderRadius: 'inherit',
    transition: indeterminate ? 'none' : 'width 0.3s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    ...(indeterminate && {
      animation: 'indeterminate 2s infinite linear'
    }),
    ...(striped && {
      backgroundImage: `linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      )`,
      backgroundSize: '1rem 1rem'
    }),
    ...(animated && striped && {
      animation: 'progress-stripes 1s linear infinite'
    })
  };

  const labelContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
    fontSize: sizeStyles.fontSize,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '500',
    color: '#374151'
  };

  return (
    <>
      <style>
        {`
          @keyframes indeterminate {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(333%); }
          }
          @keyframes progress-stripes {
            0% { background-position: 1rem 0; }
            100% { background-position: 0 0; }
          }
        `}
      </style>
      <div className={className}>
        {(showLabel || showPercentage) && (
          <div style={labelContainerStyle}>
            <span>{label}</span>
            {showPercentage && <span>{Math.round(percentage)}%</span>}
          </div>
        )}
        <div style={trackStyle} {...props}>
          <div style={fillStyle} />
        </div>
      </div>
    </>
  );
};

// Circular Progress component
const CircularProgress = ({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = 'primary',
  showLabel = false,
  showPercentage = false,
  label = '',
  indeterminate = false,
  className = '',
  style = {},
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = indeterminate ? 0 : circumference - (percentage / 100) * circumference;

  const getVariantStyles = () => {
    const variants = {
      primary: { stroke: '#3b82f6' },
      success: { stroke: '#10b981' },
      warning: { stroke: '#f59e0b' },
      error: { stroke: '#ef4444' },
      info: { stroke: '#06b6d4' },
      purple: { stroke: '#8b5cf6' },
      pink: { stroke: '#ec4899' }
    };
    return variants[variant] || variants.primary;
  };

  const variantStyles = getVariantStyles();

  const containerStyle = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...style
  };

  const svgStyle = {
    transform: 'rotate(-90deg)',
    width: size,
    height: size
  };

  const trackStyle = {
    fill: 'none',
    stroke: '#e5e7eb',
    strokeWidth
  };

  const progressStyle = {
    fill: 'none',
    stroke: variantStyles.stroke,
    strokeWidth,
    strokeLinecap: 'round',
    strokeDasharray,
    strokeDashoffset,
    transition: indeterminate ? 'none' : 'stroke-dashoffset 0.3s ease-in-out',
    ...(indeterminate && {
      animation: 'circular-rotate 2s linear infinite'
    })
  };

  const labelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: size > 60 ? '14px' : '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center'
  };

  return (
    <>
      <style>
        {`
          @keyframes circular-rotate {
            0% { transform: rotate(-90deg); }
            100% { transform: rotate(270deg); }
          }
        `}
      </style>
      <div style={containerStyle} className={className} {...props}>
        <div style={{ position: 'relative' }}>
          <svg style={svgStyle}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              style={trackStyle}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              style={progressStyle}
            />
          </svg>
          {(showLabel || showPercentage) && (
            <div style={labelStyle}>
              {showPercentage && <div>{Math.round(percentage)}%</div>}
              {showLabel && <div style={{ fontSize: '10px', marginTop: '2px' }}>{label}</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Loading Spinner component
const Spinner = ({
  size = 'medium',
  variant = 'primary',
  type = 'circular',
  className = '',
  style = {},
  ...props
}) => {
  const getSizeStyles = () => {
    const sizes = {
      small: { width: '16px', height: '16px' },
      medium: { width: '24px', height: '24px' },
      large: { width: '32px', height: '32px' },
      xl: { width: '48px', height: '48px' }
    };
    return sizes[size] || sizes.medium;
  };

  const getVariantStyles = () => {
    const variants = {
      primary: { borderColor: '#3b82f6' },
      success: { borderColor: '#10b981' },
      warning: { borderColor: '#f59e0b' },
      error: { borderColor: '#ef4444' },
      info: { borderColor: '#06b6d4' },
      white: { borderColor: '#ffffff' }
    };
    return variants[variant] || variants.primary;
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const getSpinnerStyles = () => {
    if (type === 'dots') {
      return {
        display: 'flex',
        gap: '2px',
        alignItems: 'center',
        justifyContent: 'center'
      };
    }

    if (type === 'pulse') {
      return {
        ...sizeStyles,
        backgroundColor: variantStyles.borderColor,
        borderRadius: '50%',
        animation: 'pulse 1.5s ease-in-out infinite'
      };
    }

    // Default circular spinner
    return {
      ...sizeStyles,
      border: `2px solid ${variantStyles.borderColor}`,
      borderTop: `2px solid transparent`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    };
  };

  const spinnerStyle = {
    ...getSpinnerStyles(),
    ...style
  };

  const dotStyle = {
    width: `${parseInt(sizeStyles.width) / 4}px`,
    height: `${parseInt(sizeStyles.width) / 4}px`,
    backgroundColor: variantStyles.borderColor,
    borderRadius: '50%',
    animation: 'bounce 1.4s ease-in-out infinite both'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>
      <div style={spinnerStyle} className={className} {...props}>
        {type === 'dots' && (
          <>
            <div style={{ ...dotStyle, animationDelay: '-0.32s' }} />
            <div style={{ ...dotStyle, animationDelay: '-0.16s' }} />
            <div style={dotStyle} />
          </>
        )}
      </div>
    </>
  );
};

// Step Progress component
const StepProgress = ({
  steps = [],
  currentStep = 0,
  variant = 'primary',
  size = 'medium',
  showLabels = true,
  direction = 'horizontal',
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    const variants = {
      primary: { 
        active: '#3b82f6', 
        completed: '#10b981', 
        inactive: '#e5e7eb',
        activeText: '#3b82f6',
        completedText: '#10b981',
        inactiveText: '#9ca3af'
      },
      success: { 
        active: '#10b981', 
        completed: '#059669', 
        inactive: '#e5e7eb',
        activeText: '#10b981',
        completedText: '#059669',
        inactiveText: '#9ca3af'
      },
      warning: { 
        active: '#f59e0b', 
        completed: '#d97706', 
        inactive: '#e5e7eb',
        activeText: '#f59e0b',
        completedText: '#d97706',
        inactiveText: '#9ca3af'
      }
    };
    return variants[variant] || variants.primary;
  };

  const getSizeStyles = () => {
    const sizes = {
      small: { 
        stepSize: '24px', 
        fontSize: '11px', 
        lineHeight: '2px',
        labelMargin: '8px'
      },
      medium: { 
        stepSize: '32px', 
        fontSize: '12px', 
        lineHeight: '2px',
        labelMargin: '12px'
      },
      large: { 
        stepSize: '40px', 
        fontSize: '14px', 
        lineHeight: '3px',
        labelMargin: '16px'
      }
    };
    return sizes[size] || sizes.medium;
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const containerStyle = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: direction === 'vertical' ? 'flex-start' : 'center',
    gap: direction === 'vertical' ? '16px' : '0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    ...style
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'inactive';
  };

  const getStepStyles = (status) => {
    const colors = {
      completed: variantStyles.completed,
      active: variantStyles.active,
      inactive: variantStyles.inactive
    };

    return {
      width: sizeStyles.stepSize,
      height: sizeStyles.stepSize,
      borderRadius: '50%',
      backgroundColor: colors[status],
      color: status === 'inactive' ? '#9ca3af' : '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: sizeStyles.fontSize,
      fontWeight: '600',
      position: 'relative',
      zIndex: 1
    };
  };

  const getConnectorStyles = (index) => {
    const isCompleted = index < currentStep;
    const isActive = index === currentStep - 1;
    
    return {
      flex: 1,
      height: sizeStyles.lineHeight,
      backgroundColor: isCompleted || isActive ? variantStyles.completed : variantStyles.inactive,
      margin: direction === 'vertical' ? `0 ${parseInt(sizeStyles.stepSize) / 2 - 1}px` : '0 8px',
      transition: 'background-color 0.3s ease'
    };
  };

  const getLabelStyles = (status) => {
    const colors = {
      completed: variantStyles.completedText,
      active: variantStyles.activeText,
      inactive: variantStyles.inactiveText
    };

    return {
      color: colors[status],
      fontSize: sizeStyles.fontSize,
      fontWeight: status === 'active' ? '600' : '500',
      marginTop: direction === 'vertical' ? '0' : sizeStyles.labelMargin,
      marginLeft: direction === 'vertical' ? sizeStyles.labelMargin : '0',
      textAlign: direction === 'vertical' ? 'left' : 'center'
    };
  };

  return (
    <div style={containerStyle} className={className} {...props}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: direction === 'vertical' ? 'row' : 'column',
              alignItems: direction === 'vertical' ? 'center' : 'center',
              flex: direction === 'vertical' ? 'none' : '1',
              position: 'relative'
            }}
          >
            <div style={getStepStyles(status)}>
              {status === 'completed' ? '✓' : index + 1}
            </div>
            
            {showLabels && (
              <div style={getLabelStyles(status)}>
                {typeof step === 'string' ? step : step.label || `Step ${index + 1}`}
              </div>
            )}

            {!isLast && (
              <div style={getConnectorStyles(index)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default {
  title: 'Core UI Components/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress components for showing loading states, completion status, and step-by-step processes. Includes progress bars, circular progress, spinners, and step indicators.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'error', 'info', 'purple', 'pink'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xl'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    showLabel: { control: 'boolean' },
    showPercentage: { control: 'boolean' },
    animated: { control: 'boolean' },
    striped: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    value: 60,
    showPercentage: true,
  },
};

export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ProgressBar variant="primary" value={75} showPercentage label="Primary" />
    <ProgressBar variant="success" value={60} showPercentage label="Success" />
    <ProgressBar variant="warning" value={45} showPercentage label="Warning" />
    <ProgressBar variant="error" value={30} showPercentage label="Error" />
    <ProgressBar variant="info" value={85} showPercentage label="Info" />
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ProgressBar size="small" value={60} showPercentage label="Small" />
    <ProgressBar size="medium" value={60} showPercentage label="Medium" />
    <ProgressBar size="large" value={60} showPercentage label="Large" />
    <ProgressBar size="xl" value={60} showPercentage label="Extra Large" />
  </div>
);

export const StripedAndAnimated = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ProgressBar value={70} striped showPercentage label="Striped" />
    <ProgressBar value={70} striped animated showPercentage label="Striped + Animated" />
    <ProgressBar value={50} animated showPercentage label="Animated" />
  </div>
);

export const Indeterminate = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
    <ProgressBar indeterminate label="Loading..." />
    <ProgressBar variant="success" indeterminate label="Processing..." />
    <ProgressBar variant="warning" indeterminate size="large" label="Uploading..." />
  </div>
);

export const CircularProgressExamples = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
    <CircularProgress value={75} showPercentage />
    <CircularProgress value={60} variant="success" showPercentage />
    <CircularProgress value={45} variant="warning" size={60} showPercentage />
    <CircularProgress value={30} variant="error" size={100} showPercentage showLabel label="Storage" />
    <CircularProgress indeterminate variant="primary" size={48} />
  </div>
);

export const SpinnerExamples = () => (
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
    <Spinner size="small" />
    <Spinner size="medium" variant="success" />
    <Spinner size="large" variant="warning" />
    <Spinner size="xl" variant="error" />
    <Spinner type="dots" variant="primary" />
    <Spinner type="pulse" variant="info" />
  </div>
);

export const StepProgressExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <StepProgress
      steps={['Order Placed', 'Processing', 'Shipped', 'Delivered']}
      currentStep={2}
      variant="primary"
    />
    
    <StepProgress
      steps={['Account Setup', 'Profile Info', 'Verification', 'Complete']}
      currentStep={1}
      variant="success"
      size="large"
    />
    
    <div style={{ height: '200px' }}>
      <StepProgress
        steps={['Start', 'Step 2', 'Step 3', 'Finish']}
        currentStep={2}
        variant="warning"
        direction="vertical"
      />
    </div>
  </div>
);

export const DashboardExample = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const startProgress = () => {
    setIsLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsLoading(false);
  };

  return (
    <div style={{ 
      width: '400px', 
      padding: '24px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
        Upload Dashboard
      </h3>
      
      <div style={{ marginBottom: '20px' }}>
        <ProgressBar
          value={progress}
          variant={progress === 100 ? 'success' : 'primary'}
          showPercentage
          label="File Upload Progress"
          animated={isLoading}
          striped={isLoading}
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={startProgress}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#d1d5db' : '#007bff',
            color: '#ffffff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Spinner size="small" variant="white" />
              Uploading...
            </div>
          ) : (
            'Start Upload'
          )}
        </button>
        
        <button
          onClick={resetProgress}
          style={{
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress
            value={progress}
            variant={progress === 100 ? 'success' : 'info'}
            size={60}
            showPercentage
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
            Completion
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <CircularProgress
            value={Math.min(progress * 1.2, 100)}
            variant="warning"
            size={60}
            showPercentage
            label="Speed"
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
            Processing
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    }}>
      <Spinner size="medium" />
      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Loading data...
      </span>
    </div>

    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px',
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    }}>
      <Spinner type="dots" variant="success" />
      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Saving changes...
      </span>
    </div>

    <div style={{ 
      padding: '16px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    }}>
      <div style={{ marginBottom: '12px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        Downloading file...
      </div>
      <ProgressBar value={65} variant="info" showPercentage animated striped />
    </div>
  </div>
);

// Export additional components
export { CircularProgress, Spinner, StepProgress };