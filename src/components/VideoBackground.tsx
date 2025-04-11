
import React, { useEffect, useRef } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Set starting time to 31 seconds
      videoRef.current.currentTime = 31;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="video-background"
      autoPlay
      muted
      loop
      playsInline
    >
      <source
        src="https://www.youtube.com/embed/yIzn6Q-eku8?start=31&autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=yIzn6Q-eku8&mute=1"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
