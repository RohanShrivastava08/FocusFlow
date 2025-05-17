import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useTimer } from '../context/TimerContext';

const MusicPlayer = () => {
  const { musicEnabled, toggleMusic, isRunning, mode } = useTimer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Audio source with a reliable white noise track
  const audioSource = 'https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3';

  useEffect(() => {
    // Initialize audio with error handling
    if (!audioRef.current) {
      try {
        audioRef.current = new Audio(audioSource);
        audioRef.current.loop = true;
        
        // Add error event listener to catch loading/playback issues
        audioRef.current.addEventListener('error', (e) => {
          const error = e.currentTarget as HTMLAudioElement;
          setAudioError(`Audio loading failed: ${error.error?.message || 'Unknown error'}`);
          console.error('Audio error:', error.error);
        });

        // Add canplaythrough event to confirm audio is loaded
        audioRef.current.addEventListener('canplaythrough', () => {
          setAudioError(null);
        });

        // Preload the audio
        audioRef.current.load();
      } catch (error) {
        console.error('Failed to initialize audio:', error);
        setAudioError('Failed to initialize audio player');
      }
    }

    // Play or pause based on music enabled state and if timer is running
    if (musicEnabled && isRunning && mode === 'focus' && audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio playback failed:', error);
          setAudioError('Failed to play audio');
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', () => {});
        audioRef.current.removeEventListener('canplaythrough', () => {});
      }
    };
  }, [musicEnabled, isRunning, mode]);

  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMusic}
        className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
          musicEnabled 
            ? 'bg-primary-600 hover:bg-primary-700 text-white' 
            : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
        }`}
      >
        {musicEnabled ? (
          <>
            <Volume2 size={16} className="mr-2" />
            Focus Music On
          </>
        ) : (
          <>
            <VolumeX size={16} className="mr-2" />
            Focus Music Off
          </>
        )}
      </motion.button>
      <div className="text-xs text-gray-400 mt-2 text-center">
        {audioError ? (
          <span className="text-red-400">{audioError}</span>
        ) : (
          musicEnabled ? 'Ambient sound is playing during focus mode' : 'Enable focus music during your session'
        )}
      </div>
    </motion.div>
  );
};

export default MusicPlayer;