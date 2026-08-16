import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, X, MessageSquare, Trash2, ArrowDownCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export function AIChat() {
  const { getToken, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Sou seu Assistente Financeiro IA. Posso analisar seus gastos, sugerir economias e responder perguntas sobre seu patrimônio. Como posso te ajudar hoje?',
      id: 'welcome'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input, 
      id: Date.now().toString() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post('/api/ai/chat', { 
        message: input,
        history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.text,
        id: (Date.now() + 1).toString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        id: (Date.now() + 1).toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: 'Chat reiniciado. Como posso ajudar agora?',
      id: Date.now().toString()
    }]);
  };

  if (!isOpen) return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-500 text-black rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center z-50 group border-4 border-black"
    >
      <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      <div className="absolute -top-2 -right-2 bg-white text-[8px] font-black uppercase px-2 py-1 rounded-full border border-gray-200">AI ACTIVE</div>
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-[#0a0a0a] border border-[#222] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-[#222] bg-[#111] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Financial AI</h3>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Sistemas Ativos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearChat} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              m.role === 'assistant' ? 'bg-emerald-500 text-black' : 'bg-[#222] text-gray-400'
            }`}>
              {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'assistant' 
                ? 'bg-[#1a1a1a] text-gray-300 border border-[#333] rounded-tl-none' 
                : 'bg-emerald-500 text-black font-medium rounded-tr-none'
            }`}>
              <div className="prose prose-sm prose-invert max-w-none prose-p:mb-0 prose-strong:text-white">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-emerald-500 text-black rounded-lg flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-2xl rounded-tl-none border border-[#333]">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-6 border-t border-[#222] bg-[#111]">
        <div className="relative">
          <input
            type="text"
            className="w-full bg-black border border-[#333] rounded-2xl py-4 pl-6 pr-14 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            placeholder="Pergunte sobre seus gastos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:grayscale"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-4 text-center">
          Analista Financeiro Autônomo • Baseado em dados históricos
        </p>
      </form>
    </motion.div>
  );
}
