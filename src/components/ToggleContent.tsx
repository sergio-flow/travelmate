import React, { useState, useEffect } from 'react';
import { ShowIcon, HideIcon } from './Icons';

const ToggleContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  useEffect(() => {
    const body = document.body;

    if (!isVisible) {
      body.classList.add('visibility-visible');
      body.classList.remove('visibility-hidden');
    } else {
      body.classList.add('visibility-hidden');
      body.classList.remove('visibility-visible');
    }

    // Cleanup if component unmounts
    return () => {
      body.classList.remove('visibility-visible', 'visibility-hidden');
    };
  }, [isVisible]);

  return (
    <div className="toggle-content">
      <button onClick={toggleVisibility}>
        {isVisible ? <HideIcon className="w-5 h-5" /> : <ShowIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default ToggleContent;
