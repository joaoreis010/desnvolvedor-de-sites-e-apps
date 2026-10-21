import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Zap, Smartphone, Globe, MessageSquare, Search, ArrowRight, BarChart3, ShieldCheck, Cpu, ChevronDown, ChevronUp, HelpCircle, Sparkles, Server, Palette } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { PILLARS_DATA, ExplainerModal, PillarData } from './PillarsExplainer';

interface FeatureItem {
  name: string;
  desc?: string;
  pillarId?: string;
}

interface PlanCardProps {
  title: string;
  price: string;
  headline: string;
  features: (string | FeatureItem)[];
  cta: string;
  maintenance: string;
  isPremium?: boolean;
  isIntelligent?: boolean;
  demo?: React.ReactNode;
  onOpenPillarModal?: (pillarId: string) => void;
}

const PlanCard = ({ title, price, headline, features, cta, maintenance, isPremium, isIntelligent, demo, onOpenPillarModal }: PlanCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className={`p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col relative overflow-hidden group border transition-all duration-500 ${isPremium ? 'bg-white text-black border-white' : isIntelligent ? 'bg-violet-600 border-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.3)]' : 'bg-[#0f0f0f] border-white/5'}`}
  >
    {isIntelligent && (
      <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-black text-violet-400 px-3.5 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5 animate-pulse">
        <Sparkles size={11} /> MAIS COMPLETO COM IA
      </div>
    )}
    <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${isPremium ? 'text-black/40' : isIntelligent ? 'text-violet-900' : 'text-gray-500'}`}>{title}</div>
    <div className={`text-5xl md:text-6xl font-black tracking-tighter mb-2 ${isPremium ? 'text-black' : isIntelligent ? 'text-black' : 'text-white'}`}>{price}</div>
    <div className="mb-6 self-start">
       <div className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${isPremium ? 'text-black/60' : isIntelligent ? 'text-violet-950' : 'text-violet-500'}`}>{maintenance}</div>
    </div>
    <h3 className={`text-lg md:text-xl font-black uppercase tracking-tight mb-8 ${isPremium ? 'text-black' : isIntelligent ? 'text-violet-950' : 'text-white'}`}>{headline}</h3>
    
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((item, idx) => {
        const isObject = typeof item === 'object';
        const label = isObject ? item.name : item;
        const desc = isObject ? item.desc : null;
        const pillarId = isObject ? item.pillarId : null;

        return (
          <li key={idx} className="flex flex-col gap-1">
            <div className={`flex items-center justify-between gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isPremium ? 'text-black/80' : isIntelligent ? 'text-violet-950' : 'text-gray-300'}`}>
              <span className="flex items-center gap-2.5">
                <Check className={`w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 ${isPremium ? 'text-black' : isIntelligent ? 'text-black' : 'text-violet-500'}`} /> 
                <span>{label}</span>
              </span>
              {pillarId && onOpenPillarModal && (
                <button
                  type="button"
                  onClick={() => onOpenPillarModal(pillarId)}
                  className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                    isIntelligent 
                      ? 'bg-black/20 text-black hover:bg-black hover:text-white' 
                      : 'bg-white/10 text-violet-400 hover:bg-violet-500 hover:text-black'
                  }`}
                  title="Clique para entender o que é e os benefícios"
                >
                  <HelpCircle size={10} /> O que é?
                </button>
              )}
            </div>
            {desc && (
              <span className={`text-[9px] pl-6 md:pl-6 leading-relaxed ${isIntelligent ? 'text-violet-950/80 font-medium' : 'text-gray-400 font-normal'}`}>
                {desc}
              </span>
            )}
          </li>
        );
      })}
    </ul>

    {demo && <div className="mb-10">{demo}</div>}

    <Magnetic>
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
        className={`w-full py-5 md:py-6 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${isPremium ? 'bg-black text-white' : isIntelligent ? 'bg-black text-white hover:bg-zinc-900 shadow-xl' : 'bg-white/5 border border-white/10 text-white active:bg-white/10 hover:border-violet-500/50'}`}
      >
        {cta}
      </motion.button>
    </Magnetic>
  </motion.div>
);

const IADemo = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Olá! Sou a IA da sua empresa. Como posso acelerar seu atendimento hoje?' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', text: 'Vocês criam sites com domínio e hospedagem?' }]);
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: 'Sim! Entregamos com domínio próprio, hospedagem de alta performance, design exclusivo e inteligência artificial.' }]);
      }, 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black/25 backdrop-blur-sm rounded-3xl p-5 md:p-6 border border-black/15 shadow-inner">
      <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-black" />
          <span className="text-[8px] font-black uppercase tracking-widest text-black/80">IA de Atendimento 24h</span>
        </div>
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
      </div>
      <div className="space-y-3 h-32 overflow-hidden flex flex-col justify-end">
        {messages.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[8.5px] md:text-[9.5px] p-2.5 rounded-xl max-w-[85%] leading-relaxed ${m.role === 'bot' ? 'bg-black text-white self-start shadow-md' : 'bg-violet-950 text-white self-end font-semibold'}`}
          >
            {m.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface TableFeature {
  name: string;
  essential: string;
  intelligent: string;
  pillarId?: string;
  explanation: {
    whatIs: string;
    benefit: string;
  };
}

export const Services = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const handleOpenPillarModal = (pillarId: string) => {
    const found = PILLARS_DATA.find(p => p.id === pillarId);
    if (found) {
      setSelectedPillar(found);
    }
  };

  const toggleRow = (index: number) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const comparisonData: TableFeature[] = [
    {
      name: "Design Personalizado",
      essential: "✓ Incluso",
      intelligent: "✓ Exclusivo & Avançado",
      pillarId: "design",
      explanation: {
        whatIs: "Uma identidade visual desenhada exclusivamente para sua marca, sem modelos prontos ou sites iguais aos da concorrência.",
        benefit: "Aumenta em até 300% a percepção de valor dos seus serviços, permitindo que você cobre preços maiores com confiança."
      }
    },
    {
      name: "Responsividade Total",
      essential: "✓ Incluso",
      intelligent: "✓ Mobile-First Cirúrgico",
      pillarId: "responsividade",
      explanation: {
        whatIs: "Engenharia de layout que se adapta automaticamente a celulares, tablets, notebooks e computadores de qualquer tamanho.",
        benefit: "Mais de 80% dos clientes compram pelo smartphone. A responsividade garante que ninguém abandone o site por texto cortado."
      }
    },
    {
      name: "Integração com WhatsApp",
      essential: "✓ Incluso",
      intelligent: "✓ Incluso + Rastreamento",
      explanation: {
        whatIs: "Botões de clique rápido que direcionam o visitante direto para a conversa no WhatsApp da sua equipe comercial.",
        benefit: "Encurta o caminho entre o interesse do cliente e o fechamento da venda, gerando leads quentes no mesmo minuto."
      }
    },
    {
      name: "IA Integrada ao Site",
      essential: "— Não Incluso",
      intelligent: "✓ Inteligência Ativa 24h",
      pillarId: "ia",
      explanation: {
        whatIs: "Inteligência artificial conectada para responder dúvidas e interagir com clientes instantaneamente a qualquer hora do dia ou da noite.",
        benefit: "Sua empresa nunca perde vendas por demora no atendimento, mesmo nos finais de semana ou altas horas da madrugada."
      }
    },
    {
      name: "Domínio Próprio",
      essential: "— À parte",
      intelligent: "✓ Incluso (ex: suaempresa.com.br)",
      pillarId: "dominio",
      explanation: {
        whatIs: "O endereço oficial exclusivo da sua empresa na internet (ex: www.suaempresa.com.br) registrado e configurado.",
        benefit: "Transmite autoridade profissional, elimina links amadores e permite e-mails corporativos que fecham mais negócios."
      }
    },
    {
      name: "Hospedagem de Alta Performance",
      essential: "— À parte",
      intelligent: "✓ Inclusa (Servidor Ultraveloz)",
      pillarId: "hospedagem",
      explanation: {
        whatIs: "O servidor seguro e veloz onde todos os arquivos e imagens ficam guardados para manter o site no ar 24h por dia.",
        benefit: "Site ultrarrápido que abre em menos de 2 segundos, com certificado de segurança SSL e 99.9% de estabilidade garantida."
      }
    }
  ];

  return (
    <section id="investimento" className="py-24 md:py-32 bg-black px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-violet-500 uppercase tracking-[0.4em] mb-4 block"
          >
            Investimento Transparente
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6"
          >
            Escolha o Nível da Sua <br />
            <span className="text-violet-500">Presença Digital.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm md:text-base leading-relaxed"
          >
            Projetos completos com design exclusivo, velocidade máxima e a mais nova tecnologia em IA. <br className="hidden md:inline" />
            <span className="text-violet-400 font-bold">Clique em "O que é?" em qualquer item para entender o benefício real para o seu negócio.</span>
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-32 max-w-6xl mx-auto">
          <PlanCard 
            title="SITE ESSENCIAL"
            price="R$ 649"
            headline="COMECE PROFISSIONAL."
            maintenance="Manutenção técnica: R$ 50/mês"
            features={[
              { 
                name: "Design Personalizado", 
                desc: "Identidade visual autoral, sem templates prontos batidos.",
                pillarId: "design"
              },
              { 
                name: "Responsividade Total", 
                desc: "Navegação perfeita e rápida no celular, tablet e computador.",
                pillarId: "responsividade"
              },
              { 
                name: "Integração Direta com WhatsApp", 
                desc: "Botões de contato estratégico para gerar conversas imediatas." 
              },
              { 
                name: "Estrutura Profissional", 
                desc: "Páginas leves, organizadas e focadas em conversão rápida." 
              },
              { 
                name: "Publicação & Testes Rigorosos", 
                desc: "Colocamos no ar com validação de performance em todos os aparelhos." 
              }
            ]}
            onOpenPillarModal={handleOpenPillarModal}
            cta="CRIAR MEU PROJETO ESSENCIAL →"
          />

          <PlanCard 
            title="SITE INTELIGENTE"
            price="R$ 839"
            headline="SEU SITE. AGORA COM INTELIGÊNCIA."
            maintenance="Manutenção + Hospedagem + Infra: R$ 150/mês"
            isIntelligent
            features={[
              { 
                name: "Tudo do Site Essencial", 
                desc: "Design exclusivo, responsividade total e foco em vendas." 
              },
              { 
                name: "Domínio Próprio Incluso", 
                desc: "Seu endereço oficial na web (ex: suaempresa.com.br) configurado.",
                pillarId: "dominio"
              },
              { 
                name: "Hospedagem de Alta Performance", 
                desc: "Servidor ultraveloz 24h, segurança SSL e estabilidade máxima.",
                pillarId: "hospedagem"
              },
              { 
                name: "IA Integrada ao Site", 
                desc: "Atendimento inteligente 24h que responde dúvidas e captura clientes.",
                pillarId: "ia"
              },
              { 
                name: "Design Personalizado Avançado", 
                desc: "Acabamento de luxo e microinterações que geram admiração imediata.",
                pillarId: "design"
              },
              { 
                name: "Responsividade Mobile-First", 
                desc: "Pensado primeiro no dedo do cliente que navega no smartphone.",
                pillarId: "responsividade"
              },
              { 
                name: "Configuração & Suporte Total", 
                desc: "Cuidamos de tudo para você não se preocupar com detalhes técnicos." 
              }
            ]}
            demo={<IADemo />}
            onOpenPillarModal={handleOpenPillarModal}
            cta="QUERO UM SITE INTELIGENTE →"
          />
        </div>

        {/* Quick Link to Explainer */}
        <div className="mb-20 text-center">
          <a
            href="#pilares"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all text-xs font-black uppercase tracking-widest group"
          >
            <span>Quer entender o que é Hospedagem, Domínio, Responsividade e IA em detalhes?</span>
            <span className="text-violet-400 group-hover:translate-x-1 transition-transform">Ver Guia Descomplicado ↓</span>
          </a>
        </div>

        {/* Ecosystem Section */}
        <div className="py-16 md:py-24 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8"
          >
            CONSTRUA SEU <br />
            <span className="text-violet-500">ECOSSISTEMA DIGITAL.</span>
          </motion.h3>
          <p className="text-gray-400 text-xs md:text-sm uppercase tracking-[0.2em] max-w-xl mx-auto mb-12">
            A união perfeita entre um site deslumbrante e o poder da inteligência artificial trabalhando pela sua empresa.
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto relative">
             {[
               { name: "SITE DE ALTA CONVERSÃO", desc: "Design autoral + Hospedagem ultrarrápida + Responsivo" },
               { name: "IA INTEGRADA & AUTOMAÇÃO", desc: "Atendimento 24h + Qualificação contínua de clientes" }
             ].map((item, i) => (
               <motion.div 
                 key={item.name}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl text-left"
               >
                  <span className="text-[10px] md:text-xs font-black text-white tracking-widest block mb-2">{item.name}</span>
                  <span className="text-[9px] text-gray-400 leading-relaxed block">{item.desc}</span>
               </motion.div>
             ))}
             <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-violet-500 to-transparent absolute" />
             </div>
          </div>
        </div>

        {/* Comparison Table with Interactive Explanations */}
        <div className="mt-12 bg-[#080808] border border-white/10 rounded-[2.5rem] p-6 md:p-12 overflow-hidden">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                Comparativo Detalhado de Recursos
              </h3>
              <p className="text-gray-400 text-xs md:text-sm mt-1">
                Toque em qualquer recurso para abrir a explicação simplificada e entender por que ele importa.
              </p>
            </div>
            <div className="flex items-center gap-2 text-violet-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={14} /> Transparência Total
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
               <thead>
                  <tr className="border-b border-white/10">
                     <th className="py-4 md:py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Recurso & Explicação</th>
                     <th className="py-4 md:py-6 text-[10px] font-black text-white uppercase tracking-widest px-4">Site Essencial</th>
                     <th className="py-4 md:py-6 text-[10px] font-black text-violet-400 uppercase tracking-widest px-4">Site Inteligente</th>
                     <th className="py-4 md:py-6 text-[10px] font-black text-gray-500 uppercase tracking-widest px-4 text-right">Detalhes</th>
                  </tr>
               </thead>
               <tbody>
                  {comparisonData.map((row, i) => {
                    const isExpanded = !!expandedRows[i];
                    return (
                      <React.Fragment key={i}>
                        <tr 
                          onClick={() => toggleRow(i)}
                          className={`border-b border-white/5 cursor-pointer transition-colors ${
                            isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                          }`}
                        >
                           <td className="py-4 md:py-5 px-4">
                             <div className="flex items-center gap-2">
                               <span className="text-[10px] md:text-xs font-black uppercase tracking-wide text-white">
                                 {row.name}
                               </span>
                               {row.pillarId && (
                                 <span className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                                   Pilar
                                 </span>
                               )}
                             </div>
                           </td>
                           <td className="py-4 md:py-5 text-[10px] md:text-xs font-bold px-4 text-gray-300">
                             {row.essential}
                           </td>
                           <td className="py-4 md:py-5 text-[10px] md:text-xs font-black text-violet-400 px-4">
                             {row.intelligent}
                           </td>
                           <td className="py-4 md:py-5 px-4 text-right">
                             <button
                               type="button"
                               className="text-gray-400 hover:text-white transition-colors p-1"
                               aria-label="Expandir detalhes"
                             >
                               {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                             </button>
                           </td>
                        </tr>

                        {isExpanded && (
                          <tr className="border-b border-white/5 bg-violet-950/10">
                            <td colSpan={4} className="p-5 md:p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block mb-1">
                                    O Que É:
                                  </span>
                                  <p className="text-gray-300 leading-relaxed">
                                    {row.explanation.whatIs}
                                  </p>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-violet-500/20">
                                  <span className="text-[8px] font-black uppercase tracking-widest text-violet-400 block mb-1 flex items-center gap-1">
                                    <Sparkles size={11} /> Impacto no Seu Faturamento:
                                  </span>
                                  <p className="text-violet-200/90 leading-relaxed font-medium">
                                    {row.explanation.benefit}
                                  </p>
                                </div>
                              </div>
                              {row.pillarId && (
                                <div className="mt-3 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenPillarModal(row.pillarId!);
                                    }}
                                    className="text-[9px] font-black uppercase tracking-wider text-violet-400 hover:text-violet-300 underline"
                                  >
                                    Ver explicação completa e analogia deste recurso →
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
               </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Modal */}
      <ExplainerModal 
        pillar={selectedPillar} 
        onClose={() => setSelectedPillar(null)} 
      />
    </section>
  );
};
