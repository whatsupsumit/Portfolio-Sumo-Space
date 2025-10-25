import { useEffect, useState } from 'react';
import './ThemeSwitch.css';

interface ThemeSwitchProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  isTransitioning: boolean;
}

export const ThemeSwitch = ({ theme, onToggle, isTransitioning }: ThemeSwitchProps) => {
  const [isChecked, setIsChecked] = useState(theme === 'light');

  // Sync with external theme changes
  useEffect(() => {
    setIsChecked(theme === 'light');
  }, [theme]);

  const handleToggle = () => {
    if (isTransitioning) return;
    
    onToggle();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <label className={`theme-switch ${isTransitioning ? 'disabled' : ''}`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          disabled={isTransitioning}
          className="theme-switch-input"
        />
        <div className="theme-switch-button">
          <div className="theme-switch-light"></div>
          <div className="theme-switch-dots"></div>
          <div className="theme-switch-characters"></div>
          <div className="theme-switch-shine"></div>
          <div className="theme-switch-shadow"></div>
        </div>
      </label>
    </div>
  );
};
