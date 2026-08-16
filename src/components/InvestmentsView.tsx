import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Plus, Search, 
  Filter, ArrowUpRight, ArrowDownRight, 
  Activity, PieChart as PieIcon, Globe,
  Briefcase, Coins, Shield, MoreVertical, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, useNotifications } from '../hooks/useAuth';
import axios from 'axios';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

interface Investment {
  id: number;
  symbol: string;
  name: string;
  type: string;
  quantity: string;
  averagePrice: string;
  currency: string;
}

const TYPE_CONFIG: Record<string, { label: string, color: string, icon: any }> = {
  crypto: { label: 'Criptoativos', color: '#8b5cf6', icon: Coins },
  stock_br: { label: 'Ações BR', color: '#10b981', icon: TrendingUp },
  stock_us: { label: 'Stocks (EUA)', color: '#3b82f6', icon: Globe },
  fii: { label: 'Fundos Imob.', color: '#f59e0b', icon: Briefcase },
  gold: { label: 'Metais/Ouro', color: '#ec4899', icon: Shield },
};

export function InvestmentsView() {
  const { getToken } = useAuth();
  const { addNotification } = useNotifications();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [marketData, setMarketData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [newSym, setNewSym] = useState('');
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('stock_br');
  const [newQty, setNewQty] = useState('0');
  const [newPrice, setNewPrice] = useState('0');

  const fetchData = async () => {
    const token = await getToken();
    try {
      const [invRes, tickerRes] = await Promise.all([
        axios.get('/api/investments', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/market/ticker')
      ]);
      setInvestments(invRes.data);
      setMarketData(tickerRes.data);
    } catch (error) {
      addNotification('Erro ao carregar carteira.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post('/api/investments', {
        symbol: newSym,
        name: newName,
        type: newType,
        quantity: newQty,
        averagePrice: newPrice
      }, { headers: { Authorization: `Bearer ${token}` } });
      addNotification('Ativo adicionado à carteira!', 'success');
      setShowAddModal(false);
      fetchData();
    } catch (error) {
      addNotification('Erro ao adicionar ativo.', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja remover este ativo da carteira?')) return;
    try {
      const token = await getToken();
      await axios.delete(`/api/investments/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      addNotification('Ativo removido.', 'success');
      fetchData();
    } catch (error) {
      addNotification('Erro ao remover ativo.', 'error');
    }
  };

  const portfolioStats = useMemo(() => {
    let totalInvested = 0;
    let currentTotal = 0;

    investments.forEach(inv => {
      const invested = Number(inv.quantity) * Number(inv.averagePrice);
      totalInvested += invested;

      // Match with market data for current price (fallback to avg price)
      const market = marketData.find(m => m.symbol.includes(inv.symbol));
      const currentPrice = market ? parseFloat(market.price.replace(/[^\d.,]/g, '').replace(',', '.')) : Number(inv.averagePrice);
      currentTotal += Number(inv.quantity) * currentPrice;
    });

    const profit = currentTotal - totalInvested;
    const profitPerc = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return { totalInvested, currentTotal, profit, profitPerc };
  }, [investments, marketData]);

  const pieData = useMemo(() => {
    const data: Record<string, number> = {};
    investments.forEach(inv => {
      const value = Number(inv.quantity) * Number(inv.averagePrice);
      data[inv.type] = (data[inv.type] || 0) + value;
    });
    return Object.entries(data).map(([type, value]) => ({
      name: TYPE_CONFIG[type]?.label || type,
      value,
      color: TYPE_CONFIG[type]?.color || '#333'
    }));
  }, [investments]);

  if (loading) return <div className="py-20 text-center text-gray-500 font-bold uppercase tracking-widest text-[10px] animate-pulse">Syncing Portfolio with Market Liquidity...</div>;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Carteira de Ativos</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Gestão Estratégica de Capital de Risco
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 text-black px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-lg shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" />
          Registrar Ativo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222]">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Patrimônio em Risco</p>
          <p className="text-3xl font-black text-white tracking-tighter">
            R$ {portfolioStats.currentTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222]">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Alocado</p>
          <p className="text-3xl font-black text-gray-400 tracking-tighter">
            R$ {portfolioStats.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222]">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Lucro/Prejuízo</p>
          <div className={`text-3xl font-black tracking-tighter ${portfolioStats.profit >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
            {portfolioStats.profit >= 0 ? '+' : ''} R$ {Math.abs(portfolioStats.profit).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222]">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Rentabilidade</p>
          <div className={`text-3xl font-black tracking-tighter ${portfolioStats.profitPerc >= 0 ? 'text-emerald-500' : 'text-red-400'}`}>
            {portfolioStats.profitPerc.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222] overflow-hidden">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Posições Ativas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-[#222]">
                    <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Ativo</th>
                    <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Qtde.</th>
                    <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Preço Médio</th>
                    <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Saldo Atual</th>
                    <th className="pb-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {investments.map(inv => {
                    const config = TYPE_CONFIG[inv.type];
                    const currentValue = Number(inv.quantity) * Number(inv.averagePrice); // Simplificado
                    return (
                      <tr key={inv.id} className="group">
                        <td className="py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                              {config && <config.icon className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div>
                              <div className="text-sm font-black text-white uppercase tracking-tight">{inv.symbol}</div>
                              <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{inv.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 text-sm font-bold text-gray-300">{inv.quantity}</td>
                        <td className="py-6 text-sm font-bold text-gray-300">R$ {Number(inv.averagePrice).toLocaleString('pt-BR')}</td>
                        <td className="py-6 text-sm font-black text-white">R$ {currentValue.toLocaleString('pt-BR')}</td>
                        <td className="py-6">
                          <div className="px-2 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded text-[9px] font-black text-emerald-500 uppercase tracking-widest w-fit">
                            Liquidado
                          </div>
                        </td>
                        <td className="py-6 text-right">
                          <button 
                            onClick={() => handleDelete(inv.id)}
                            className="p-2 text-gray-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {investments.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Sua carteira está vazia</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-8">Distribuição de Risco</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '16px' }}
                    itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {pieData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Shield className="w-24 h-24 text-black" />
            </div>
            <h3 className="text-black font-black text-xl tracking-tighter uppercase mb-4">Alpha Intelligence</h3>
            <p className="text-black/70 text-xs font-bold leading-relaxed mb-6">
              Sua exposição em Criptoativos está 12% acima da recomendação para seu perfil Conservador. Considere rebalancear sua carteira.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black/80 transition-all">
              Ver Recomendações
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] w-full max-w-lg p-10 rounded-[2.5rem] border border-[#222] shadow-2xl"
            >
              <h3 className="text-lg font-black text-white tracking-tighter uppercase mb-8">Novo Registro de Ativo</h3>
              <form onSubmit={handleAdd} className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Ticker / Símbolo</label>
                  <input 
                    type="text" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Ex: ITUB4, BTC, AAPL"
                    value={newSym}
                    onChange={e => setNewSym(e.target.value)}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Nome do Ativo</label>
                  <input 
                    type="text" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Ex: Itaú Unibanco"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Tipo</label>
                  <select 
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    value={newType}
                    onChange={e => setNewType(e.target.value)}
                  >
                    <option value="stock_br">Ação BR</option>
                    <option value="stock_us">Stock (EUA)</option>
                    <option value="crypto">Criptomoeda</option>
                    <option value="fii">FII</option>
                    <option value="gold">Ouro/Metais</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Quantidade</label>
                  <input 
                    type="number" step="0.000001" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    value={newQty}
                    onChange={e => setNewQty(e.target.value)}
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Preço Médio (R$)</label>
                  <input 
                    type="number" step="0.01" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-2 pt-4 flex gap-4">
                  <button 
                    type="button" onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 bg-[#1a1a1a] text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-emerald-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/10"
                  >
                    Confirmar Registro
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
