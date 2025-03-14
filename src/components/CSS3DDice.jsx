import React, { useState } from 'react';
import './CSS3DDice.css';

const CSS3DDice = ({ icon, name, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Check if it's the Next.js logo
  const isNextJs = name === 'Next.js';
  
  // Check if it's the Ant Design logo
  const isAntDesign = name === 'Ant Design';
  
  // Check if it's an external URL
  const isExternalUrl = typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('https'));
  
  return (
    <div 
      className="css3d-dice-container"
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`css3d-dice ${isHovered ? 'hovered' : ''}`}>
        <div className="css3d-dice-face front">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
        <div className="css3d-dice-face back">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
        <div className="css3d-dice-face right">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
        <div className="css3d-dice-face left">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
        <div className="css3d-dice-face top">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
        <div className="css3d-dice-face bottom">
          <img src={icon} alt={name} className={`tech-icon ${isNextJs ? 'nextjs-icon' : ''} ${isAntDesign ? 'ant-design-icon' : ''} ${isExternalUrl ? 'external-icon' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default CSS3DDice; 