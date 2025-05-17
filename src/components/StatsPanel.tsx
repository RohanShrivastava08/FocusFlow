import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../context/TimerContext';
import { Clock, Brain, Coffee } from 'lucide-react';

const StatsPanel = () => {
  const { sessions } = useTimer();

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Get icon for session type
  const getSessionIcon = (mode: string) => {
    switch(mode) {
      case 'focus':
        return <Brain size={18} className="text-primary-500" />;
      case 'shortBreak':
        return <Coffee size={18} className="text-emerald-500" />;
      case 'longBreak':
        return <Coffee size={18} className="text-teal-500" />;
      default:
        return <Clock size={18} className="text-gray-400" />;
    }
  };

  // Get label for session type
  const getSessionLabel = (mode: string) => {
    switch(mode) {
      case 'focus':
        return 'Focus Session';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      case 'custom':
        return 'Custom Session';
      default:
        return 'Session';
    }
  };

  // Get color classes for session type
  const getSessionColorClass = (mode: string) => {
    switch(mode) {
      case 'focus':
        return 'bg-primary-900/40 border-primary-700/50';
      case 'shortBreak':
        return 'bg-emerald-900/40 border-emerald-700/50';
      case 'longBreak':
        return 'bg-teal-900/40 border-teal-700/50';
      case 'custom':
        return 'bg-accent-900/40 border-accent-700/50';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  // Calculate stats
  const totalSessions = sessions.length;
  const totalFocusSessions = sessions.filter(s => s.mode === 'focus').length;
  const totalFocusMinutes = sessions
    .filter(s => s.mode === 'focus')
    .reduce((total, session) => total + session.duration, 0);

  // Session card animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Focus Journey
      </motion.h2>
      
      {/* Stats summary */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Sessions</h3>
          <p className="text-3xl font-bold">{totalSessions}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Focus Sessions</h3>
          <p className="text-3xl font-bold">{totalFocusSessions}</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Focus Time</h3>
          <p className="text-3xl font-bold">{totalFocusMinutes} <span className="text-lg text-gray-400">min</span></p>
        </div>
      </motion.div>
      
      {/* Session history */}
      <motion.h3 
        className="text-xl font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Session History
      </motion.h3>
      
      {sessions.length === 0 ? (
        <motion.div 
          className="text-center py-12 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          No sessions completed yet. Start your first timer!
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sessions.map((session) => (
            <motion.div 
              key={session.id}
              className={`border rounded-lg p-4 shadow-lg ${getSessionColorClass(session.mode)}`}
              variants={item}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {getSessionIcon(session.mode)}
                  <span className="ml-2 font-medium">{getSessionLabel(session.mode)}</span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(session.completedAt)}</span>
              </div>
              <div className="text-2xl font-bold">{session.duration} <span className="text-sm text-gray-400">minutes</span></div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StatsPanel;