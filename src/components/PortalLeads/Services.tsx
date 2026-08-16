import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Smartphone, Globe, MessageSquare, Search, ArrowRight, BarChart3, ShieldCheck, Cpu } from 'lucide-react';
import { Magnetic } from './Magnetic';

const PlanCard = ({ title, price, headline, features, cta, maintenance, isPremium, isIntelligent, demo }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
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

        {/* Marketing & Google Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="bg-[#080808] border border-white/5 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] group"
          >
            <div className="text-[10px] md:text-xs font-black text-violet-500 uppercase tracking-widest mb-6">MARKETING DIGITAL</div>
            <div className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">R$ 400/mês</div>
            <div className="mb-8">
              <span className="text-[8px] md:text-[9px] font-black bg-violet-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">
                Disponível no Plano Premium por R$ 2.000
              </span>
            </div>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase mb-8">SEU MARKETING COM PROFISSIONAL.</h4>
            <p className="text-gray-500 mb-10 italic text-xs md:text-sm">Plano com profissional de marketing acompanhando o projeto.</p>
            <div className="space-y-4 mb-10 md:mb-12">
              {[
                "Planejamento de marketing", "Orientação estratégica", "Organização da comunicação",
                "Direcionamento de conteúdo", "Análise da presença digital", "Ideias de campanhas",
                "Acompanhamento estratégico", "Recomendações de melhoria"
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-500" /> {f}
                </div>
              ))}
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
              className="w-full py-5 md:py-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest active:bg-white/10 transition-all"
            >
              QUERO ESTRATÉGIA →
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="bg-[#080808] border border-white/5 p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] group overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="text-[10px] md:text-xs font-black text-violet-500 uppercase tracking-widest mb-6">GOOGLE ADS</div>
              <div className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">R$ 1.000/mês</div>
              <h4 className="text-xl md:text-2xl font-black text-white uppercase mb-2">SEU CLIENTE JÁ ESTÁ PROCURANDO.</h4>
              <p className="text-white/40 font-bold uppercase tracking-widest mb-6 text-[10px] italic underline">Faça sua empresa aparecer.</p>
              
              <div className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl mb-10 md:mb-12">
                <p className="text-[8px] md:text-[9px] font-black text-violet-500 uppercase tracking-widest text-center leading-relaxed">
                  R$ 1.000/mês é referente à gestão. <br /> O orçamento dos anúncios no Google é separado.
                </p>
              </div>

              <div className="space-y-4 mb-10 md:mb-12">
                {[
                  "Gestão de campanhas", "Pesquisa de palavras-chave", "Criação de anúncios",
                  "Segmentação e Monitoramento", "Otimização e Análise", "Relatórios de desempenho"
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-500" /> {f}
                  </div>
                ))}
              </div>

              {/* Ads Animation */}
              <div className="bg-black/40 border border-white/5 p-5 md:p-6 rounded-3xl mb-10 md:mb-12 flex flex-col items-center gap-4">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <Search className="w-3 h-3 text-violet-500" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase text-white/40 tracking-widest">Busca do cliente</span>
                 </div>
                 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-violet-500 rotate-90" />
                 <div className="px-4 py-2 bg-violet-600 rounded-xl">
                    <span className="text-[7px] md:text-[8px] font-black uppercase text-white tracking-widest">Seu Anúncio</span>
                 </div>
                 <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-violet-500 rotate-90" />
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase text-white tracking-widest">Novo Contato</span>
                 </div>
              </div>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
                className="w-full py-5 md:py-6 bg-violet-600 rounded-2xl text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest active:scale-[1.02] transition-all"
              >
                COMEÇAR CAMPANHA →
              </motion.button>
            </div>
          </motion.div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto relative">
             {["SITE", "IA", "MARKETING", "GOOGLE ADS"].map((item, i) => (
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

        {/* Premium Project */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white p-10 md:p-24 rounded-[3rem] md:rounded-[4rem] text-black text-center mb-24 md:mb-32 relative overflow-hidden"
        >
          <div className="absolute top-8 right-8 md:top-12 md:right-12 bg-black text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest">
            Combo Completo
          </div>
          <div className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-8">PROJETO DIGITAL PREMIUM</div>
          <div className="text-5xl md:text-8xl font-black tracking-tighter mb-4">R$ 2.000</div>
          <div className="flex flex-col gap-1 mb-10 md:mb-12 items-center">
            <span className="text-[8px] md:text-[10px] font-black text-black/40 uppercase tracking-widest">Manutenção</span>
            <span className="text-xl md:text-2xl font-black text-black tracking-tighter italic underline">R$ 250/mês</span>
          </div>
          <h4 className="text-xl md:text-4xl font-black uppercase mb-10 md:mb-12 px-4 leading-tight">ESTRUTURA COMPLETA DE VENDAS.</h4>
          
          <div className="max-w-3xl mx-auto mb-10 md:mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left px-4">
             {[
               "Site Inteligente (IA)",
               "Gestão de Tráfego Pago",
               "Plano de Marketing",
               "Relatório Mensal Excel",
               "Reunião de Alinhamento",
               "Consultoria Estratégica"
             ].map(f => (
               <div key={f} className="flex items-center gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-black">
                 <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-violet-600" /> {f}
               </div>
             ))}
          </div>

          <div className="bg-black/5 border border-black/10 p-5 md:p-6 rounded-2xl md:rounded-3xl mb-10 md:mb-12 inline-block mx-4">
             <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-relaxed">
               ⭐ CONDIÇÃO ESPECIAL: Pague o Marketing apenas 30 dias depois.
             </p>
          </div>

          <p className="text-base md:text-2xl font-black uppercase tracking-tight max-w-4xl mx-auto mb-12 px-6">“NÃO É APENAS UM SITE. É UMA MÁQUINA DE VENDAS TRABALHANDO 24H PARA VOCÊ.”</p>
          
          <Magnetic>
             <motion.button 
               whileTap={{ scale: 0.95 }}
               onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
               className="w-full md:w-auto px-10 md:px-16 py-6 md:py-8 bg-black text-white rounded-2xl md:rounded-3xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-xl"
             >
               GARANTIR MEU PLANO PREMIUM
             </motion.button>
          </Magnetic>
        </motion.div>

        {/* Comparison Table */}
        <div className="overflow-x-auto pb-12 px-2">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[800px]">
             <thead>
                <tr className="border-b border-white/10">
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Recurso</th>
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest px-4">Site Essencial</th>
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-violet-500 uppercase tracking-widest px-4">Site Inteligente</th>
                   <th className="py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-200 uppercase tracking-widest px-4">Projeto Premium</th>
                </tr>
             </thead>
             <tbody className="text-white/60">
                {[
                  ["Design Personalizado", "✓", "✓", "Exclusivo"],
                  ["Responsividade", "✓", "✓", "Avançada"],
                  ["WhatsApp", "✓", "✓", "✓"],
                  ["IA Integrada", "—", "✓", "Customizada"],
                  ["Domínio", "—", "✓", "✓"],
                  ["Hospedagem", "—", "✓", "Premium"],
                  ["UX/UI Strategy", "—", "—", "✓"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 active:bg-white/[0.02] transition-colors">
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-4">{row[0]}</td>
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-bold px-4">{row[1]}</td>
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-black text-violet-500 px-4">{row[2]}</td>
                     <td className="py-5 md:py-6 text-[9px] md:text-[10px] font-bold text-white px-4">{row[3]}</td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
