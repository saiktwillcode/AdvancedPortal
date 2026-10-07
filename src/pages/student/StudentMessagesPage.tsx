import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  User,
  CheckCircle,
  Paperclip,
  MoreVertical,
  Search,
  Sparkles,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';
import { CampusMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const StudentMessagesPage: React.FC = () => {
  const { user, role } = useAuth();
  const [messages, setMessages] = useState<CampusMessage[]>([]);
  const [activeContact, setActiveContact] = useState({
    id: 'usr_faculty_1',
    name: 'Prof. Elena Rostova',
    role: 'FACULTY',
    dept: 'Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'Online • Faculty Cabin 304',
  });
  const [inputText, setInputText] = useState('');

  const contacts = [
    {
      id: 'usr_faculty_1',
      name: 'Prof. Elena Rostova',
      role: 'FACULTY',
      dept: 'DBMS & High-Performance Computing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      status: 'Online',
      lastMessage: 'Please bring the preliminary benchmark logs...',
    },
    {
      id: 'usr_faculty_2',
      name: 'Dr. Alan Turing',
      role: 'FACULTY',
      dept: 'Algorithms & Theoretical Computing',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
      status: 'In Lecture (Hall 301)',
      lastMessage: 'Good job on the AVL tree rotational proof.',
    },
    {
      id: 'usr_admin_1',
      name: 'Dean Marcus Vance',
      role: 'ADMIN',
      dept: 'Academic Affairs Helpdesk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      status: 'Offline',
      lastMessage: 'Your midterm hall ticket has been authorized.',
    },
  ];

  useEffect(() => {
    api.getMessages().then(data => setMessages(data));
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Partial<CampusMessage> = {
      senderId: user?.id || 'usr_student_1',
      senderName: user?.name || 'Saikat Khanra',
      senderRole: role,
      receiverId: activeContact.id,
      receiverName: activeContact.name,
      content: inputText,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Optimistic update
    setMessages(prev => [...prev, { ...newMsg, id: `msg_${Date.now()}` } as CampusMessage]);
    setInputText('');

    await api.sendMessage(newMsg);

    // Simulated Faculty Auto-Reply after 1.5s if talking to Prof Elena
    if (activeContact.id === 'usr_faculty_1') {
      setTimeout(() => {
        const replyMsg: CampusMessage = {
          id: `msg_reply_${Date.now()}`,
          senderId: 'usr_faculty_1',
          senderName: 'Prof. Elena Rostova',
          senderRole: 'FACULTY',
          receiverId: user?.id || 'usr_student_1',
          receiverName: user?.name || 'Saikat Khanra',
          content: 'Acknowledged. I will review this during our faculty consultation hour today.',
          timestamp: new Date().toISOString(),
          read: true,
        };
        setMessages(prev => [...prev, replyMsg]);
      }, 1500);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl flex overflow-hidden animate-fade-in">
      {/* Left Contacts Sidebar */}
      <div className="w-full sm:w-80 border-r border-white/10 flex flex-col bg-slate-950/60">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>FACULTY DIRECT MESSAGING</span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty or advisors..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.map(contact => {
            const isSelected = activeContact.id === contact.id;
            return (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact as any)}
                className={`p-3 rounded-2xl flex items-center space-x-3 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border border-cyan-500/30'
                    : 'hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{contact.name}</h4>
                    <span className="text-[9px] text-cyan-400 font-mono">{contact.role}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{contact.lastMessage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Chat Conversation Box */}
      <div className="hidden sm:flex flex-1 flex-col bg-slate-950/40">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <img
              src={activeContact.avatar}
              alt={activeContact.name}
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40"
            />
            <div>
              <h3 className="text-sm font-bold text-white">{activeContact.name}</h3>
              <p className="text-[10px] text-emerald-400 font-semibold">{activeContact.status}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-cyan-300 font-mono">
              Academic Consultation
            </span>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => {
            const isMe = msg.senderRole === role;
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-md ${isMe ? 'ml-auto items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 mb-1">
                  <span>{msg.senderName}</span>
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-lg shadow-blue-500/20'
                      : 'bg-slate-900 border border-white/10 text-slate-200 rounded-bl-none shadow-md'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Message ${activeContact.name}...`}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950 border border-white/10 focus:border-cyan-400 focus:outline-none text-white text-xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 hover:scale-105 transition-all shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
