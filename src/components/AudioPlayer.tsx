
import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from './Icons';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://play.nicecream.fm/radio/8020/blue.mp3');
    audioRef.current.loop = true;
    
    // Autoplay
    const playPromise = audioRef.current.play();
    
    // Handle autoplay restrictions
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented
        setIsPlaying(false);
      });
    }
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay}>
        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
      <span className="text-white text-xs opacity-70">nicecream.fm</span>
    </div>
  );
};

export default AudioPlayer;
