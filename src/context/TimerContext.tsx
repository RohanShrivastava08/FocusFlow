import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

// Define our session types
export const TIMER_MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
  CUSTOM: 'custom'
};

// Define the default durations in minutes
export const DEFAULT_DURATIONS = {
  [TIMER_MODES.FOCUS]: 25,
  [TIMER_MODES.SHORT_BREAK]: 5,
  [TIMER_MODES.LONG_BREAK]: 15,
  [TIMER_MODES.CUSTOM]: 30,
};

// Max duration (2 hours in minutes)
export const MAX_DURATION = 120;

// Define our session type
export type Session = {
  id: string;
  mode: string;
  duration: number;
  completedAt: string;
};

// Define our context type
type TimerContextType = {
  isRunning: boolean;
  mode: string;
  timeLeft: number;
  duration: number;
  progress: number;
  sessions: Session[];
  musicEnabled: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  changeMode: (mode: string) => void;
  setCustomDuration: (minutes: number) => void;
  toggleMusic: () => void;
};

// Create context with default values
const TimerContext = createContext<TimerContextType>({
  isRunning: false,
  mode: TIMER_MODES.FOCUS,
  timeLeft: DEFAULT_DURATIONS[TIMER_MODES.FOCUS] * 60,
  duration: DEFAULT_DURATIONS[TIMER_MODES.FOCUS],
  progress: 0,
  sessions: [],
  musicEnabled: false,
  startTimer: () => {},
  pauseTimer: () => {},
  resetTimer: () => {},
  changeMode: () => {},
  setCustomDuration: () => {},
  toggleMusic: () => {},
});

// Provider component
export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState(TIMER_MODES.FOCUS);
  const [duration, setDuration] = useState(DEFAULT_DURATIONS[TIMER_MODES.FOCUS]);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [progress, setProgress] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [musicEnabled, setMusicEnabled] = useState(false);
  
  const intervalRef = useRef<number | null>(null);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoro-sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save sessions to localStorage when updated
  useEffect(() => {
    localStorage.setItem('pomodoro-sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Handle timer countdown
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            completeSession();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Update progress whenever timeLeft changes
  useEffect(() => {
    setProgress(1 - timeLeft / (duration * 60));
  }, [timeLeft, duration]);

  // Complete the current session
  const completeSession = () => {
    pauseTimer();
    
    // Add session to history
    const newSession: Session = {
      id: crypto.randomUUID(),
      mode,
      duration,
      completedAt: new Date().toISOString(),
    };
    
    setSessions(prevSessions => [newSession, ...prevSessions]);
    
    // Play notification sound
    try {
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3');
      audio.play();
    } catch (error) {
      console.error('Could not play notification sound:', error);
    }
  };

  // Start the timer
  const startTimer = () => {
    if (timeLeft === 0) {
      resetTimer();
    }
    setIsRunning(true);
  };

  // Pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(duration * 60);
    setProgress(0);
  };

  // Change the timer mode
  const changeMode = (newMode: string) => {
    pauseTimer();
    setMode(newMode);
    setDuration(DEFAULT_DURATIONS[newMode]);
    setTimeLeft(DEFAULT_DURATIONS[newMode] * 60);
    setProgress(0);
  };

  // Set a custom duration
  const setCustomDuration = (minutes: number) => {
    const validMinutes = Math.min(Math.max(1, minutes), MAX_DURATION);
    pauseTimer();
    setMode(TIMER_MODES.CUSTOM);
    setDuration(validMinutes);
    setTimeLeft(validMinutes * 60);
    setProgress(0);
  };

  // Toggle music
  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
  };

  return (
    <TimerContext.Provider
      value={{
        isRunning,
        mode,
        timeLeft,
        duration,
        progress,
        sessions,
        musicEnabled,
        startTimer,
        pauseTimer,
        resetTimer,
        changeMode,
        setCustomDuration,
        toggleMusic,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook for using the timer context
export const useTimer = () => useContext(TimerContext);