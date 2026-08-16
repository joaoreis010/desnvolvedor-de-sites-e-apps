import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Smartphone, Globe, MessageSquare, Search, ArrowRight, BarChart3, ShieldCheck, Cpu } from 'lucide-react';
import { Magnetic } from './Magnetic';

const PlanCard = ({ title, price, headline, features, cta, maintenance, isPremium, isIntelligent, demo }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col relative overflow-hidden group border transition-all duration-500 ${isPremium ? 'bg-white text-black border-white' : isIntelligent ? 'bg-violet-600 border-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.3)]' : 'bg-[#0f0f0f] border-white/5'}`}
  >
    {isIntelligent && (
      <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-black text-violet-400 px-3 py-1 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] animate-pulse">
        ⭐ MAIS COMPLETO
      </div>
    )}
    <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${isPremium ? 'text-black/40' : isIntelligent ? 'text-violet-900' : 'text-gray-500'}`}>{title}</div>
    <div className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 ${isPremium ? 'text-black' : isIntelligent ? 'text-black' : 'text-white'}`}>{price}</div>
    <div className="mb-8 self-start">
       <div className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${isPremium ? 'text-black/60' : isIntelligent ? 'text-violet-950' : 'text-violet-500'}`}>{maintenance}</div>
    </div>
    <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight mb-8 ${isPremium ? 'text-black' : isIntelligent ? 'text-violet-950' : 'text-white'}`}>{headline}</h3>
    
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((item: string) => (
        <li key={item} className={`flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isPremium ? 'text-black/80' : isIntelligent ? 'text-violet-950' : 'text-gray-300'}`}>
          <Check className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isPremium ? 'text-black' : isIntelligent ? 'text-black' : 'text-violet-500'}`} /> {item}
        </li>
      ))}
    </ul>

    {demo && <div className="mb-10">{demo}</div>}

    <Magnetic>
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
        className={`w-full py-5 md:py-6 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${isPremium ? 'bg-black text-white' : isIntelligent ? 'bg-black text-white' : 'bg-white/5 border border-white/10 text-white active:bg-white/10'}`}
      >
        {cta}
      </motion.button>
    </Magnetic>
  </motion.div>
);

const IADemo = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Olá! Como posso ajudar você hoje?' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', text: 'Quais os serviços da Portal Leads?' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: 'Nós criamos sites inteligentes, landing pages e gestão de tráfego pago.' }]);
      }, 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black/20 rounded-3xl p-5 md:p-6 border border-black/10">
      <div className="flex items-center gap-2 mb-4 border-b border-black/5 pb-2">
        <Cpu className="w-3 h-3 md:w-4 md:h-4 text-black" />
        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-black/60">IA Atendimento On-line</span>
      </div>
      <div className="space-y-3 h-28 md:h-32 overflow-hidden flex flex-col justify-end">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[8px] md:text-[9px] p-2 rounded-xl max-w-[85%] ${m.role === 'bot' ? 'bg-black text-white self-start' : 'bg-violet-950 text-white self-end'}`}
          >
            {m.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <section id="investimento" className="py-24 md:py-32 bg-black px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32 max-w-6xl mx-auto">
          <PlanCard 
            title="SITE ESSENCIAL"
            price="R$ 649"
            headline="COMECE PROFISSIONAL."
            maintenance="Manutenção: R$ 50/mês"
            features={[
              "✓ Site personalizado",
              "✓ Design moderno",
              "✓ Responsividade",
              "✓ Integração com WhatsApp",
              "✓ Botões de contato",
              "✓ Estrutura profissional",
              "✓ Publicação"
            ]}
            cta="CRIAR MEU PROJETO →"
          />

          <PlanCard 
            title="SITE INTELIGENTE"
            price="R$ 839"
            headline="SEU SITE. AGORA COM INTELIGÊNCIA."
            maintenance="Manutenção + Infra: R$ 150/mês"
            isIntelligent
            features={[
              "✓ Tudo do Site Essencial",
              "✓ IA integrada ao site",
              "✓ Vídeos com IA",
              "✓ Domínio próprio",
              "✓ Hospedagem própria",
              "✓ Design personalizado",
              "✓ Responsividade",
              "✓ Integrações",
              "✓ Configuração inicial"
            ]}
            demo={<IADemo />}
            cta="QUERO UM SITE INTELIGENTE →"
          />
        </div>

        {/* Ecosystem Section */}
        <div className="py-24 md:py-32 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12"
          >
            CONSTRUA SEU <br />
            <span className="text-violet-500">ECOSSISTEMA DIGITAL.</span>
          </motion.h3>
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto relative">
             {["SITE", "IA"].map((item, i) => (
               <motion.div 
                 key={item}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl"
               >
                  <span className="text-[10px] md:text-xs font-black text-white tracking-widest">{item}</span>
               </motion.div>
             ))}
             <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-violet-500 to-transparent absolute" />
             </div>
          </div>
          <p className="mt-12 text-white/40 font-bold uppercase tracking-[0.3em] text-[8px] md:text-[10px]">UMA PRESENÇA DIGITAL COMPLETA.</p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-12 px-2">
          <table className="w-full text-left border-collapse min-w-[600px] md:min-w-[700px]">
             <thead>
                <tr className="border-b border-white/10">
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Recurso</th>
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest px-4">Site Essencial</th>
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-violet-500 uppercase tracking-widest px-4">Site Inteligente</th>
                </tr>
             </thead>
             <tbody className="text-white/60">
                {[
                  ["Design Personalizado", "✓", "✓"],
                  ["Responsividade", "✓", "✓"],
                  ["WhatsApp", "✓", "✓"],
                  ["IA Integrada", "—", "✓"],
                  ["Domínio", "—", "✓"],
                  ["Hospedagem", "—", "✓"],
                  ["Vídeos com IA", "—", "✓"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 active:bg-white/[0.02] transition-colors">
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-4">{row[0]}</td>
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-bold px-4">{row[1]}</td>
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-black text-violet-500 px-4">{row[2]}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
