import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Positioning, About } from './About';
import { Cases } from './Cases';
import { PillarsExplainer } from './PillarsExplainer';
import { Services } from './Services';
import { Process, Footer } from './Footer';
import { Smartphone, Zap, Sparkles, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';

const ResponsiveSection = () => {
  return (
    <section className="py-24 md:py-32 bg-black px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4"
          >
            <Smartphone size={12} />
            Engenharia Mobile-First
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="text-3xl md:text-7xl font-black text-white tracking-tighter uppercase leading-tight mb-6"
          >
            O Que é Responsividade? <br />
            <span className="text-violet-500">Uma Experiência. Qualquer Tela.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm md:text-base leading-relaxed"
          >
            Responsividade é a arte e a técnica de construir um site que se autoajusta instantaneamente ao formato de qualquer tela — do menor smartphone Android ou iPhone até um monitor ultrawide de 32 polegadas.
          </motion.p>
        </div>

        {/* 3D Multi-device Mockup Display */}
        <div className="relative h-[420px] md:h-[550px] flex items-center justify-center mb-16">
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

        {/* Why Responsiveness Decides Your Sales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6 font-black text-lg">
              82%
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
              Onde Seus Clientes Realmente Estão
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Mais de 80% do tráfego comercial no Brasil hoje vem de smartphones. Se o seu site não abre perfeitamente no celular, você perde 8 em cada 10 oportunidades antes mesmo da primeira conversa.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
              Toque Anatômico & Zero Zoom
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Nada irrita mais um comprador do que tentar clicar em um botão pequeno demais ou ter que fazer "movimento de pinça" para ler uma frase. Nossos sites são desenhados para o polegar humano: fluidez pura.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
              Prioridade Absoluta no Google
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              O Google usa a política de "Mobile-First Indexing": sites com arquitetura responsiva impecável ganham notas mais altas e aparecem acima dos concorrentes nas pesquisas orgânicas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const PortalLeads = () => {
  useEffect(() => {
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
      <PillarsExplainer />
      <Services />
      <ResponsiveSection />
      <Process />
      <Footer />
    </div>
  );
};
