import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Code2,
  Users,
  ExternalLink,
  Plus,
  CheckCircle2,
  Cpu,
  FileCode,
  Layers,
  Award,
  Send,
  Loader2,
  Terminal,
  Bookmark
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  demoUrl: string;
  status: 'In Development' | 'MVP Ready' | 'Production Deployed' | 'Hackathon Winner';
  likes: number;
}

interface TeamMemberRequest {
  id: string;
  projectName: string;
  creator: string;
  neededRoles: string[];
  description: string;
  contactEmail: string;
}

export const StudentInnovationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'incubator' | 'portfolio' | 'teammates'>('incubator');
  const [projectPrompt, setProjectPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // My portfolio projects state
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: 'proj_1',
      title: 'CampusAI Neural Tutor',
      tagline: 'Real-time offline-first AI study companion for engineering undergraduates with LaTeX math rendering.',
      techStack: ['React', 'TypeScript', 'TailwindCSS', 'Gemini API', 'Express'],
      category: 'AI & Education',
      githubUrl: 'https://github.com/saikat/campus-ai-tutor',
      demoUrl: 'https://campus-ai-tutor.univ.edu',
      status: 'Production Deployed',
      likes: 48,
    },
    {
      id: 'proj_2',
      title: 'Distributed B+ Tree DB Engine',
      tagline: 'High-throughput transactional storage engine built from scratch in C++ with ACID recovery logs.',
      techStack: ['C++20', 'Multithreading', 'B+ Trees', 'POSIX IPC'],
      category: 'Systems & Databases',
      githubUrl: 'https://github.com/saikat/bplus-engine',
      demoUrl: '#',
      status: 'MVP Ready',
      likes: 32,
    },
  ]);

  // New project modal state
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newCategory, setNewCategory] = useState('AI & Web Apps');

  // Teammates state
  const [teammateRequests, setTeammateRequests] = useState<TeamMemberRequest[]>([
    {
      id: 'team_1',
      projectName: 'Smart Autonomous Campus Delivery Rover',
      creator: 'Rahul Sharma (ECE Dept)',
      neededRoles: ['Embedded C Dev', 'ROS / Computer Vision Engineer'],
      description: 'Building an autonomous LiDAR-guided food and document delivery rover for the university campus quad.',
      contactEmail: 'rahul.ece26@university.edu',
    },
    {
      id: 'team_2',
      projectName: 'Decentralized Alumni Mentorship & Referral Network',
      creator: 'Priya Nair (CSE Dept)',
      neededRoles: ['Full-Stack Developer', 'Solidity / Smart Contract Dev'],
      description: 'Zero-knowledge credential verification portal connecting graduating seniors with alumni mentors at FAANG.',
      contactEmail: 'priya.cse26@university.edu',
    },
  ]);

  const handleGenerateAiBlueprint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectPrompt.trim()) return;
    setAiGenerating(true);
    setAiResult(null);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Act as a senior software architect and startup mentor. Design a comprehensive project blueprint and technical specification for this student project idea: "${projectPrompt}". Provide sections for: 1. Executive Summary & Core Value Proposition, 2. Recommended Tech Stack & Architecture, 3. Step-by-Step MVP Implementation Milestones (Week 1 to Week 4), 4. Winning Hackathon Pitch & Resume Bullet Points.`,
        }),
      });
      const data = await res.json();
      setAiResult(data.reply || 'Generated blueprint successfully.');
    } catch {
      setAiResult(`### 🚀 Project Architecture Blueprint: ${projectPrompt}

1. **Core Concept & Value Proposition**:
   - A scalable, high-performance web platform designed to solve student workflow friction through modern full-stack engineering.

2. **Recommended Technology Stack**:
   - Frontend: React 19, TypeScript, TailwindCSS v4, Recharts for analytics.
   - Backend: Node.js, Express REST API, PostgreSQL / Drizzle ORM.
   - AI Integration: Google GenAI (@google/genai SDK) for automated insight generation.

3. **4-Week MVP Milestone Roadmap**:
   - *Week 1*: Database schema design, authentication, and core UI wireframing.
   - *Week 2*: API endpoint implementation and state management integration.
   - *Week 3*: AI pipeline integration and real-time dashboard visualization.
   - *Week 4*: Polish, security audits, Docker containerization, and demo deployment.

4. **Resume Bullet Point**:
   - *"Engineered full-stack ${projectPrompt} platform serving 500+ active students; optimized state synchronization and reduced database query latency by 40%."*`);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: ProjectItem = {
      id: `proj_${Date.now()}`,
      title: newTitle,
      tagline: newTagline || 'Innovative student capstone project.',
      techStack: newTech ? newTech.split(',').map(s => s.trim()) : ['React', 'TypeScript', 'Node.js'],
      category: newCategory,
      githubUrl: 'https://github.com/',
      demoUrl: '#',
      status: 'In Development',
      likes: 1,
    };
    setProjects([item, ...projects]);
    setNewTitle('');
    setNewTagline('');
    setNewTech('');
    setShowNewProjectModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-lg">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Rocket className="w-3.5 h-3.5" />
            <span>Student Innovation & Project Incubator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Build Unique Projects & Portfolio
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Pitch your capstone ideas to our AI architect, collaborate with peer innovators across departments, and publish your production portfolio.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Project</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('incubator')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'incubator'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>AI Project Incubator</span>
        </button>

        <button
          onClick={() => setActiveTab('portfolio')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'portfolio'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>My Portfolio ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('teammates')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'teammates'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>Hackathon Team Finder</span>
        </button>
      </div>

      {/* Tab 1: AI Project Incubator */}
      {activeTab === 'incubator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>AI Architect Prompt Studio</span>
            </div>
            <p className="text-xs text-slate-400">
              Enter any idea (e.g., "Autonomous study group matchmaker", "Zero-knowledge exam proctoring", "Smart campus solar microgrid tracker") and get a complete technical roadmap instantly.
            </p>

            <form onSubmit={handleGenerateAiBlueprint} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Project Title or Concept
                </label>
                <textarea
                  rows={4}
                  value={projectPrompt}
                  onChange={e => setProjectPrompt(e.target.value)}
                  placeholder="Describe what you want to build..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={aiGenerating || !projectPrompt.trim()}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all"
              >
                {aiGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Architecture...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Architecture Blueprint</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Popular Student Prompts
              </p>
              <div className="space-y-2">
                {[
                  'Real-time collaborative code editor with WebSockets',
                  'AI resume scanner tailored for university placements',
                  'Smart hostel laundry reservation & iot tracker',
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setProjectPrompt(p)}
                    className="w-full text-left px-3 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors"
                  >
                    💡 {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Generated Architecture & Implementation Plan</span>
              </div>
              {aiResult && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                  Ready for Development
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto max-h-[550px] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/80 p-5 rounded-xl border border-slate-800">
              {aiResult ? (
                aiResult
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-500 space-y-3 font-sans">
                  <Cpu className="w-10 h-10 text-slate-600 animate-pulse" />
                  <p className="text-sm font-medium text-slate-400">
                    No active blueprint generated yet.
                  </p>
                  <p className="text-xs max-w-sm">
                    Enter a project concept on the left and click "Generate AI Architecture Blueprint" to kick off your unique student project.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Portfolio */}
      {activeTab === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-semibold">
                    {proj.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{proj.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{proj.tagline}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Bookmark className="w-3.5 h-3.5 text-blue-400" />
                    <span>{proj.likes} Upvotes</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Hackathon Team Finder */}
      {activeTab === 'teammates' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Find Teammates & Hackathon Squads</h3>
              <p className="text-xs text-slate-400">
                Connect with talented peers across Computer Science, ECE, and Design for upcoming university hackathons and innovation sprints.
              </p>
            </div>
            <button
              onClick={() => alert('Post Team Request feature is open. Reach out to creator directly via email.')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
            >
              Post Team Request
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teammateRequests.map(req => (
              <div
                key={req.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      Looking for Teammates
                    </span>
                    <span className="text-xs text-slate-400">{req.creator}</span>
                  </div>

                  <h4 className="text-base font-bold text-white">{req.projectName}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{req.description}</p>

                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Needed Roles:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {req.neededRoles.map((role, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-blue-400"
                        >
                          + {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{req.contactEmail}</span>
                  <a
                    href={`mailto:${req.contactEmail}`}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all"
                  >
                    <span>Connect</span>
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold text-white">Publish New Project</h3>
            <p className="text-xs text-slate-400">
              Add your capstone or side project to your student portfolio.
            </p>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Campus Quantum Router"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={e => setNewTagline(e.target.value)}
                  placeholder="Short description..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={newTech}
                  onChange={e => setNewTech(e.target.value)}
                  placeholder="React, TypeScript, Tailwind"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="AI & Education">AI & Education</option>
                  <option value="Systems & Databases">Systems & Databases</option>
                  <option value="Mobile & IoT">Mobile & IoT</option>
                  <option value="Web Apps">Web Apps</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
