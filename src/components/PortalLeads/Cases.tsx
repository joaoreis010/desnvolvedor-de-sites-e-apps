import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface CaseProps {
  title: string;
  category: string;
  headline: string;
  description: string;
  recursos: string[];
  image?: string;
  videoUrl?: string;
  isReversed?: boolean;
  isMobile?: boolean;
}

const MobileFrame = ({ src, alt, videoUrl }: { src: string; alt: string; videoUrl?: string }) => (
  <div className="relative mx-auto w-[280px] h-[560px] bg-zinc-900 rounded-[3.5rem] border-[12px] border-zinc-800 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] overflow-hidden group/phone transition-transform duration-1000">
    {/* Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-3xl z-20" />
    
    {/* Screen Content */}
    <div className="w-full h-full relative overflow-hidden bg-[#0a0a0a]">
      {videoUrl ? (
        <div className="absolute inset-0 w-full h-full">
           <iframe
             className="absolute top-1/2 left-1/2 w-[100%] h-[110%] -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.4]"
             src={`${videoUrl}&autoplay=1&mute=1&controls=0&loop=1&playlist=${videoUrl.split('/').pop()?.split('?')[0]}&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&showinfo=0`}
             title={alt}
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           />
           {/* Live Indicator */}
           <div className="absolute top-12 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span className="text-[7px] font-black text-white uppercase tracking-[0.2em]">Live Preview</span>
           </div>
           
           {/* Interaction Overlay */}
           <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-transparent transition-colors duration-1000 z-10" />
        </div>
      ) : (
        <>
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-transparent transition-colors duration-1000" />
        </>
      )}
    </div>

    {/* Home Indicator */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20" />
    
    {/* Reflection */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10 opacity-50" />
  </div>
);

const CaseSection = ({ title, category, headline, description, recursos, image, videoUrl, isReversed, isMobile }: CaseProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [20, 0, 0, 20]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, scale, filter: useTransform(blur, v => `blur(${v}px)`), y }}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-32 items-center py-20 ${isReversed ? 'lg:flex-row-reverse' : ''} px-0`}
    >
      <div className="flex-1 space-y-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-violet-500" />
            <span className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em]">{category}</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">{title}</h3>
          <h4 className="text-lg md:text-2xl font-black text-white/40 uppercase tracking-tight mb-8 italic">{headline}</h4>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed max-w-xl">{description}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {recursos.map((item, i) => (
            <motion.div 
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-4 h-4 rounded bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-violet-500" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold text-white uppercase tracking-widest">{item}</span>
            </motion.div>
          ))}
        </div>

        <Magnetic>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
            className="group w-full md:w-auto inline-flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest active:bg-violet-400 transition-all shadow-xl"
          >
            Ver Projeto <ArrowRight className="w-4 h-4 group-active:translate-x-1 transition-transform" />
          </motion.button>
        </Magnetic>
      </div>

      <div className="flex-1 w-full relative group">
        {isMobile ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="relative py-10"
          >
            <MobileFrame src={image || ""} alt={title} videoUrl={videoUrl} />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
              <span className="text-[9px] font-black text-violet-400 uppercase tracking-[0.2em]">Design Mobile-First</span>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="aspect-video bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative"
          >
            {videoUrl ? (
              <div className="absolute inset-0">
                 <iframe
                   className="absolute top-1/2 left-1/2 w-[100%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                   src={`${videoUrl}&autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&playsinline=1&rel=0&showinfo=0`}
                   title={title}
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 z-10" />
              </div>
            ) : (
              <img 
                src={image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"} 
                alt={title}
                className="w-full h-full object-cover grayscale group-active:grayscale-0 transition-all duration-1000 group-active:scale-105"
              />
            )}
          </motion.div>
        )}
        
        {/* Decorative shadow */}
        <div className="absolute inset-0 bg-violet-500/10 blur-[100px] -z-10 opacity-0 group-active:opacity-100 transition-opacity duration-1000" />
      </div>
    </motion.div>
  );
};

export const Cases = () => {
  const cases = [
    {
      title: "LUANNA KUSTER",
      category: "SITE INTELIGENTE",
      headline: "SEU SITE. AGORA COM INTELIGÊNCIA.",
      description: "Um projeto digital desenvolvido para transformar presença online em uma experiência profissional e automatizada com IA.",
      recursos: ["DESIGN", "RESPONSIVIDADE", "IA INTEGRADA", "WHATSAPP", "DOMÍNIO", "HOSPEDAGEM"],
      videoUrl: "https://www.youtube.com/embed/kdZs0CfFN8g?playlist=kdZs0CfFN8g",
      isReversed: false
    },
    {
      title: "SERROTINHOS",
      category: "SITE",
      headline: "PRESENÇA DIGITAL QUE APROXIMA.",
      description: "Design personalizado que reflete a atmosfera do bar e restaurante, facilitando o acesso ao cardápio e localização.",
      recursos: ["DESIGN PERSONALIZADO", "RESPONSIVIDADE", "LOCALIZAÇÃO", "CARDÁPIO", "WHATSAPP"],
      videoUrl: "https://www.youtube.com/embed/-acwEcwf4uw?playlist=-acwEcwf4uw",
      isReversed: true
    },
    {
      title: "INVICTA CIDADANIA",
      category: "EXPERIÊNCIA MOBILE-FIRST",
      headline: "A EVOLUÇÃO NA PALMA DA MÃO.",
      description: "Sites projetados com performance extrema para dispositivos móveis. Criamos interfaces que convertem enquanto transmitem autoridade absoluta.",
      recursos: ["UX ESTRATÉGICO", "VELOCIDADE CRÍTICA", "MOBILE-FIRST", "ALTA CONVERSÃO", "DESIGN AUTORAL"],
      image: "https://lh3.googleusercontent.com/d/1Or_8Nit1UB2s4ECS8T_J_TMgesiy0j35",
      isReversed: false,
      isMobile: true
    }
  ];

  return (
    <section id="cases" className="py-24 md:py-32 bg-black px-6 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4"
          >
            PROJETOS QUE <br />
            <span className="text-white/40">FALAM POR NÓS.</span>
          </motion.h2>
        </div>

        <div className="space-y-32 md:space-y-40">
          {cases.map((c, i) => (
            <CaseSection key={c.title} {...c} />
          ))}

          {/* International Case: Advocacia Portugal */}
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/5 border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative group"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <span className="text-[9px] md:text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] md:tracking-[0.5em] mb-4 md:mb-6 block italic">Projeto Internacional.</span>
                <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 md:mb-8 leading-none">
                  Escritório de Advocacia <br />
                  <span className="text-white/30 italic">Portugal</span>
                </h3>
                <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-12 leading-relaxed">
                  Desenvolvimento de site de alto nível para o mercado europeu, demonstrando nossa capacidade de criar experiências digitais para nichos internacionais.
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {["NICHO PROFISSIONAL", "PÚBLICO INTERNACIONAL", "DESIGN SOFISTICADO", "ESTRUTURA PREMIUM", "UX/UI ESTRATÉGICO", "MERCADO EUROPEU"].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-violet-500" />
                      <span className="text-[8px] md:text-[9px] font-bold text-white/60 uppercase tracking-widest">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="aspect-[4/5] bg-black border border-white/10 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl relative">
                 <img 
                   src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800" 
                   alt="Portugal Case" 
                   className="w-full h-full object-cover grayscale opacity-50 group-active:opacity-100 group-active:grayscale-0 transition-all duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                    <div className="text-[8px] md:text-[10px] font-black text-violet-500 uppercase tracking-widest">Nicho Internacional</div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

