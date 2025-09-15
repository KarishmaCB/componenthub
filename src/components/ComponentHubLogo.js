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

const ComponentShape = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// ComponentHub logo - stylized "C" with component blocks
const LogoSymbol = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Main "C" shape
  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border: 6px solid #ffffff;
    border-right: transparent;
    border-radius: 50%;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.2),
      inset 1px 1px 2px rgba(255, 255, 255, 0.3);
  }
`;

// Component blocks around the "C"
const ComponentBlock1 = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(145deg, #ffffff, #e3f2fd);
  border-radius: 2px;
  top: 15%;
  right: 20%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ComponentBlock2 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(145deg, #ffffff, #e3f2fd);
  border-radius: 2px;
  top: 35%;
  right: 10%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ComponentBlock3 = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(145deg, #ffffff, #e3f2fd);
  border-radius: 2px;
  bottom: 35%;
  right: 15%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ComponentBlock4 = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(145deg, #ffffff, #e3f2fd);
  border-radius: 2px;
  bottom: 15%;
  right: 25%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CenterHighlight = styled.div`
  position: absolute;
  width: 25%;
  height: 25%;
  background: radial-gradient(circle, #ffffff, #e3f2fd);
  border-radius: 50%;
  z-index: 10;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.8);
`;

const ComponentHubLogo = ({ size = '120px', onClick }) => {
  return (
    <LogoContainer size={size} onClick={onClick}>
      <OuterRing>
        <InnerContainer>
          <ComponentShape>
            <LogoSymbol>
              <ComponentBlock1 />
              <ComponentBlock2 />
              <ComponentBlock3 />
              <ComponentBlock4 />
              <CenterHighlight />
            </LogoSymbol>
          </ComponentShape>
        </InnerContainer>
      </OuterRing>
    </LogoContainer>
  );
};

export default ComponentHubLogo;