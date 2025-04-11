
import React, { useEffect, useRef } from 'react';

const VideoBackground = () => {
  return (
    <div className="video-background-container">
      <iframe 
        src="https://www.youtube.com/embed/yIzn6Q-eku8?start=31&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=yIzn6Q-eku8&mute=1"
        className="video-background"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Background Video"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
