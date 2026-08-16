import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Magnetic } from './Magnetic';

export const WhatsAppFloating = () => {
  const handleClick = () => {
    window.open('https://wa.me/5531995840968', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <Magnetic strength={0.4}>
        <button
          onClick={handleClick}
          className="relative group flex items-center gap-3 pl-4 pr-6 py-3 bg-violet-500 text-black rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:bg-violet-400 transition-all"
        >
          <MessageCircle size={24} className="relative z-10" />
          <span className="text-[10px] font-black uppercase tracking-widest relative z-10">WhatsApp</span>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-violet-500 rounded-2xl animate-ping opacity-20" />
        </button>
      </Magnetic>
    </motion.div>
  );
};
