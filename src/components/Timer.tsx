import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../context/TimerContext';

const Timer = () => {
  const { timeLeft, progress, mode } = useTimer();
  const [showSetTime, setShowSetTime] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("30");
  const { setCustomDuration } = useTimer();

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Format the time for display
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Handle custom time form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(customMinutes);
    if (!isNaN(mins) && mins > 0) {
      setCustomDuration(mins);
      setShowSetTime(false);
    }
  };

  // Get mode label for display
  const getModeLabel = () => {
    switch(mode) {
      case 'focus': return 'Focus Mode';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      case 'custom': return 'Custom Timer';
      default: return 'Timer';
    }
  };

  // Get mode color
  const getModeColor = () => {
    switch(mode) {
      case 'focus': return 'from-primary-500 to-primary-700';
      case 'shortBreak': return 'from-emerald-500 to-emerald-700';
      case 'longBreak': return 'from-teal-500 to-teal-700';
      case 'custom': return 'from-accent-500 to-accent-700';
      default: return 'from-primary-500 to-primary-700';
    }
  };

  return (
    <div className="relative">
      {/* Mode indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-4"
      >
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getModeColor()} text-white`}>
          {getModeLabel()}
        </span>
      </motion.div>

      {/* Timer display */}
      <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
        {/* Progress circle */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#27272a"
            strokeWidth="5"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={45 * 2 * Math.PI}
            strokeDashoffset={45 * 2 * Math.PI * (1 - progress)}
            transform="rotate(-90 50 50)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${mode === 'focus' ? 'stop-color-primary-400' : mode === 'shortBreak' ? 'stop-color-emerald-400' : mode === 'longBreak' ? 'stop-color-teal-400' : 'stop-color-accent-400'}`} style={{stopColor: mode === 'focus' ? '#818cf8' : mode === 'shortBreak' ? '#34d399' : mode === 'longBreak' ? '#2dd4bf' : '#f472b6'}} />
              <stop offset="100%" className={`${mode === 'focus' ? 'stop-color-primary-600' : mode === 'shortBreak' ? 'stop-color-emerald-600' : mode === 'longBreak' ? 'stop-color-teal-600' : 'stop-color-accent-600'}`} style={{stopColor: mode === 'focus' ? '#4f46e5' : mode === 'shortBreak' ? '#059669' : mode === 'longBreak' ? '#0d9488' : '#db2777'}} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Time display */}
        <motion.div 
          className="relative text-center z-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="font-mono text-6xl md:text-7xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
            key={formattedTime}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {formattedTime}
          </motion.div>
          
          {/* Custom time button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-3 py-1 text-xs rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
            onClick={() => setShowSetTime(!showSetTime)}
          >
            {showSetTime ? 'Cancel' : 'Custom Time'}
          </motion.button>
          
          {/* Custom time form */}
          {showSetTime && (
            <motion.form 
              onSubmit={handleSubmit}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-gray-800 rounded-lg p-4 w-64 shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-3">
                <label htmlFor="minutes" className="block text-sm font-medium text-gray-300 mb-1">
                  Minutes (1-120):
                </label>
                <input
                  type="number"
                  id="minutes"
                  min="1"
                  max="120"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-md hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Set Time
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Timer;