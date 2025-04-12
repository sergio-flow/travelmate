
import React from 'react';

interface VideoBackgroundProps {
  selectedDestination?: string;
}

const VideoBackground = ({ selectedDestination }: VideoBackgroundProps) => {
  let videoURL = "https://www.youtube.com/embed/OF2nczyQXiQ?start=300&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=OF2nczyQXiQ&mute=1";
  
  // Change video based on destination
  if (selectedDestination) {
    if (selectedDestination === "Amsterdam") {
      videoURL = "https://www.youtube.com/embed/yIzn6Q-eku8?start=31&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=yIzn6Q-eku8&mute=1";
    } else if (selectedDestination === "Paris") {
      videoURL = "https://www.youtube.com/embed/9Nz3H9eSKdE?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=9Nz3H9eSKdE&mute=1";
    }
  }

  return (
    <div className="video-background-container">
      <iframe 
        src={videoURL}
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
