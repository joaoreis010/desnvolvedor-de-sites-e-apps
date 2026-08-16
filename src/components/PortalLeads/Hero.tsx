import React, { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';

interface ParticleProps {
  p: {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  };
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const Particle = ({ p, mouseX, mouseY }: ParticleProps) => {
  const x = useTransform(mouseX, [-20, 20], [p.id % 2 === 0 ? 30 : -30, p.id % 2 === 0 ? -30 : 30]);
  const y = useTransform(mouseY, [-20, 20], [p.id % 3 === 0 ? 30 : -30, p.id % 3 === 0 ? -30 : 30]);

  return (
    <motion.div
      className="absolute rounded-full bg-white/20"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        x,
        y,
      }}
      animate={{
        opacity: [0.1, 0.4, 0.1],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

interface TechBackgroundProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollY: MotionValue<number>;
}

const TechBackground = ({ mouseX, mouseY, scrollY }: TechBackgroundProps) => {
  const points = useMemo(() => Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 10
  })), []);

  const gridRotateX = useTransform(mouseY, [-20, 20], [15, -15]);
  const gridRotateY = useTransform(mouseX, [-20, 20], [-15, 15]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 01: Distant Fog/Gradient */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />
      
      {/* Layer 02: 3D Digital Mesh */}
      <motion.div 
        style={{ 
          rotateX: gridRotateX, 
          rotateY: gridRotateY,
          y: gridY,
          perspective: 1000 
        }}
        className="absolute inset-0 flex items-center justify-center opacity-10"
      >
        <div className="w-[200%] h-[200%] border-[0.5px] border-white/10" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', 
               backgroundSize: '100px 100px' 
             }} 
        />
      </motion.div>

      {/* Layer 03: Particles & Connections */}
      <div className="absolute inset-0">
        {points.map((p) => (
          <Particle key={p.id} p={p} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Surgical Green Light Points */}
      <div className="absolute top-1/4 left-1/3 w-[2px] h-[2px] bg-green-500 shadow-[0_0_80px_30px_rgba(34,197,94,0.08)]" />
      <div className="absolute bottom-1/3 right-1/4 w-[2px] h-[2px] bg-green-500 shadow-[0_0_120px_40px_rgba(34,197,94,0.05)]" />
      
      {/* Dynamic Light Beams */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45"
      />
    </div>
  );
};

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stage, setStage] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollY } = useScroll();
  
  const scaleVisto = useTransform(scrollY, [0, 400], [1, 0.9]);
  const yVisto = useTransform(scrollY, [0, 400], [0, -50]);
  const opacityVisto = useTransform(scrollY, [0, 300], [1, 0]);

  const scaleSeja = useTransform(scrollY, [0, 450], [1, 0.95]);
  const ySeja = useTransform(scrollY, [0, 450], [0, -100]);
  const opacitySeja = useTransform(scrollY, [100, 400], [1, 0]);

  const scaleLembrado = useTransform(scrollY, [0, 800], [1, 1.1]);
  const yLembrado = useTransform(scrollY, [0, 800], [0, 50]);
  const opacityLembrado = useTransform(scrollY, [400, 800], [1, 0]);
  const rotateXLembrado = useTransform(springY, [-20, 20], [10, -10]);
  const rotateYLembrado = useTransform(springX, [-20, 20], [-10, 10]);
  const xLembrado = useTransform(springX, v => v * 1.2);

  const globalBlur = useTransform(scrollY, [0, 500], [0, 20]);
  const globalOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const globalScale = useTransform(scrollY, [0, 800], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Cinematic Reveal Sequence
    const timers = [
      setTimeout(() => setStage(1), 300),  // Initial points
      setTimeout(() => setStage(2), 800), // Connections
      setTimeout(() => setStage(3), 1200), // Light sweep
      setTimeout(() => setStage(4), 1600), // SEJA VISTO
      setTimeout(() => setStage(5), 2000), // SEJA
      setTimeout(() => setStage(6), 2400), // LEMBRADO
    ];

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      timers.forEach(clearTimeout);
    };
  }, [mouseX, mouseY]);

  const ButtonWrapper = ({ children }: { children: React.ReactElement }) => {
    if (isMobile) return <motion.div whileTap={{ scale: 0.95 }}>{children}</motion.div>;
    return <Magnetic strength={0.3}>{children}</Magnetic>;
  };

  const lembradoText = "LEMBRADO.";
  const charVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(20px)', scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        delay: (isMobile ? 1.5 : 2.4) + i * 0.08,
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section className="relative min-h-[120vh] md:min-h-[150vh] flex flex-col items-center justify-start overflow-hidden bg-black pt-[20vh] md:pt-[25vh] selection:bg-white selection:text-black perspective-[1500px]">
      <TechBackground mouseX={springX} mouseY={springY} scrollY={scrollY} />

      {/* Stage 03: Light behind LEMBRADO */}
      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[80vw] h-[30vh] md:h-[40vh] bg-violet-500/[0.05] rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      <motion.div 
        style={{ 
          filter: useTransform(globalBlur, v => `blur(${v}px)`), 
          opacity: globalOpacity,
          scale: globalScale
        }}
        className="relative z-10 w-full max-w-[1600px] mx-auto px-6 flex flex-col items-center"
      >
        <div className="flex flex-col w-full space-y-4 md:space-y-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4 md:mb-8"
          >
            <span className="text-[9px] md:text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] md:tracking-[0.6em] italic">
              CRIAMOS PRESENÇA DIGITAL.
            </span>
          </motion.div>

          {/* SEJA VISTO. */}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                style={{ y: yVisto, scale: scaleVisto, opacity: opacityVisto }}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 0.2, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full text-center"
              >
                <h2 className="text-[12vw] md:text-[6vw] font-black text-white tracking-tighter uppercase leading-none opacity-40 md:opacity-100">
                  SEJA VISTO.
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEJA LEMBRADO. */}
          <AnimatePresence>
            {stage >= 6 && (
              <motion.div
                style={{ 
                  x: isMobile ? 0 : xLembrado,
                  y: yLembrado, 
                  scale: scaleLembrado, 
                  opacity: opacityLembrado,
                  rotateX: isMobile ? 0 : rotateXLembrado,
                  rotateY: isMobile ? 0 : rotateYLembrado,
                  transformStyle: "preserve-3d"
                }}
                className="relative group cursor-default"
              >
                <div className="flex flex-col items-center">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ delay: isMobile ? 1.2 : 2, duration: 1 }}
                    className="text-[10vw] md:text-[5vw] font-black text-white/10 uppercase tracking-tighter mb-[-3vw] md:mb-[-2vw]"
                  >
                    SEJA
                  </motion.span>
                  <h1 className="text-[17vw] md:text-[15vw] font-black text-white leading-none tracking-tighter uppercase flex relative z-10">
                    {lembradoText.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        custom={i}
                        variants={charVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-white to-violet-400 animate-gradient-x"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h1>
                </div>
                
                <div className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-4 overflow-visible pointer-events-none">
                  <svg width="100%" height="20" viewBox="0 0 800 20" fill="none" preserveAspectRatio="none" className="w-full">
                    <motion.path
                      d="M0 10C100 10 200 2 400 2C600 2 700 18 800 18"
                      stroke="rgba(139, 92, 246, 0.4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: isMobile ? 2.5 : 4, duration: 2, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: stage >= 6 ? 1 : 0, y: stage >= 6 ? 0 : 40, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-24 md:mt-40"
        >
          <ButtonWrapper>
            <button 
              onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
              className="group relative bg-white text-black px-12 md:px-20 py-6 md:py-9 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-4">
                Criar meu projeto <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </button>
          </ButtonWrapper>
        </motion.div>
      </motion.div>

      {/* Details Indicators */}
      <div className="fixed bottom-10 left-10 hidden lg:flex flex-col gap-1 z-20 opacity-40">
        <span className="text-[9px] font-black text-white uppercase tracking-[0.5em]">System Status: Online</span>
        <span className="text-[8px] font-bold text-green-500 uppercase tracking-[0.2em]">Core Active</span>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
        className="fixed bottom-10 right-10 hidden lg:block z-20"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">SCROLL TO EXPLORE ↓</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-20 bg-gradient-to-b from-violet-500/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};



