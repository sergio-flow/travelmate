
import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from './Icons';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://play.nicecream.fm/radio/8020/blue.mp3');
    audioRef.current.loop = true;
    
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Error toggling play:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay}>
        {!isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
      <span className="text-white text-xs opacity-70">nicecream.fm</span>
    </div>
  );
};

export default AudioPlayer;
