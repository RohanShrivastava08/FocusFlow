import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Brain, Coffee, Coffee as LongBreak } from 'lucide-react';
import { useTimer, TIMER_MODES } from '../context/TimerContext';

const Controls = () => {
  const { isRunning, startTimer, pauseTimer, resetTimer, changeMode, mode } = useTimer();

  // Helper function for conditional styling
  const getButtonStyle = (buttonMode: string) => {
    const isActive = mode === buttonMode;
    let baseClasses = "flex items-center justify-center px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm font-medium";
    
    // Active styles based on mode
    if (isActive) {
      switch(buttonMode) {
        case TIMER_MODES.FOCUS:
          return `${baseClasses} bg-primary-600 text-white focus:ring-primary-500`;
        case TIMER_MODES.SHORT_BREAK:
          return `${baseClasses} bg-emerald-600 text-white focus:ring-emerald-500`;
        case TIMER_MODES.LONG_BREAK:
          return `${baseClasses} bg-teal-600 text-white focus:ring-teal-500`;
        default:
          return `${baseClasses} bg-primary-600 text-white focus:ring-primary-500`;
      }
    }
    
    // Inactive style
    return `${baseClasses} bg-gray-800 hover:bg-gray-700 text-gray-300 focus:ring-gray-500`;
  };

  return (
    <div className="mt-8 mb-6">
      {/* Mode selection controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => changeMode(TIMER_MODES.FOCUS)}
          className={getButtonStyle(TIMER_MODES.FOCUS)}
        >
          <Brain size={16} className="mr-2" />
          Focus
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => changeMode(TIMER_MODES.SHORT_BREAK)}
          className={getButtonStyle(TIMER_MODES.SHORT_BREAK)}
        >
          <Coffee size={16} className="mr-2" />
          Short Break
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => changeMode(TIMER_MODES.LONG_BREAK)}
          className={getButtonStyle(TIMER_MODES.LONG_BREAK)}
        >
          <LongBreak size={16} className="mr-2" />
          Long Break
        </motion.button>
      </div>
      
      {/* Timer controls */}
      <div className="flex justify-center gap-3">
        {!isRunning ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
            onClick={startTimer}
          >
            <Play size={24} fill="white" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
            onClick={pauseTimer}
          >
            <Pause size={24} />
          </motion.button>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 shadow-lg"
          onClick={resetTimer}
        >
          <RotateCcw size={22} />
        </motion.button>
      </div>
    </div>
  );
};

export default Controls;