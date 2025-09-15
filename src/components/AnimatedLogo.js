import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size || '120px'};
  height: ${props => props.size || '120px'};
  position: relative;
  cursor: pointer;
`;

const OuterRing = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20%;
  background: linear-gradient(145deg, #f0f0f0, #d0d0d0);
  box-shadow: 
    inset 5px 5px 10px rgba(0, 0, 0, 0.1),
    inset -5px -5px 10px rgba(255, 255, 255, 0.9),
    5px 5px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const InnerContainer = styled.div`
  width: 85%;
  height: 85%;
  border-radius: 50%;
  background: 
    radial-gradient(circle at 30% 30%, #87ceeb, #4682b4),
    linear-gradient(145deg, #1e88e5, #0d47a1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 
    inset 3px 3px 8px rgba(0, 0, 0, 0.3),
    inset -3px -3px 8px rgba(255, 255, 255, 0.1);
`;

const RotatingElement = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoShape = styled.div`
  width: 80%;
  height: 80%;
  background: linear-gradient(145deg, #e3f2fd, #bbdefb, #2196f3);
  border-radius: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 2px 2px 4px rgba(255, 255, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    background: linear-gradient(145deg, #64b5f6, #1976d2);
    border-radius: 50%;
    box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.4);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 40%;
    height: 40%;
    background: linear-gradient(145deg, #ffffff, #e3f2fd);
    border-radius: 50%;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.2),
      inset 1px 1px 2px rgba(255, 255, 255, 0.6);
  }
`;

const CenterDot = styled.div`
  position: absolute;
  width: 20%;
  height: 20%;
  background: radial-gradient(circle, #ffffff, #e3f2fd);
  border-radius: 50%;
  z-index: 10;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.8);
`;

const OrbitingDots = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #ffffff, #2196f3);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    top: 10%;
    left: 50%;
    margin-left: -4px;
  }
  
  &::after {
    bottom: 10%;
    left: 50%;
    margin-left: -4px;
  }
`;

const AnimatedLogo = ({ size = '120px', onClick }) => {
  return (
    <LogoContainer size={size} onClick={onClick}>
      <OuterRing>
        <InnerContainer>
          <RotatingElement>
            <LogoShape>
              <CenterDot />
            </LogoShape>
            <OrbitingDots />
          </RotatingElement>
        </InnerContainer>
      </OuterRing>
    </LogoContainer>
  );
};

export default AnimatedLogo;