import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  BookOpen,
  Calendar,
  AlertTriangle,
  Award,
  RefreshCw,
  User
} from 'lucide-react';
import { api } from '../../services/api';

export const StudentAiPage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello Saikat! 👋 I am **Campus AI**, your intelligent academic mentor.

I have synchronized with your real-time academic records:
* **Current CGPA**: 9.94 (Semester 4)
* **Urgent Notice**: DBMS Normalization assignment is due **tomorrow at 23:59 IST**.
* **Attendance Diagnostic**: Operating Systems is at **81%** (Alert threshold: 75%).
* **Upcoming Exam**: OS Midterm on **October 12** (Auditorium Hall B, Seat B-34).

How can I accelerate your learning today? Click any prompt chip below or type a custom question!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    'Create a 7-day study plan for my exams',
    'Show my attendance risk and next classes needed',
    'Explain my DBMS marks and end-sem target',
    'What assignments are due this week and their priority?',
    'How do I maintain my 9.94 CGPA?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage = { sender: 'user' as const, text: query };
    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.askCampusAi(query);
      setMessages(prev => [...prev, { sender: 'ai', text: res.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Encountered a momentary sync lag. Please re-enter your query or try one of the prompt chips.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-fade-in">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 flex items-center justify-between shadow-xl shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">CAMPUS AI</h2>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                PROACTIVE MENTOR
              </span>
            </div>
            <p className="text-xs text-slate-400">Contextualized with Saikat Khanra's live academic records</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                sender: 'ai',
                text: 'Chat history reset. How can I help you excel this semester?',
              },
            ])
          }
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl bg-slate-950/60 border border-white/10 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-3 max-w-3xl ${
              m.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 shadow-lg'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-cyan-400 text-xs animate-pulse">
            <Bot className="w-5 h-5 animate-spin" />
            <span>Campus AI is synthesizing your study plan and transcript analysis...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
        {suggestedPrompts.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="shrink-0 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-[11px] font-medium transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="relative shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Campus AI about your syllabus, exam preparation, or marks..."
          className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 focus:outline-none text-white text-xs shadow-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white disabled:opacity-40 hover:scale-105 transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
