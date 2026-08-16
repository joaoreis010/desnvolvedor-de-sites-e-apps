import React from 'react';
import { 
  TrendingUp, Rocket, Shield, Globe, 
  Sparkles, Check, ArrowRight, Zap,
  Layers, Users, Activity, Wallet,
  Briefcase, Coins, Receipt, BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#222]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-black text-xl shadow-lg shadow-emerald-500/20">
              F
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">Finanza<span className="text-emerald-500 text-[10px] ml-1 font-bold">Corp</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Produtos</a>
            <a href="#projections" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Projeções</a>
            <a href="#pricing" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Preços</a>
          </div>

          <button 
            onClick={onGetStarted}
            className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Acessar Alpha
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-[#222] mb-8"
          >
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Inteligência Financeira de Elite</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            DOMINE SEU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">PATRIMÔNIO.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            A plataforma definitiva para quem busca liberdade financeira. Controle absoluto, projeções inteligentes e IA de mercado em um só lugar.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto bg-emerald-500 text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-[#111] border border-[#222] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#1a1a1a] transition-all">
              Ver Demonstração
            </button>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 max-w-7xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10 group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
          <div className="bg-[#0f0f0f] border border-[#222] rounded-[3rem] p-4 shadow-2xl overflow-hidden aspect-[16/9] relative">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-full mx-auto flex items-center justify-center text-black mb-4 shadow-xl shadow-emerald-500/20">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Visualização de Elite</p>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2000&auto=format&fit=crop" 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover opacity-30 grayscale"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">+R$ 2B</div>
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Patrimônio Gerenciado</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">50k+</div>
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Usuários Ativos</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">99.9%</div>
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Precisão de Dados</div>
          </div>
          <div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">Alpha</div>
            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Algoritmo de IA</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">A Próxima Geração</h2>
            <p className="text-4xl md:text-6xl font-black text-white tracking-tighter">RECURSOS QUE <br /> DEFINEM O MERCADO.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#111] p-10 rounded-[3rem] border border-[#222] hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Alpha Intelligence</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Nossa IA proprietária analisa seus gastos, sugere economias reais e prevê o seu futuro financeiro com precisão matemática.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-emerald-500" /> Analise de Gastos em Tempo Real
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-emerald-500" /> Previsão de Despesas
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-emerald-500" /> Resumos Mensais Executivos
                </li>
              </ul>
            </div>

            <div className="bg-[#111] p-10 rounded-[3rem] border border-[#222] hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Portfolio Global</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Gerencie Ações, FIIs, Stocks, Cripto e Metais em uma única visão consolidada com cotações mundiais em tempo real.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-blue-500" /> Integração com B3 e NASDAQ
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-blue-500" /> Criptomoedas e Stablecoins
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-blue-500" /> Mapa de Calor de Ativos
                </li>
              </ul>
            </div>

            <div className="bg-[#111] p-10 rounded-[3rem] border border-[#222] hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">Central de Projeção</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Visualize seu patrimônio em 5, 10, 20 ou 30 anos. Simule juros compostos, aportes e o impacto da inflação real.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-orange-500" /> Simulador de Juros Compostos
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-orange-500" /> Metas de Aposentadoria
                </li>
                <li className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Check className="w-3 h-3 text-orange-500" /> Tracking de Dividendos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-[#0c0c0c]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-gray-600 uppercase tracking-[0.4em] mb-4">Escolha seu Nível</h2>
            <p className="text-4xl md:text-6xl font-black text-white tracking-tighter">O INVESTIMENTO <br /> QUE SE PAGA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111] p-12 rounded-[3rem] border border-[#222] relative overflow-hidden">
              <div className="text-xs font-black text-gray-600 uppercase tracking-widest mb-2">Plano Grátis</div>
              <div className="text-4xl font-black text-white mb-8 tracking-tighter">R$ 0<span className="text-sm text-gray-600">/mês</span></div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3 text-sm text-gray-400 font-medium"><Check className="w-4 h-4 text-emerald-500" /> Controle de Transações</li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-medium"><Check className="w-4 h-4 text-emerald-500" /> 1 Carteira/Instituição</li>
                <li className="flex items-center gap-3 text-sm text-gray-400 font-medium"><Check className="w-4 h-4 text-emerald-500" /> Dashboards Básicos</li>
                <li className="flex items-center gap-3 text-sm text-gray-600 font-medium"><Zap className="w-4 h-4" /> IA Inteligência (Limitado)</li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-5 rounded-2xl bg-[#1a1a1a] text-white font-black text-xs uppercase tracking-widest hover:bg-[#222] transition-all"
              >
                Começar Grátis
              </button>
            </div>

            <div className="bg-emerald-500 p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <div className="bg-black text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Mais Popular</div>
              </div>
              <div className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-2">Alpha Member</div>
              <div className="text-4xl font-black text-black mb-8 tracking-tighter">R$ 49<span className="text-sm text-emerald-900">/mês</span></div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3 text-sm text-black font-black"><Check className="w-4 h-4 text-black" /> Alpha Intelligence (Full)</li>
                <li className="flex items-center gap-3 text-sm text-black font-black"><Check className="w-4 h-4 text-black" /> Portfolio Global Sincronizado</li>
                <li className="flex items-center gap-3 text-sm text-black font-black"><Check className="w-4 h-4 text-black" /> Projeções de 30 Anos</li>
                <li className="flex items-center gap-3 text-sm text-black font-black"><Check className="w-4 h-4 text-black" /> Corporate Groups & Workspace</li>
                <li className="flex items-center gap-3 text-sm text-black font-black"><Check className="w-4 h-4 text-black" /> Suporte VIP 24/7</li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full py-5 rounded-2xl bg-black text-white font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-black/20"
              >
                Acessar Nível Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-32 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-black font-black text-2xl">
              F
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">Finanza<span className="text-emerald-500 text-xs ml-1 font-bold">Corp</span></span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12">PRONTO PARA O <br /> PRÓXIMO NÍVEL?</h2>
          
          <button 
            onClick={onGetStarted}
            className="bg-white text-black px-12 py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all inline-flex items-center gap-3"
          >
            Elevar meu Patrimônio
            <Rocket className="w-5 h-5" />
          </button>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#1a1a1a] pt-12">
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Tecnologia</p>
              <p className="text-gray-500 text-xs leading-relaxed italic">Construído sobre protocolos de segurança bancária e algoritmos de inteligência neural proprietários.</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Privacidade</p>
              <p className="text-gray-500 text-xs leading-relaxed">Seus dados são criptografados de ponta a ponta. Você é o único dono do seu capital.</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-4">Compliance</p>
              <p className="text-gray-500 text-xs leading-relaxed">Em conformidade com as diretrizes de transparência financeira global.</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Oportunidade</p>
              <p className="text-gray-500 text-xs leading-relaxed">Interessado em adquirir esta plataforma ou tecnologia? <a href="mailto:joaopcreis00@gmail.com" className="text-white hover:underline">Entre em contato</a>.</p>
            </div>
          </div>
          
          <div className="mt-24 text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em]">
            © 2026 Alpha Systems Global. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
