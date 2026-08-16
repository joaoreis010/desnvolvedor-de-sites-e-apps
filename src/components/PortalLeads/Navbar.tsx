import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Manifesto', href: '#manifesto' },
    { name: 'Cases', href: '#cases' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Preços', href: '#precos' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-xl py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-black tracking-tighter text-white uppercase group cursor-pointer">
            Portal <span className="text-violet-400 group-hover:text-violet-300 transition-colors">Leads</span>
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
            className="bg-violet-500 hover:bg-violet-400 text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          >
            Orçamento <ArrowRight className="inline-block ml-2 w-3 h-3" />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[110] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex flex-col gap-1.5 items-end">
            <motion.div 
              animate={{ width: mobileMenuOpen ? 24 : 32, rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
              className="h-0.5 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ opacity: mobileMenuOpen ? 0 : 1, width: 24 }}
              className="h-0.5 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ width: mobileMenuOpen ? 24 : 16, rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
              className="h-0.5 bg-white rounded-full" 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] md:hidden bg-black/40 backdrop-blur-[100px] flex items-center justify-center"
          >
            <div className="px-10 py-20 flex flex-col items-center justify-center gap-12 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-5xl font-black text-white uppercase tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
                className="w-full max-w-xs bg-violet-500 text-black py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(139,92,246,0.3)] active:scale-95 transition-transform"
              >
                Iniciar Projeto
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
