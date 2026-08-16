import React, { useState, useEffect } from 'react';
import { 
  Wallet, Plus, Trash2, CreditCard, Banknote, Landmark, 
  ArrowUpRight, ArrowDownRight, MoreVertical, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, useNotifications } from '../hooks/useAuth';
import axios from 'axios';
import { BANK_STYLES } from '../utils/bankStyles';

interface Account {
  id: number;
  name: string;
  bank: string | null;
  type: string;
  balance: string;
  currency: string;
}

const BANK_OPTIONS = [
  { id: 'nubank', name: 'Nubank' },
  { id: 'inter', name: 'Inter' },
  { id: 'itau', name: 'Itaú' },
  { id: 'caixa', name: 'Caixa' },
  { id: 'bb', name: 'Banco do Brasil' },
  { id: 'bradesco', name: 'Bradesco' },
  { id: 'santander', name: 'Santander' },
  { id: 'other', name: 'Outro Banco' },
];

export function AccountManager() {
  const { getToken } = useAuth();
  const { addNotification } = useNotifications();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newAccName, setNewAccName] = useState('');
  const [newAccBank, setNewAccBank] = useState('nubank');
  const [newAccType, setNewAccType] = useState('bank');
  const [newAccBalance, setNewAccBalance] = useState('0');

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.get('/api/accounts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAccounts(res.data);
    } catch (error) {
      addNotification('Erro ao carregar contas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post('/api/accounts', {
        name: newAccName,
        bank: newAccBank === 'other' ? null : newAccBank,
        type: newAccType,
        balance: newAccBalance,
        currency: 'BRL'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addNotification('Conta adicionada com sucesso!', 'success');
      setShowAddModal(false);
      setNewAccName('');
      setNewAccBalance('0');
      fetchAccounts();
    } catch (error) {
      addNotification('Erro ao adicionar conta.', 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Financial Institutions</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Gestão de ativos e identidades bancárias.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-500 text-black px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar Conta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => {
          const style = acc.bank ? BANK_STYLES[acc.bank] : null;
          return (
            <motion.div 
              key={acc.id}
              whileHover={{ y: -5 }}
              className="bg-[#111] p-8 rounded-[2rem] border border-[#222] relative overflow-hidden group h-[220px] flex flex-col justify-between"
            >
              {/* Background Accent */}
              {style && (
                <div 
                  className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 blur-[80px] opacity-20 rounded-full transition-all duration-700 group-hover:opacity-40"
                  style={{ backgroundColor: style.color }}
                ></div>
              )}

              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black uppercase shadow-lg"
                    style={{ 
                      backgroundColor: style ? style.color : '#222',
                      color: style ? style.textColor : '#666'
                    }}
                  >
                    {style ? style.logo.charAt(0) : <Landmark className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-white uppercase tracking-widest">{acc.name}</h3>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{style ? style.logo : acc.type}</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="relative z-10">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Available Balance</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-500 text-sm font-bold uppercase">R$</span>
                  <span className="text-3xl font-black text-white tracking-tighter">
                    {parseFloat(acc.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 relative z-10">
                <div className="flex-1 py-2 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center justify-center gap-2">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                  <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Ativa</span>
                </div>
                <div className="flex-1 py-2 bg-[#1a1a1a] rounded-lg border border-[#333] flex items-center justify-center gap-2">
                  <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Visualizar</span>
                </div>
              </div>
            </motion.div>
          );
        })}

        {accounts.length === 0 && !loading && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center text-gray-600 mb-4 border border-[#222]">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold tracking-tight uppercase text-sm">No Accounts Detected</h3>
            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1">Conecte sua primeira instituição bancária.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#111] w-full max-w-md p-10 rounded-[2.5rem] border border-[#222] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-black text-white tracking-tighter uppercase">New Account</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Provisioning Institution</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddAccount} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Account Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Ex: Conta Corrente"
                    value={newAccName}
                    onChange={e => setNewAccName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Institution</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BANK_OPTIONS.map(bank => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setNewAccBank(bank.id)}
                        className={`p-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          newAccBank === bank.id 
                          ? 'bg-emerald-500 border-emerald-500 text-black' 
                          : 'bg-black border-[#333] text-gray-500 hover:border-gray-500'
                        }`}
                      >
                        {bank.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Initial Balance (R$)</label>
                  <input 
                    type="number" step="0.01" required
                    className="w-full bg-black border border-[#333] rounded-xl p-4 text-sm text-white outline-none focus:ring-1 focus:ring-emerald-500"
                    value={newAccBalance}
                    onChange={e => setNewAccBalance(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
                >
                  Confirm Provisioning
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
