import React, { useState, useEffect } from 'react';
import { ShowIcon, HideIcon, VibeIcon } from './Icons';

const CityVibes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('London Vibes');

  const cities = ['London Vibes', 'Amsterdam', 'Bali'];

  const cityUrls = {
    'Amsterdam': 'https://www.youtube.com/embed/yIzn6Q-eku8?start=0&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1',
    'London Vibes': 'https://www.youtube.com/embed/_ruYxJgMOqw?start=904&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1',
    'Bali': 'https://www.youtube.com/embed/b4VLlbM_qHI?start=3444&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1'
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCity = (city) => {
    setSelectedCity(city);
    setIsOpen(false);

    // Find the iframe with video-background class and update its src
    // Find the iframe with video-background class and update its src
    const videoBackground = document.querySelector('iframe.video-background');
    if (videoBackground) {

      (videoBackground as HTMLIFrameElement).src = cityUrls[city];

      (videoBackground as HTMLIFrameElement).style.opacity = '0';
      // Handle body visibility classes
      const bodyElement = document.body;

      // First remove both visibility classes
      bodyElement.classList.remove('visibility-hidden');
      bodyElement.classList.remove('visibility-visible');

      // Then add visibility-visible class
      bodyElement.classList.add('visibility-visible');
    }
  };

  // Set initial video background on component mount
  useEffect(() => {
    const videoBackground = document.querySelector('iframe.video-background');
    if (videoBackground) {
      (videoBackground as HTMLIFrameElement).src = cityUrls[selectedCity];
    }
  }, []);

  return (
    <div className="city-vibes relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-white bg-black/40 px-4 py-2 rounded-md backdrop-blur-md"
      >
        <VibeIcon className="w-5 h-5" />
        {/* <span className="text-xs font-bold uppercase tracking-wider">{selectedCity}</span> */}
      </button>

      {isOpen && (
        <div className="origin-top-right absolute bottom-[55px] left-0 mt-2 w-56 rounded-md focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {cities.map((city) => (
              <button
                key={city}
                className={`block text-left px-4 py-2 mb-2 text-xs font-bold tracking-wider uppercase ${selectedCity === city ? 'text-yellow-400' : 'text-white'
                  } hover:bg-white/20 focus:outline-none`}
                onClick={() => selectCity(city)}
                role="menuitem"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityVibes;