import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import Controls from './components/Controls';
import StatsPanel from './components/StatsPanel';
import MusicPlayer from './components/MusicPlayer';
import Quote from './components/Quote';
import { TimerProvider } from './context/TimerContext';

function App() {
  const [showStats, setShowStats] = useState(false);

  return (
    <TimerProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100 flex flex-col">
        <Navbar onToggleStats={() => setShowStats(!showStats)} />
        
        {showStats ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-4 md:p-6 overflow-y-auto"
          >
            <StatsPanel />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-4"
          >
            <Timer />
            <Controls />
            <Quote />
            <MusicPlayer />
          </motion.div>
        )}
      </div>
    </TimerProvider>
  );
}

export default App;