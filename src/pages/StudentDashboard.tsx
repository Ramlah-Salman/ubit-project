import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Bell,
  BookOpen,
  LogOut,
  Menu,
  ChevronRight,
  Clock,
  MapPin,
  User as UserIcon,
  X,
  Download,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

type Tab = 'dashboard' | 'timetable' | 'announcements' | 'resources';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout, timetable, announcements, resources, selectedProgram, selectedField } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user || user.role !== 'student') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'resources', label: 'Resources', icon: BookOpen },
  ];

  const handleTabChange = (id: Tab) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesProgram = !a.program || a.program === selectedProgram;
    const matchesField = !a.field || a.field === selectedField;
    return matchesProgram && matchesField;
  });

  const filteredResources = resources.filter((r) => {
    const matchesProgram = !r.program || r.program === selectedProgram;
    const matchesField = !r.field || r.field === selectedField;
    return matchesProgram && matchesField;
  });

  return (
    <div className="min-h-screen bg-white flex relative overflow-hidden">
      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#1A2F23]/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Emerald Theme */}
      <aside
        className={`fixed lg:relative z-50 h-screen bg-[#1A2F23] border-r border-emerald-900/10 transition-all duration-300 ease-in-out flex-shrink-0 ${
          sidebarOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className={`h-16 px-6 border-b border-white/10 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
                <span className="text-white font-serif font-bold text-sm">U</span>
              </div>
              {sidebarOpen && (
                <h1 className="font-serif font-bold text-emerald-50 text-sm tracking-tight whitespace-nowrap">UBIT Portal</h1>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id as Tab)}
                  className={`w-full flex items-center transition-all duration-300 ${
                    sidebarOpen ? 'px-4 py-3 gap-3 rounded-xl' : 'p-3 justify-center rounded-lg'
                  } ${
                    isActive
                      ? 'bg-white/10 text-emerald-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                      : 'text-emerald-100/50 hover:text-emerald-50 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />
                  {sidebarOpen && <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="p-4 border-t border-white/5 bg-black/10">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center transition-all ${
                sidebarOpen ? 'px-4 py-3 gap-3 rounded-xl' : 'p-3 justify-center rounded-lg'
              } text-rose-400 hover:bg-rose-500/10`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 min-h-screen min-w-0 flex flex-col bg-[#FBF9F6]">
        {/* HEADER */}
        <header className="h-16 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-emerald-900/5 px-4 sm:px-8">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-emerald-900/40 hover:text-emerald-900 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-900/30 leading-none mb-1">
                  Student Portal / {activeTab}
                </h1>
                <p className="text-lg font-serif font-bold text-[#1A2F23] hidden sm:block">Welcome, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${user.program === 'morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  {user.program}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-900 text-white text-[10px] font-black uppercase tracking-tighter">
                  {user.field}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-emerald-900/5 border border-emerald-900/10 flex items-center justify-center text-emerald-900">
                <UserIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardContent
                user={user}
                timetable={timetable}
                announcements={filteredAnnouncements}
                resources={filteredResources}
                onNavigate={handleTabChange}
              />
            )}
            {activeTab === 'timetable' && <TimetableContent timetable={timetable} />}
            {activeTab === 'announcements' && <AnnouncementsContent announcements={filteredAnnouncements} />}
            {activeTab === 'resources' && <ResourcesContent resources={filteredResources} />}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS (Refined to match Programs theme) ---

function DashboardContent({ user, timetable, announcements, onNavigate }: any) {
  const todayClasses = timetable.slice(0, 3);
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-10 rounded-[2rem] bg-[#F5F2ED] border border-emerald-900/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <LayoutDashboard className="w-32 h-32 text-emerald-900" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-serif font-bold text-[#1A2F23] mb-2">
            Good Day, {user.name.split(' ')[0]}
          </h2>
          <p className="text-emerald-900/50 font-medium">Your academic overview for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Classes Card */}
        <section className="bg-white rounded-3xl border border-emerald-900/5 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30">Schedule Overview</h3>
            <button onClick={() => onNavigate('timetable')} className="text-[10px] font-black uppercase tracking-widest text-emerald-900 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              Full Timetable <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {todayClasses.map((cls: any) => (
              <div key={cls.id} className="flex items-center gap-5 p-5 rounded-2xl bg-[#FBF9F6] border border-emerald-900/5 group hover:bg-[#F5F2ED] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-900/5 flex items-center justify-center text-emerald-900 shadow-sm group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-[#1A2F23] truncate mb-1">{cls.subject}</p>
                  <div className="flex items-center gap-4 text-[10px] font-black text-emerald-900/40 uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {cls.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {cls.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Announcements Card */}
        <section className="bg-white rounded-3xl border border-emerald-900/5 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30">Recent Bulletins</h3>
            <button onClick={() => onNavigate('announcements')} className="text-[10px] font-black uppercase tracking-widest text-emerald-900 hover:text-emerald-600 flex items-center gap-1 transition-colors">
              Read All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {announcements.slice(0, 3).map((ann: any) => (
              <div key={ann.id} className="p-5 rounded-2xl border border-emerald-900/5 bg-[#FBF9F6] hover:border-emerald-900/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-bold text-[#1A2F23] truncate">{ann.title}</p>
                  <span className="text-[9px] font-black text-emerald-900/20 uppercase tracking-widest">{ann.date}</span>
                </div>
                <p className="text-xs text-emerald-900/60 line-clamp-1 border-l-2 border-emerald-900/10 pl-3 italic">{ann.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function TimetableContent({ timetable }: { timetable: any[] }) {
  return (
    <div className="bg-white rounded-[2rem] border border-emerald-900/5 overflow-hidden animate-in fade-in duration-700 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F2ED] border-b border-emerald-900/5">
              {['Day', 'Time', 'Subject', 'Room', 'Instructor'].map((h) => (
                <th key={h} className="p-6 text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/5">
            {timetable.map((entry) => (
              <tr key={entry.id} className="hover:bg-[#FBF9F6] transition-colors group">
                <td className="p-6 text-xs font-black uppercase tracking-widest text-emerald-900/40">{entry.day}</td>
                <td className="p-6 text-sm font-bold text-emerald-700/80">{entry.time}</td>
                <td className="p-6 text-sm font-black text-[#1A2F23] uppercase tracking-tighter">{entry.subject}</td>
                <td className="p-6 text-sm font-medium text-emerald-900/60 font-mono">{entry.room}</td>
                <td className="p-6 text-sm font-medium text-emerald-900/60 italic">{entry.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnnouncementsContent({ announcements }: { announcements: any[] }) {
  return (
    <div className="grid gap-6 animate-in fade-in duration-700">
      {announcements.map((ann) => (
        <div key={ann.id} className="p-8 rounded-3xl border border-emerald-900/5 bg-white shadow-sm hover:-translate-y-1 transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 rounded bg-emerald-900 text-white text-[9px] font-black uppercase tracking-[0.2em]">Bulletin</span>
            <span className="text-[10px] font-black text-emerald-900/20 uppercase tracking-widest">{ann.date}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-4">{ann.title}</h3>
          <p className="text-[#1A2F23]/70 leading-relaxed mb-6 border-l-2 border-emerald-900/10 pl-6">{ann.content}</p>
          <div className="pt-6 border-t border-emerald-900/5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Authorized By {ann.author}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResourcesContent({ resources }: { resources: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
      {resources.map((res) => (
        <div key={res.id} className="p-8 rounded-3xl border border-emerald-900/5 bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center text-emerald-900 mb-6 group-hover:bg-emerald-900 group-hover:text-white transition-colors duration-500">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-[#1A2F23] mb-1">{res.title}</h3>
          <p className="text-[10px] font-black text-emerald-900/30 uppercase tracking-widest mb-8">{res.subject}</p>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-emerald-900/10 text-emerald-900 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-emerald-900 hover:text-white group-hover:border-emerald-900">
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      ))}
    </div>
  );
}