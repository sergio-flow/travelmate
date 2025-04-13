
import React from 'react';

interface VideoBackgroundProps {
  selectedDestination?: string;
}

const VideoBackground = ({ selectedDestination }: VideoBackgroundProps) => {
  // https://youtu.be/lz6lhCdmAgQ?si=DSFlbfmR_GtWFZez&t=118
  // let videoURL = "https://www.youtube.com/embed/8FCkb7NZ7SI?t=118&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1";
  const videoURL = "https://www.youtube.com/embed/yIzn6Q-eku8?start=0&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&mute=1"
  
  // Change video based on destination
  // if (selectedDestination) {
  //   if (selectedDestination === "Amsterdam") {
  //     videoURL = "https://www.youtube.com/embed/yIzn6Q-eku8?start=31&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=yIzn6Q-eku8&mute=1";
  //   } else if (selectedDestination === "Paris") {
  //     videoURL = "https://www.youtube.com/embed/9Nz3H9eSKdE?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=9Nz3H9eSKdE&mute=1";
  //   }
  // }

  return (
    <div className="video-background-container" style={{ backgroundColor: 'black' }}>
      <iframe 
        src={videoURL}
        className="video-background"
        // style={{ opacity: 0.75 }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Background Video"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
