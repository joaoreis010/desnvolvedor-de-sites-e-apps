import React, { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  TrendingUp, Settings, 
  ArrowUpRight, Sparkles, 
  Rocket, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

interface ProjectionData {
  month: string;
  conservative: number;
  aggressive: number;
  total: number;
}

const INVESTMENT_TYPES = [
  { id: 'cdb', name: 'CDB / Renda Fixa', color: '#10b981', value: 40 },
  { id: 'fii', name: 'Fundos Imobiliários', color: '#3b82f6', value: 20 },
  { id: 'acoes', name: 'Ações BR', color: '#f59e0b', value: 15 },
  { id: 'stocks', name: 'Stocks (EUA)', color: '#ef4444', value: 15 },
  { id: 'crypto', name: 'Criptomoedas', color: '#8b5cf6', value: 5 },
  { id: 'gold', name: 'Ouro / Prata', color: '#ec4899', value: 5 },
];

export function ProjectionCenter() {
  const { getToken } = useAuth();
  const [currentWealth, setCurrentWealth] = useState(0);
  const [marketTicker, setMarketTicker] = useState<any[]>([]);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(10); // % per year
  const [inflation, setInflation] = useState(4); // % per year
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      try {
        const [accRes, tickerRes] = await Promise.all([
          axios.get('/api/accounts', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/market/ticker')
        ]);
        const total = accRes.data.reduce((acc: number, curr: any) => acc + Number(curr.balance), 0);
        setCurrentWealth(total);
        setMarketTicker(tickerRes.data);
      } catch (error) {
        console.error("Failed to fetch projection data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const projections = useMemo(() => {
    const data: ProjectionData[] = [];
    const monthlyRate = expectedReturn / 100 / 12;
    const realRate = (1 + expectedReturn / 100) / (1 + inflation / 100) - 1;
    const monthlyRealRate = realRate / 12;

    let balance = currentWealth || 0;
    let realBalance = currentWealth || 0;

    for (let i = 0; i <= years * 12; i++) {
      if (i % 12 === 0 || i === years * 12) {
        data.push({
          month: `Ano ${i / 12}`,
          conservative: Math.round(realBalance),
          aggressive: Math.round(balance),
          total: Math.round(balance)
        });
      }
      balance = (balance + monthlyContribution) * (1 + monthlyRate);
      realBalance = (realBalance + monthlyContribution) * (1 + monthlyRealRate);
    }
    return data;
  }, [currentWealth, monthlyContribution, years, expectedReturn, inflation]);

  const finalWealth = projections[projections.length - 1]?.aggressive || 0;
  const realWealth = projections[projections.length - 1]?.conservative || 0;

  if (loading) return <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-[10px] animate-pulse">Initializing Alpha Projection Systems...</div>;

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Premium Market Ticker */}
      <div className="bg-[#111] border-y border-[#222] py-3 -mx-8 px-8 overflow-hidden relative group">
        <div className="flex animate-marquee gap-12 items-center">
          {[...marketTicker, ...marketTicker].map((ticker, i) => (
            <div key={i} className="flex items-center gap-4 whitespace-nowrap">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{ticker.symbol}</span>
              <span className="text-xs font-bold text-white">{ticker.price}</span>
              <span className={`text-[10px] font-black ${ticker.up ? 'text-emerald-500' : 'text-red-400'}`}>
                {ticker.change}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Central de Projeção</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-500" />
            Sistemas de Simulação Monte Carlo Ativos
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Patrimônio Alvo</p>
              <p className="text-xl font-black text-white">R$ {finalWealth.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full"></div>
            
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-500" />
              Parâmetros de Simulação
            </h3>

            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Aporte Mensal</label>
                  <span className="text-xs font-black text-white">R$ {monthlyContribution.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="0" max="50000" step="100"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Prazo (Anos)</label>
                  <span className="text-xs font-black text-white">{years} Anos</span>
                </div>
                <input 
                  type="range" min="1" max="40" step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Rentabilidade Anual</label>
                  <span className="text-xs font-black text-emerald-500">{expectedReturn}%</span>
                </div>
                <input 
                  type="range" min="0" max="30" step="0.5"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Inflação Média</label>
                  <span className="text-xs font-black text-red-400">{inflation}%</span>
                </div>
                <input 
                  type="range" min="0" max="15" step="0.5"
                  value={inflation}
                  onChange={(e) => setInflation(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-emerald-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Análise com IA Alpha
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111] p-6 rounded-3xl border border-[#222]">
              <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Patrimônio Real</p>
              <p className="text-lg font-black text-white">R$ {realWealth.toLocaleString('pt-BR')}</p>
              <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">Ajustado pela Inflação</p>
            </div>
            <div className="bg-[#111] p-6 rounded-3xl border border-[#222]">
              <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest mb-1">Total Investido</p>
              <p className="text-lg font-black text-white">R$ {(currentWealth + monthlyContribution * years * 12).toLocaleString('pt-BR')}</p>
              <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-1">Sem Juros Compostos</p>
            </div>
          </div>
        </div>

        {/* Chart View */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] p-10 rounded-[2.5rem] border border-[#222] shadow-2xl relative"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Curva de Acumulação</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Simulação de Juros Compostos</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Nominal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-700"></div>
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Real</span>
                </div>
              </div>
            </div>

            <div className="h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projections}>
                  <defs>
                    <linearGradient id="colorAggressive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConservative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#333" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#333" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} 
                    tickFormatter={(val) => `R$ ${(val/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                    labelStyle={{ color: '#666', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '8px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="aggressive" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorAggressive)" 
                    name="Valor Nominal"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="conservative" 
                    stroke="#444" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorConservative)" 
                    name="Valor Real"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]">
              <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Alocação Estratégica</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={INVESTMENT_TYPES}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {INVESTMENT_TYPES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {INVESTMENT_TYPES.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222] flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-6">Metas Ativas</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Aposentadoria</span>
                      <span className="text-[10px] text-emerald-500 font-black">45%</span>
                    </div>
                    <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '45%' }}
                        className="h-full bg-emerald-500"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Imóvel Próprio</span>
                      <span className="text-[10px] text-blue-500 font-black">12%</span>
                    </div>
                    <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '12%' }}
                        className="h-full bg-blue-500"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-4 bg-[#1a1a1a] border border-[#333] rounded-2xl text-[8px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all mt-8">
                Configurar Novas Metas
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
          width: fit-content;
        }
      `}</style>
    </div>
  );
}
