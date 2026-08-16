import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Positioning, About } from './About';
import { Cases } from './Cases';
import { Services } from './Services';
import { Process, Footer } from './Footer';

const ResponsiveSection = () => {
  return (
    <section className="py-24 md:py-32 bg-black px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-4">Adaptabilidade</h2>
          <p className="text-3xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight">Uma Experiência. <br /><span className="text-white/40 italic">Qualquer Tela.</span></p>
        </motion.div>

        <div className="relative h-[450px] md:h-[600px] flex items-center justify-center">
          {/* Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-10 w-[280px] md:w-[600px] aspect-video bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
             <div className="h-5 md:h-6 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/50" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-yellow-500/50" />
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-violet-500/50" />
             </div>
             <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1200" className="w-full h-full object-cover grayscale opacity-50" alt="Desktop View" />
          </motion.div>

          {/* Tablet */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, x: 40, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 w-[160px] md:w-[300px] aspect-[3/4] bg-[#111] border border-white/10 rounded-3xl shadow-2xl translate-x-16 md:translate-x-40 translate-y-8 overflow-hidden"
          >
             <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=600" className="w-full h-full object-cover grayscale opacity-50" alt="Tablet View" />
          </motion.div>

          {/* Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 40, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 w-[90px] md:w-[160px] aspect-[9/19.5] bg-[#111] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl -translate-x-16 md:-translate-x-40 translate-y-16 overflow-hidden"
          >
             <img src="https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=400" className="w-full h-full object-cover grayscale opacity-50" alt="Mobile View" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const PortalLeads = () => {
  useEffect(() => {
    // Custom Smooth Scroll logic or Observer setup could go here
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-black min-h-screen selection:bg-violet-500 selection:text-black">
      <Navbar />
      <Hero />
      <Positioning />
      <About />
      <Cases />
      <Services />
      <ResponsiveSection />
      <Process />
      <Footer />
    </div>
  );
};
