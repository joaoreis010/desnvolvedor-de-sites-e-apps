import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Server, Palette, Smartphone, Bot, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, HelpCircle, X } from 'lucide-react';
import { Magnetic } from './Magnetic';

export interface PillarData {
  id: string;
  name: string;
  shortTag: string;
  headline: string;
  icon: React.ElementType;
  analogy: string;
  definition: string;
  benefits: string[];
  withoutIt: string;
  badge: string;
  metric: string;
}

export const PILLARS_DATA: PillarData[] = [
  {
    id: 'dominio',
    name: 'Domínio Próprio',
    shortTag: 'O Endereço Oficial',
    headline: 'O RG e endereço de prestígio da sua empresa na internet.',
    icon: Globe,
    badge: 'AUTORIDADE & CONFIANÇA',
    metric: '10x mais credibilidade',
    analogy: 'Imagine a sua empresa como um prédio comercial. O domínio é a sua placa oficial e o nome da sua rua (ex: suaempresa.com.br). Sem ele, é como se seu negócio estivesse escondido em um beco sem nome.',
    definition: 'Domínio próprio é o endereço exclusivo e memorável que seus clientes digitam para encontrar sua empresa online. É a garantia de que sua marca possui propriedade real na web, com e-mails profissionais (contato@suaempresa.com.br).',
    benefits: [
      'Gera credibilidade instantânea: clientes confiam 10x mais para fechar negócios e fazer pagamentos.',
      'E-mails corporativos elegantes que eliminam endereços amadores do Gmail ou Hotmail.',
      'Melhor posicionamento nas pesquisas do Google (SEO) para ser encontrado antes dos concorrentes.',
      'Proteção total da sua marca contra concorrentes que poderiam registrar o seu nome.'
    ],
    withoutIt: 'Sem domínio próprio, sua empresa parece informal ou amadora. Clientes ficam desconfiados na hora de comprar e você depende da caridade de links genéricos de terceiros.'
  },
  {
    id: 'hospedagem',
    name: 'Hospedagem de Alta Performance',
    shortTag: 'A Infraestrutura 24/7',
    headline: 'O terreno seguro que mantém seu site no ar e veloz 24h por dia.',
    icon: Server,
    badge: 'ESTABILIDADE & VELOCIDADE',
    metric: '99.9% de uptime garantido',
    analogy: 'Se o domínio é o endereço, a hospedagem é o terreno e a estrutura física da loja. Um terreno de qualidade garante que as portas estejam sempre abertas e que o teto nunca caia, mesmo em dias de lotação máxima.',
    definition: 'Hospedagem é o servidor profissional de alta tecnologia onde todos os arquivos, imagens, códigos e bancos de dados do seu site ficam guardados. É ela quem entrega suas páginas aos visitantes com máxima velocidade e proteção contra invasões.',
    benefits: [
      'Carregamento instantâneo em menos de 2 segundos: seu cliente não desiste de esperar.',
      'Disponibilidade contínua 24/7: você vende até de madrugada e nos feriados sem preocupação.',
      'Segurança com Certificado SSL (o cadeado de segurança verde que protege dados de clientes).',
      'Suporte a picos de acessos: quando suas campanhas de tráfego bombarem, o site aguenta firme.'
    ],
    withoutIt: 'Com hospedagem fraca ou inexistente, seu site fica fora do ar, demora 8 segundos para abrir, seus anúncios no tráfego pago queimam dinheiro à toa e o cliente vai direto comprar do concorrente.'
  },
  {
    id: 'design',
    name: 'Design Personalizado',
    shortTag: 'A Vitrine Exclusiva',
    headline: 'Uma identidade visual autoral feita para encantar e converter visitantes em compradores.',
    icon: Palette,
    badge: 'VALOR PERCEBIDO & CONVERSÃO',
    metric: '+300% percepção de valor',
    analogy: 'É a diferença entre entrar em uma boutique de alto padrão com iluminação perfeita e entrar em um galpão desorganizado. O design personalizado veste a sua marca com elegância e sofisticação.',
    definition: 'Design personalizado é a criação visual e estratégica sob medida para o seu público e o seu produto. Esqueça modelos genéricos ou modelos copiados: aqui cada botão, cor, tipografia e elemento visual tem um propósito claro de guiar o cliente até a compra.',
    benefits: [
      'Permite cobrar mais caro: marcas com presença visual sofisticada atraem clientes qualificados que não brigam por preço.',
      'Destaque absoluto no mercado: sua marca não se parece com nenhuma outra da concorrência.',
      'Arquitetura de conversão: textos e botões posicionados no fluxo exato do olhar humano.',
      'Fortalecimento da marca: cria um impacto visual inesquecível na mente do visitante.'
    ],
    withoutIt: 'Templates prontos e genéricos deixam seu site com cara de amador, confundem o cliente, passam impressão de abandono e nivelam o seu preço sempre por baixo.'
  },
  {
    id: 'responsividade',
    name: 'Responsividade Total',
    shortTag: 'Perfeito em Qualquer Tela',
    headline: 'Uma experiência fluida e impecável na palma da mão de quem usa celular.',
    icon: Smartphone,
    badge: 'MOBILE-FIRST & FLUIDEZ',
    metric: '82%+ acessos pelo celular',
    analogy: 'É como a água que se molda perfeitamente a qualquer recipiente: seja em um copo pequeno (celular), numa tigela (tablet) ou em uma jarra (computador). O site nunca vaza, nunca aperta e nunca quebra.',
    definition: 'Responsividade é a tecnologia que faz o layout do seu site se reorganizar automaticamente conforme o dispositivo do usuário (iPhone, Android, iPad, notebook ou monitor ultrawide). Tudo fica no tamanho ideal para leitura e toque.',
    benefits: [
      'Navegação confortável com o polegar: botões grandes, espaçados e feitos para o toque rápido.',
      'Zero perda de vendas: mais de 80% do tráfego vem de smartphones; quem não tem site responsivo perde 8 em cada 10 clientes.',
      'Pontuação máxima no Google: o Google prioriza no ranking buscas feitas em sites que oferecem navegação mobile perfeita.',
      'Carregamento ultra-otimizado para redes móveis 4G e 5G.'
    ],
    withoutIt: 'Sem responsividade, o visitante abre o site no celular e vê letras microscópicas, fotos cortadas e precisa dar "zoom de pinça" para enxergar. Resultado: ele fecha a página em 3 segundos irritado.'
  },
  {
    id: 'ia',
    name: 'IA Integrada',
    shortTag: 'A Revolução Tecnológica',
    headline: 'Automação inteligente e atendimento comercial que vendem 24 horas por você.',
    icon: Bot,
    badge: 'INOVAÇÃO & ESCALA',
    metric: 'Atendimento instantâneo 24/7',
    analogy: 'É como ter o seu melhor consultor de vendas trabalhando para o seu negócio dia e noite, atendendo dúvidas na hora e qualificando cada cliente para fechar negócio.',
    definition: 'IA Integrada conecta inteligência artificial diretamente ao ecossistema do seu site. Ela possibilita chats de atendimento hiperinteligentes que entendem as dúvidas do cliente, resolvem objeções e direcionam leads qualificados diretamente para o fechamento no WhatsApp.',
    benefits: [
      'Atendimento 24 horas: nenhum lead esfria esperando você acordar ou voltar do almoço.',
      'Qualificação instantânea de clientes: identifica o interesse do visitante e acelera a decisão de compra.',
      'Posicionamento de vanguarda: coloca sua empresa no topo da inovação tecnológica, gerando admiração imediata.',
      'Respostas precisas e instantâneas para tirar objeções comuns e direcionar o cliente ao fechamento.'
    ],
    withoutIt: 'Sem inteligência artificial, sua equipe gasta horas respondendo as mesmas perguntas repetitivas e clientes prontos para comprar vão embora de madrugada por falta de resposta imediata.'
  }
];

export const ExplainerModal = ({ 
  pillar, 
  onClose 
}: { 
  pillar: PillarData | null; 
  onClose: () => void; 
}) => {
  if (!pillar) return null;
  const Icon = pillar.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full bg-[#0d0d0d] border border-violet-500/30 rounded-[2.5rem] p-6 md:p-10 text-white shadow-[0_0_60px_rgba(139,92,246,0.25)] my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Icon size={28} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-400 block mb-1">
                {pillar.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
                {pillar.name}
              </h3>
            </div>
          </div>

          <p className="text-base md:text-lg font-bold text-violet-200/90 mb-6 leading-snug">
            "{pillar.headline}"
          </p>

          {/* Analogia */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-2 text-violet-400">
              <Sparkles size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">A Analogia Descomplicada</span>
            </div>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              {pillar.analogy}
            </p>
          </div>

          {/* O que é */}
          <div className="mb-6">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
              O que é na prática?
            </h4>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              {pillar.definition}
            </p>
          </div>

          {/* Benefícios */}
          <div className="mb-6">
            <h4 className="text-[10px] font-black text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <CheckCircle2 size={14} /> Benefícios para o seu bolso e para sua marca:
            </h4>
            <ul className="space-y-2">
              {pillar.benefits.map((b, i) => (
                <li key={i} className="text-xs md:text-sm text-gray-300 flex items-start gap-2">
                  <span className="text-violet-400 font-bold shrink-0">✓</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que acontece sem isso */}
          <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-4 mb-8">
            <div className="flex items-center gap-2 text-red-400 font-bold text-[10px] uppercase tracking-wider mb-1">
              <AlertTriangle size={14} /> O perigo de não ter isso:
            </div>
            <p className="text-xs text-red-200/80 leading-relaxed">
              {pillar.withoutIt}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-violet-500 hover:bg-violet-400 text-black px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
            >
              Entendido, fechar →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PillarsExplainer = () => {
  const [activeTab, setActiveTab] = useState<string>('dominio');
  const [selectedPillarForModal, setSelectedPillarForModal] = useState<PillarData | null>(null);

  const currentPillar = PILLARS_DATA.find(p => p.id === activeTab) || PILLARS_DATA[0];
  const CurrentIcon = currentPillar.icon;

  return (
    <section id="pilares" className="py-24 md:py-32 bg-black px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={12} />
            Guia Descomplicado do Seu Site
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-6"
          >
            O que significa cada termo <br />
            <span className="text-violet-500">e por que você precisa deles?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm md:text-base leading-relaxed"
          >
            Sem rodeios técnicos ou palavras difíceis. Entenda exatamente como cada engrenagem trabalha para colocar dinheiro no seu bolso e transformar sua presença digital em uma máquina de fechar contratos.
          </motion.p>
        </div>

        {/* The Digital House Analogy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-violet-950/40 via-black to-violet-950/20 border border-violet-500/20 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-violet-400 block mb-2">
                A Analogia Definitiva
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">
                Pense no seu site como a sua sede física no centro da cidade:
              </h3>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                O <strong className="text-violet-400">Domínio</strong> é a sua placa e endereço oficial. A <strong className="text-violet-400">Hospedagem</strong> é o terreno sólido onde o prédio fica em pé 24h. O <strong className="text-violet-400">Design Personalizado</strong> é a vitrine de luxo exclusiva. A <strong className="text-violet-400">Responsividade</strong> é a porta acessível que deixa qualquer cliente entrar confortavelmente pelo celular. E a <strong className="text-violet-400">IA Integrada</strong> é o seu atendente de elite que recebe e atende seus clientes sem descanso.
              </p>
            </div>
            <div className="shrink-0 bg-violet-500/10 border border-violet-500/30 px-5 py-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-violet-400 block">5 Pilares</span>
              <span className="text-[8px] font-black uppercase tracking-widest text-white/60">100% Integrados</span>
            </div>
          </div>
        </motion.div>

        {/* Tab buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PILLARS_DATA.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`p-4 md:p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                  isActive 
                    ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.35)]' 
                    : 'bg-white/[0.03] text-gray-400 border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-black text-violet-400' : 'bg-white/5 text-gray-300 group-hover:text-white'
                  }`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-black/40 text-violet-200' : 'bg-white/5 text-gray-500'
                  }`}>
                    {pillar.metric}
                  </span>
                </div>
                <div>
                  <h4 className={`text-xs md:text-sm font-black uppercase tracking-tight ${
                    isActive ? 'text-white' : 'text-gray-200'
                  }`}>
                    {pillar.name}
                  </h4>
                  <span className={`text-[8px] font-bold uppercase tracking-wider block mt-0.5 ${
                    isActive ? 'text-violet-200' : 'text-gray-500'
                  }`}>
                    {pillar.shortTag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Full Detail Showcase */}
        <motion.div
          key={currentPillar.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Column: Core concepts */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest">
                  {currentPillar.badge}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  {currentPillar.metric}
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                {currentPillar.name}
              </h3>

              <p className="text-base md:text-xl font-bold text-violet-300/90 leading-snug">
                "{currentPillar.headline}"
              </p>

              {/* Analogy box */}
              <div className="p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-violet-400">
                  <Sparkles size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Analogia do Mundo Real</span>
                </div>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {currentPillar.analogy}
                </p>
              </div>

              {/* Definition */}
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Em termos simples: o que é?
                </h4>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  {currentPillar.definition}
                </p>
              </div>
            </div>

            {/* Right Column: Benefits & Warning */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 md:p-8 rounded-3xl bg-violet-950/20 border border-violet-500/20">
                <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-violet-400" />
                  Benefícios Diretos Para Você:
                </h4>
                <ul className="space-y-3">
                  {currentPillar.benefits.map((benefit, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 md:p-6 rounded-3xl bg-red-950/20 border border-red-500/20">
                <h4 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  E se você não tiver isso?
                </h4>
                <p className="text-xs text-red-200/80 leading-relaxed">
                  {currentPillar.withoutIt}
                </p>
              </div>

              <button
                onClick={() => setSelectedPillarForModal(currentPillar)}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <HelpCircle size={15} /> Ver Resumo Completo em Detalhes
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <ExplainerModal 
        pillar={selectedPillarForModal} 
        onClose={() => setSelectedPillarForModal(null)} 
      />
    </section>
  );
};
