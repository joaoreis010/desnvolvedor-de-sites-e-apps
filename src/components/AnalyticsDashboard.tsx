import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, PieChart as PieChartIcon, 
  BarChart as BarChartIcon, Activity, Calendar, 
  Zap, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths, startOfYear, eachMonthOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Transaction {
  id: number;
  amount: string;
  type: 'income' | 'expense';
  date: string;
  category: { name: string };
}

interface Props {
  transactions: Transaction[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

export function AnalyticsDashboard({ transactions }: Props) {
  // Process Data for Charts
  const analyticsData = useMemo(() => {
    // 1. Expenses by Category (Pie)
    const categoryMap: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      const cat = t.category.name;
      categoryMap[cat] = (categoryMap[cat] || 0) + parseFloat(t.amount);
    });
    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    // 2. Income vs Expense by Month (Bar)
    const last6Months = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date()
    });

    const barData = last6Months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d >= monthStart && d <= monthEnd;
      });

      return {
        month: format(month, 'MMM', { locale: ptBR }),
        receita: monthTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + parseFloat(t.amount), 0),
        despesa: monthTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + parseFloat(t.amount), 0)
      };
    });

    // 3. Wealth Evolution (Line)
    // We'll calculate cumulative balance over time
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let cumulative = 0;
    const lineData = sortedTransactions.map(t => {
      cumulative += t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount);
      return {
        date: format(new Date(t.date), 'dd/MM'),
        balance: cumulative
      };
    });

    // 4. Heatmap (Day of Month vs Spend)
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date())
    });
    const heatmapData = daysInMonth.map(day => {
      const daySpend = transactions
        .filter(t => t.type === 'expense' && isSameDay(new Date(t.date), day))
        .reduce((acc, t) => acc + parseFloat(t.amount), 0);
      return { day: format(day, 'd'), value: daySpend };
    });

    return { pieData, barData, lineData, heatmapData };
  }, [transactions]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((acc: number, entry: any) => acc + entry.value, 0);
      return (
        <div className="bg-[#111] border border-[#333] p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  {entry.name}
                </span>
                <span className="text-xs font-black text-emerald-500">R$ {entry.value.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium">Representa {((entry.value / total) * 100).toFixed(1)}% do total visualizado.</p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Financial Intelligence</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Relatórios analíticos e projeções baseadas em dados.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Real-time Analysis</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-8 space-y-8">
          {/* Income vs Expense Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                  <BarChartIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Fluxo de Caixa</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Receitas vs Despesas (6 Meses)</p>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.barData}>
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
                  />
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 20, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                  <Bar dataKey="receita" name="Receita" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesa" name="Despesa" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Wealth Evolution Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">Evolução do Patrimônio</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Saldo Acumulado no Tempo</p>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.lineData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#666', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="balance" name="Patrimônio" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Analytics */}
        <div className="lg:col-span-4 space-y-8">
          {/* Expenses by Category Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-500">
                <PieChartIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Composição de Gastos</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Distribuição por Categoria</p>
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analyticsData.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 mt-4">
              {analyticsData.pieData.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.name}</span>
                  </div>
                  <span className="text-[10px] text-white font-black">R$ {item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Activity Heatmap Sim */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] p-8 rounded-[2.5rem] border border-[#222]"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center text-orange-500">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Intensidade de Gastos</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Atividade Diária (Mês Atual)</p>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {analyticsData.heatmapData.map((day, i) => {
                const opacity = Math.min(day.value / 1000, 1); // Scale opacity by spend
                return (
                  <div 
                    key={i} 
                    className="aspect-square rounded-md flex items-center justify-center text-[8px] font-black group relative"
                    style={{ backgroundColor: day.value > 0 ? `rgba(16, 185, 129, ${opacity + 0.1})` : '#1a1a1a' }}
                  >
                    <span className={day.value > 0 ? 'text-white' : 'text-gray-700'}>{day.day}</span>
                    {day.value > 0 && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-[#333] rounded text-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        R$ {day.value.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Projection Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-emerald-500/10 to-transparent p-8 rounded-[2.5rem] border border-emerald-500/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-emerald-500" />
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Alpha Projection</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Com base nos seus gastos atuais em <span className="text-white font-bold">{analyticsData.pieData[0]?.name || 'Categorias'}</span>, 
              sua projeção de patrimônio para os próximos 3 meses é de 
              <span className="text-emerald-500 font-black ml-1">
                +R$ {(analyticsData.barData.reduce((acc, curr) => acc + (curr.receita - curr.despesa), 0) / 6 * 3).toLocaleString()}
              </span>.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              Simulação de Baixo Risco
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
