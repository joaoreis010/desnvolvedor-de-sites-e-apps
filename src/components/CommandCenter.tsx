import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Command, LayoutDashboard, Receipt, 
  Wallet, Users, TrendingUp, Rocket, 
  Plus, Settings, LogOut, Sparkles,
  ArrowRight, Globe, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const COMMANDS = [
  { id: 'dashboard', label: 'Dashboard Principal', icon: LayoutDashboard, category: 'Navegação' },
  { id: 'accounts', label: 'Contas e Instituições', icon: Wallet, category: 'Navegação' },
  { id: 'transactions', label: 'Livro-Razão (Transações)', icon: Receipt, category: 'Navegação' },
  { id: 'groups', label: 'Grupos e Orçamentos', icon: Users, category: 'Navegação' },
  { id: 'insights', label: 'Inteligência de Mercado', icon: TrendingUp, category: 'Navegação' },
  { id: 'projections', label: 'Central de Projeção', icon: Rocket, category: 'Navegação' },
  { id: 'add-transaction', label: 'Novo Registro Financeiro', icon: Plus, category: 'Ações' },
  { id: 'ai-chat', label: 'Falar com Alpha AI', icon: Sparkles, category: 'Inteligência' },
  { id: 'settings', label: 'Configurações de Perfil', icon: Settings, category: 'Sistema' },
];

export function CommandCenter({ isOpen, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = COMMANDS.filter(c => 
    c.label.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      const cmd = filteredCommands[selectedIndex];
      if (cmd) {
        onNavigate(cmd.id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredCommands, selectedIndex, onNavigate, onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setSelectedIndex(0);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#222] rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="p-6 flex items-center gap-4 border-b border-[#222]">
          <Search className="w-5 h-5 text-gray-500" />
          <input 
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none text-white outline-none text-lg font-medium placeholder:text-gray-700"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="px-2 py-1 bg-[#1a1a1a] border border-[#333] rounded text-[10px] font-black text-gray-500 uppercase tracking-widest">ESC</div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-4 space-y-6">
          {/* Categories */}
          {['Navegação', 'Ações', 'Inteligência', 'Sistema'].map(category => {
            const catCommands = filteredCommands.filter(c => c.category === category);
            if (catCommands.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <h4 className="px-4 text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">{category}</h4>
                <div className="space-y-1">
                  {catCommands.map((cmd) => {
                    const globalIndex = filteredCommands.findIndex(fc => fc.id === cmd.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        onClick={() => {
                          onNavigate(cmd.id);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                          isSelected ? 'bg-emerald-500 text-black' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <cmd.icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-gray-500'}`} />
                          <span className="text-sm font-bold">{cmd.label}</span>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[10px] font-black uppercase">
                            Open <ArrowRight className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#111] border-t border-[#222] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
              <div className="px-1.5 py-0.5 bg-[#1a1a1a] border border-[#333] rounded">↑↓</div> Navigate
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">
              <div className="px-1.5 py-0.5 bg-[#1a1a1a] border border-[#333] rounded">↵</div> Execute
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-emerald-500" />
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Encrypted Session</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
