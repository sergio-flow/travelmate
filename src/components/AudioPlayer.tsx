
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
    
    // Autoplay with better handling
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setAudioInitialized(true);
                console.log("Audio started playing automatically");
              })
              .catch(error => {
                console.log("Audio autoplay prevented:", error);
                setIsPlaying(false);
                setAudioInitialized(true);
              });
          }
        }
      } catch (error) {
        console.log("Audio autoplay error:", error);
        setIsPlaying(false);
        setAudioInitialized(true);
      }
    };
    
    playAudio();
    
    // Add click event listener to document to handle autoplay restrictions
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying && audioInitialized) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started playing after user interaction");
          })
          .catch(err => console.log("Error playing audio after interaction:", err));
      }
    };

    document.addEventListener('click', handleUserInteraction);
    
    // Clean up on unmount
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioInitialized, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
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
        {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
      </button>
      <span className="text-white text-xs opacity-70">nicecream.fm</span>
    </div>
  );
};

export default AudioPlayer;
