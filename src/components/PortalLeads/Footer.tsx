import React from 'react';
import { motion } from 'motion/react';
import { Rocket, MessageCircle, Globe } from 'lucide-react';
import { Magnetic } from './Magnetic';

const steps = [
  { id: '01', title: 'Briefing', description: 'Entendemos profundamente seu negócio e seus objetivos.' },
  { id: '02', title: 'Estratégia', description: 'Planejamos a melhor abordagem digital para sua marca.' },
  { id: '03', title: 'Design', description: 'Criamos uma interface autoral, premium e funcional.' },
  { id: '04', title: 'Desenvolvimento', description: 'Transformamos o design em tecnologia de ponta.' },
  { id: '05', title: 'Testes', description: 'Garantimos que tudo funcione perfeitamente em qualquer tela.' },
  { id: '06', title: 'Lançamento', description: 'Sua marca entra no ar com impacto e profissionalismo.' }
];

export const Process = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] px-6 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none"
          >
            NOSSO PROCESSO: <br />
            <span className="text-white/40 italic">DO BRIEFING AO IMPACTO.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="relative group p-8 rounded-3xl bg-white/[0.02] border border-white/5"
            >
              <div className="text-6xl md:text-7xl font-black text-white/5 absolute -top-8 -left-4 group-active:text-violet-500/10 transition-colors duration-500">{step.id}</div>
              <div className="relative z-10 pt-6">
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-widest mb-4 flex items-center gap-4">
                   <div className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                   {step.title}
                </h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
      >
        <span className="text-base md:text-xl font-black text-white uppercase tracking-tighter group-active:text-violet-500 transition-colors pr-8 leading-tight">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white/30 shrink-0"
        >
          <Rocket size={18} className="md:w-5 md:h-5" />
        </motion.div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-8 text-gray-500 leading-relaxed text-[13px] md:text-sm max-w-2xl">{answer}</p>
      </motion.div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-black pt-24 md:pt-32 pb-12 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* FAQ Section */}
        <div className="max-w-4xl mb-32 md:mb-40">
          <motion.h2 
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            className="text-[10px] font-black text-violet-500 uppercase tracking-[0.5em] mb-12"
          >
            Dúvidas Frequentes
          </motion.h2>
          <div className="space-y-1">
            <FAQItem 
              question="O site é personalizado?" 
              answer="Sim, cada projeto é desenvolvido do zero, de acordo com a necessidade estratégica e identidade visual de cada negócio." 
            />
            <FAQItem 
              question="Funciona no celular?" 
              answer="Absolutamente. Todos os nossos projetos são desenvolvidos com a metodologia 'mobile-first' e performance otimizada para qualquer dispositivo." 
            />
            <FAQItem 
              question="Posso integrar o WhatsApp?" 
              answer="Sim, integramos botões de contato direto e formulários estratégicos para facilitar a conversão de leads." 
            />
            <FAQItem 
              question="Domínio e hospedagem estão incluídos?" 
              answer="Oferecemos planos que já incluem toda a infraestrutura técnica (Site Inteligente) para que você não precise se preocupar com nada." 
            />
          </div>
        </div>

        {/* CTA Final */}
        <motion.div 
          initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center mb-32 md:mb-40"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 leading-[0.85]">
              PRONTO PARA SER <br /> 
              <span className="text-violet-500">LEMBRADO?</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-xl max-w-2xl mx-auto mb-10 md:mb-12 font-medium uppercase tracking-widest italic">
              “CRIAMOS PRESENÇA DIGITAL.”
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Magnetic strength={0.2}>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/5531995840968?text=Olá,%20gostaria%20de%20iniciar%20meu%20projeto%20com%20a%20Portal%20Leads.', '_blank')}
                  className="w-full sm:w-auto bg-violet-500 text-black px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                >
                  CRIAR MEU PROJETO →
                </motion.button>
              </Magnetic>
              <Magnetic strength={0.1}>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/5531995840968', '_blank')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest active:bg-white/10 transition-all"
                >
                  <MessageCircle size={16} className="md:w-[18px] md:h-[18px]" /> WHATSAPP
                </motion.button>
              </Magnetic>
            </div>
          </motion.div>

          {/* Decorative background sparks */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-500/10 blur-[100px] rounded-full" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 blur-[100px] rounded-full" />
        </motion.div>

        {/* Credibility and Real Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-20">
          <div>
            <div className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-6">Portal Leads</div>
            <p className="text-gray-500 text-xs leading-relaxed italic">
              Não é apenas um site. É a forma como sua empresa começa a ser percebida no digital.
            </p>
          </div>
          <div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Casos Reais</div>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest">Luanna Kuster</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest">Serrotinhos</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest">Invicta Cidadania</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest">Advocacia Portugal</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Social</div>
            <div className="flex gap-4">
              <Magnetic strength={0.4}>
                <a href="https://instagram.com/portaleads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-violet-500 hover:text-black transition-all">
                  <div className="w-5 h-5 flex items-center justify-center font-black text-[10px]">IG</div>
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a href="https://wa.me/5531995840968" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-violet-500 hover:text-black transition-all">
                  <MessageCircle size={20} />
                </a>
              </Magnetic>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Contato</div>
            <a href="mailto:portaleadss@gmail.com" className="text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block mb-2">portaleadss@gmail.com</a>
            <span className="text-gray-700 text-[10px] font-black uppercase tracking-widest">João Reis • Founder</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12 text-[8px] font-black text-gray-800 uppercase tracking-[0.3em]">
          <span>© 2026 Portal Leads. Todos os direitos reservados.</span>
          <span>Desenvolvido com excelência por João Reis.</span>
        </div>
      </div>
    </footer>
  );
};

