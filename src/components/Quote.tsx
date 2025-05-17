import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Array of motivational quotes
const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "It's not about having time, it's about making time. – Unknown",
  "The secret of getting ahead is getting started. – Mark Twain",
  "Focus on being productive instead of busy. – Tim Ferriss",
  "You don't have to be great to start, but you have to start to be great. – Zig Ziglar",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "The best way to predict the future is to create it. – Peter Drucker",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Your focus determines your reality. – George Lucas",
  "The future depends on what you do today. – Mahatma Gandhi",
  "Small progress is still progress. – Unknown",
  "Productivity is never an accident. It is always the result of a commitment to excellence. – Paul J. Meyer",
  "It always seems impossible until it's done. – Nelson Mandela",
  "The most effective way to do it, is to do it. – Amelia Earhart"
];

const Quote = () => {
  const [quote, setQuote] = useState('');
  const [fadeIn, setFadeIn] = useState(true);

  // Set initial quote
  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Change quote periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      
      setTimeout(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFadeIn(true);
      }, 500);
    }, 60000); // Change quote every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="max-w-md text-center text-gray-400 italic text-sm mt-10 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 0.8 : 0 }}
      transition={{ duration: 0.5 }}
    >
      "{quote}"
    </motion.div>
  );
};

export default Quote;