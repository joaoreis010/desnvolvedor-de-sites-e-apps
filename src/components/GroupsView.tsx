import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, Plus, UserPlus, Shield, ExternalLink, Copy, CheckCircle2, 
  MessageSquare, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
  Lock, Globe, Send, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useAuth';

interface Group {
  id: number;
  name: string;
  description: string;
  inviteCode: string;
  isPrivate: boolean;
  createdAt: string;
}

interface GroupPost {
  id: number;
  content: string;
  createdAt: string;
  user: {
    name: string;
    photoURL?: string;
  };
}

interface GroupBalance {
  totalIncome: string;
  totalExpense: string;
}

export function GroupsView() {
  const { getToken, user } = useAuth();
  const { addNotification } = useNotifications();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [balance, setBalance] = useState<GroupBalance | null>(null);
  const [posts, setPosts] = useState<GroupPost[]>([]);
  const [newPost, setNewPost] = useState('');
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupPass, setNewGroupPass] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  const [inviteCode, setInviteCode] = useState('');
  const [joinPass, setJoinPass] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const fetchGroups = async () => {
    try {
      const token = await getToken();
      const res = await axios.get('/api/groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGroups(res.data);
    } catch (error) {
      console.error("Failed to fetch groups", error);
      addNotification('Falha ao carregar grupos corporativos.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupDetails = async (group: Group) => {
    setLoading(true);
    try {
      const token = await getToken();
      const [balanceRes, postsRes] = await Promise.all([
        axios.get(`/api/groups/${group.id}/balance`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/groups/${group.id}/posts`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      setBalance(balanceRes.data);
      setPosts(postsRes.data);
      setSelectedGroup(group);
    } catch (error) {
      addNotification('Erro ao carregar detalhes do grupo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post('/api/groups', {
        name: newGroupName,
        description: newGroupDesc,
        password: newGroupPass,
        isPrivate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addNotification('Grupo corporativo criado com sucesso!', 'success');
      setShowCreateModal(false);
      setNewGroupName('');
      setNewGroupDesc('');
      setNewGroupPass('');
      fetchGroups();
    } catch (error) {
      addNotification('Erro ao criar grupo.', 'error');
    }
  };

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post('/api/groups/join', { inviteCode, password: joinPass }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      addNotification('Você entrou no grupo com sucesso!', 'success');
      setShowJoinModal(false);
      setInviteCode('');
      setJoinPass('');
      fetchGroups();
    } catch (error: any) {
      addNotification(error.response?.data?.error || 'Acesso negado.', 'error');
    }
  };

  const handleSendPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !selectedGroup) return;
    try {
      const token = await getToken();
      const res = await axios.post(`/api/groups/${selectedGroup.id}/posts`, {
        content: newPost
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts([{ ...res.data, user: { name: user?.displayName || 'User' } }, ...posts]);
      setNewPost('');
    } catch (error) {
      addNotification('Erro ao publicar no fórum.', 'error');
    }
  };

  const copyToClipboard = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    addNotification('Código de convite copiado!', 'info');
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Sincronizando Rede Corporativa...</p>
    </div>
  );

  if (selectedGroup) return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSelectedGroup(null)}
          className="w-10 h-10 bg-[#1a1a1a] border border-[#333] rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">{selectedGroup.name}</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Network Command Center</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] p-8 rounded-[2rem] border border-[#222]">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Economic Balance
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-white tracking-tight">
                    ${parseFloat(balance?.totalIncome || '0').toLocaleString()}
                  </span>
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Operating Expenses</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-white tracking-tight">
                    ${parseFloat(balance?.totalExpense || '0').toLocaleString()}
                  </span>
                  <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                    <ArrowDownRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#222]">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Net Balance</p>
                <span className={`text-3xl font-black tracking-tighter ${
                  parseFloat(balance?.totalIncome || '0') - parseFloat(balance?.totalExpense || '0') >= 0 
                  ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  ${(parseFloat(balance?.totalIncome || '0') - parseFloat(balance?.totalExpense || '0')).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-[#222]">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2">Network Credentials</p>
            <div className="flex items-center justify-between p-3 bg-black rounded-xl border border-[#222]">
              <span className="text-xs font-mono text-emerald-500">{selectedGroup.inviteCode}</span>
              <button 
                onClick={() => copyToClipboard(selectedGroup.inviteCode, selectedGroup.id)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-[#111] rounded-[2rem] border border-[#222] flex flex-col h-[600px]">
            <div className="p-8 border-b border-[#222] flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Corporate Forum
              </h3>
              <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                Real-time Sync
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {posts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <MessageSquare className="w-12 h-12 mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">No communications yet.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-emerald-500 font-black text-xs">
                      {post.user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-white font-bold uppercase tracking-wider">{post.user.name}</span>
                        <span className="text-[10px] text-gray-600 font-bold">{new Date(post.createdAt).toLocaleTimeString()}</span>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-2xl rounded-tl-none border border-[#333]">
                        <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendPost} className="p-6 border-t border-[#222]">
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full bg-black border border-[#333] rounded-2xl py-4 pl-6 pr-14 text-sm text-gray-200 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Broadcast message to network..."
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-emerald-500 text-black rounded-xl flex items-center justify-center hover:bg-emerald-400 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Corporate Networks</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Manage shared financial structures and collaboration.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowJoinModal(true)}
            className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] text-gray-300 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#222] transition-all"
          >
            <UserPlus className="w-4 h-4" />
            Join Network
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-emerald-500 text-black px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
          >
            <Plus className="w-4 h-4" />
            Establish Group
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length === 0 ? (
          <div className="col-span-full py-20 bg-[#111] rounded-[2rem] border border-[#222] border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center text-gray-600 mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-white font-bold mb-2">No Active Networks</h3>
            <p className="text-gray-500 text-xs max-w-xs">Create a group to share transactions and financial insights with partners or team members.</p>
          </div>
        ) : (
          groups.map((group) => (
            <motion.div 
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] p-8 rounded-[2rem] border border-[#222] hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-24 h-24 text-emerald-500" />
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-white font-black uppercase tracking-tight">{group.name}</h3>
              </div>

              <p className="text-gray-500 text-xs mb-8 line-clamp-2 leading-relaxed h-8">
                {group.description || 'Enterprise financial collaboration unit.'}
              </p>

              <div className="space-y-4 pt-4 border-t border-[#222]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Network ID</span>
                  <span className="text-[10px] text-white font-mono">{group.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Invite Code</span>
                  <button 
                    onClick={() => copyToClipboard(group.inviteCode, group.id)}
                    className="flex items-center gap-2 text-[10px] text-emerald-500 font-mono hover:text-emerald-400 transition-colors"
                  >
                    {group.inviteCode}
                    {copiedId === group.id ? <CheckCircle2 className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => fetchGroupDetails(group)}
                className="w-full mt-8 py-3 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                Open Command Center
                <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-[#222] p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Establish Network</h3>
              <form onSubmit={handleCreateGroup} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Network Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. Corporate Treasury"
                    value={newGroupName}
                    onChange={e => setNewGroupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Description</label>
                  <textarea 
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-emerald-500 h-24"
                    placeholder="Define the scope of this financial group..."
                    value={newGroupDesc}
                    onChange={e => setNewGroupDesc(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Network Password (Optional)</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 pl-10 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Secure your network..."
                      value={newGroupPass}
                      onChange={e => setNewGroupPass(e.target.value)}
                    />
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-black rounded-xl border border-[#222]">
                  <input 
                    type="checkbox"
                    id="isPrivate"
                    className="w-4 h-4 rounded border-[#333] bg-[#0a0a0a] text-emerald-500 focus:ring-emerald-500"
                    checked={isPrivate}
                    onChange={e => setIsPrivate(e.target.checked)}
                  />
                  <label htmlFor="isPrivate" className="flex-1">
                    <p className="text-[10px] text-white font-bold uppercase tracking-widest">Private Network</p>
                    <p className="text-[8px] text-gray-600 uppercase tracking-widest">Requires password to join</p>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 border border-[#333] rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-[#1a1a1a] transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-emerald-500 text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all"
                  >
                    Authorize Creation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-[#222] p-8 rounded-[2rem] w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Join Network</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-6">Enter the corporate access code provided by a member.</p>
              <form onSubmit={handleJoinGroup} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Access Code</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-4 text-center text-xl font-mono text-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 tracking-[0.5em] uppercase"
                    placeholder="XXXXXX"
                    maxLength={6}
                    value={inviteCode}
                    onChange={e => setInviteCode(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-600 font-bold uppercase tracking-widest pl-1">Network Password (If Private)</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      className="w-full bg-[#0a0a0a] border border-[#333] rounded-xl p-3 pl-10 text-sm text-gray-200 outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="••••••••"
                      value={joinPass}
                      onChange={e => setJoinPass(e.target.value)}
                    />
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-600" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1 py-3 border border-[#333] rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-[#1a1a1a] transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-emerald-500 text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all"
                  >
                    Establish Link
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
