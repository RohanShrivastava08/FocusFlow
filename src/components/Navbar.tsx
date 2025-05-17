import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BarChart2 } from 'lucide-react';

const Navbar = ({ onToggleStats }: { onToggleStats: () => void }) => {
  return (
    <motion.header 
      className="sticky top-0 bg-opacity-90 bg-gray-900 backdrop-blur-sm shadow-md z-10"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="h-6 w-6 text-primary-500 mr-2" />
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-500">
            Focus Flow
          </h1>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleStats}
          className="flex items-center px-3 py-1 rounded-full bg-gray-800 hover:bg-gray-700 text-sm"
        >
          <BarChart2 size={16} className="mr-1 text-primary-400" />
          <span>Stats</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;