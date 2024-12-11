import React from 'react';
import './CustomizationMenu.css';

interface CustomizationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lightSquareColor: string;
  darkSquareColor: string;
  backgroundColor: string;
  onLightSquareChange: (color: string) => void;
  onDarkSquareChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
  textColor: 'light' | 'dark';
  onTextColorChange: (color: 'light' | 'dark') => void;
}

const CustomizationMenu: React.FC<CustomizationMenuProps> = ({
  isOpen,
  onClose,
  lightSquareColor,
  darkSquareColor,
  backgroundColor,
  onLightSquareChange,
  onDarkSquareChange,
  onBackgroundChange,
  textColor,
  onTextColorChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="customization-modal">
      <div className="customization-content">
        <h2>Customize Board</h2>
        
        <div className="color-picker-group">
          <label>
            Light Squares
            <input
              type="color"
              value={lightSquareColor}
              onChange={(e) => onLightSquareChange(e.target.value)}
            />
          </label>

          <label>
            Dark Squares
            <input
              type="color"
              value={darkSquareColor}
              onChange={(e) => onDarkSquareChange(e.target.value)}
            />
          </label>

          <label>
            Background
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundChange(e.target.value)}
            />
          </label>

          <label className="text-color-toggle">
            Text Color
            <select 
              value={textColor} 
              onChange={(e) => onTextColorChange(e.target.value as 'light' | 'dark')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomizationMenu; 