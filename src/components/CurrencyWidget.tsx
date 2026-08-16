import React, { useState } from 'react';
import axios from 'axios';
import { ArrowDownCircle } from 'lucide-react';
import { useNotifications } from '../hooks/useAuth';

export function CurrencyWidget() {
  const { addNotification } = useNotifications();
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BRL');
  const [amount, setAmount] = useState('1');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/finance/convert?from=${from}&to=${to}&amount=${amount}`);
      setResult(res.data.result);
      addNotification(`Conversão concluída: ${amount} ${from} = ${res.data.result} ${to}`, 'info');
    } catch (error) {
      console.error("Conversion failed", error);
      addNotification('Falha ao converter moedas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141414] p-6 rounded-2xl border border-[#222222] shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Forex Terminal</h3>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>
      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Amount</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm text-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <select 
              className="bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm text-gray-200 outline-none hover:bg-[#222] transition-all"
              value={from}
              onChange={e => setFrom(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="BRL">BRL</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="h-px bg-[#222] flex-1"></div>
          <div className="px-4 text-gray-600">
            <ArrowDownCircle className="w-4 h-4" />
          </div>
          <div className="h-px bg-[#222] flex-1"></div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Converted Value</label>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm font-bold text-emerald-500 flex items-center">
              {loading ? <span className="animate-pulse">Processing...</span> : result || '0.00'}
            </div>
            <select 
              className="bg-[#1a1a1a] border border-[#333] rounded-xl p-3 text-sm text-gray-200 outline-none hover:bg-[#222] transition-all"
              value={to}
              onChange={e => setTo(e.target.value)}
            >
              <option value="BRL">BRL</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleConvert}
          className="w-full bg-white text-black py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-[0.98]"
        >
          Execute Conversion
        </button>
      </div>
    </div>
  );
}
