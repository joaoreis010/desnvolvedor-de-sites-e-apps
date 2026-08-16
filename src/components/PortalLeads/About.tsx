import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Magnetic } from './Magnetic';

export const Positioning = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pillars = [
    { name: "DESIGN", delay: 0 },
    { name: "TECNOLOGIA", delay: 0.1 },
    { name: "IA", delay: 0.2 },
    { name: "MARKETING", delay: 0.3 }
  ];

  return (
    <section 
      id="posicionamento"
      ref={containerRef}
      className="relative bg-black py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none"
          >
            DIGITAL, FEITO PARA <br />
            <span className="text-white/40">POSICIONAR.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-xl font-bold uppercase tracking-[0.2em] max-w-2xl px-4"
          >
            Sites, experiências digitais, IA, tráfego pago e marketing para empresas que querem crescer.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
          {pillars.map((pillar) => (
            <motion.div 
              key={pillar.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: pillar.delay, duration: 0.8 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 border border-white/10 aspect-square flex items-center justify-center rounded-2xl md:rounded-3xl group active:bg-white active:border-white transition-all duration-500"
            >
              <span className="text-sm md:text-2xl font-black text-white group-active:text-black tracking-widest">{pillar.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  const team = [
    {
      name: "JOÃO REIS",
      role: "PROGRAMADOR E DESENVOLVEDOR WEB",
      bio: "Especializado na criação de sites, landing pages, experiências digitais e soluções com IA.",
      skills: ["Programação", "Desenvolvimento Web", "IA", "Experiência Digital"],
      image: "https://lh3.googleusercontent.com/d/1jutIjBoMQUTYB3LAQWGSZ4brR12kgSnf",
      position: "object-center"
    },
    {
      name: "EDUARDO RESENDE",
      role: "PROGRAMADOR E WEB DESIGNER",
      bio: "Capacidade de criar sites de alto nível e projetos para nichos internacionais, incluindo projetos desenvolvidos para escritórios de advocacia em Portugal.",
      highlight: "PROJETOS INTERNACIONAIS",
      case: "Escritório de Advocacia em Portugal",
      skills: ["Programação", "Web Design", "Interfaces Premium", "Desenvolvimento Sob Medida"],
      image: "https://lh3.googleusercontent.com/d/1Bo7-xwIcRPdfeuihSf7hVJ6RDg4Rc-5a",
      position: "object-top"
    }
  ];

  return (
    <section id="sobre" className="py-24 md:py-32 bg-[#050505] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6"
          >
            DUAS VISÕES. <br />
            <span className="text-white/30 tracking-[0.1em]">UMA EXPERIÊNCIA DIGITAL.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-violet-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs"
          >
            PROGRAMAÇÃO + WEB DESIGN + TECNOLOGIA + EXPERIÊNCIA DIGITAL.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32">
          {team.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col"
            >
              <div className="aspect-[4/5] bg-white/5 rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/10 group relative mb-8 md:mb-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-40" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${member.position || 'object-center'} grayscale group-active:grayscale-0 transition-all duration-700 group-active:scale-105 ${member.name === 'EDUARDO RESENDE' ? 'translate-y-[-10%]' : ''}`}
                />
                {member.highlight && (
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                    <div className="bg-white text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {member.highlight}
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">{member.name}</h3>
              <p className="text-white/40 font-bold uppercase tracking-widest mb-6 text-[10px] md:text-sm">{member.role}</p>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8 md:mb-10">{member.bio}</p>
              
              {member.case && (
                <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl mb-8 md:mb-10">
                  <span className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] block mb-2">Case Study Highlight</span>
                  <p className="text-white font-bold uppercase tracking-widest text-[10px] md:text-sm">{member.case}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 md:gap-3">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-full text-[8px] md:text-[10px] font-bold text-white/60 uppercase tracking-widest border border-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

