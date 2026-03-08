import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Bell,
  LogOut,
  Menu,
  FileText,
  Users,
  User as UserIcon,
  X,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Tab = 'dashboard' | 'courses' | 'upload' | 'announcements';

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user, logout, courses, announcements, addAnnouncement, selectedProgram, selectedField } = useApp();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  if (!user || user.role !== 'faculty') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      toast({ title: 'Missing fields', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }
    addAnnouncement({
      title: newTitle,
      content: newContent,
      program: selectedProgram,
      field: selectedField,
      author: user.name,
    });
    toast({ title: 'Announcement posted', description: 'Published successfully.' });
    setNewTitle('');
    setNewContent('');
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'upload', label: 'Material', icon: Upload },
    { id: 'announcements', label: 'Bulletins', icon: Bell },
  ];

  const myAnnouncements = announcements.filter((a) => a.author === user.name);

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
          <div className={`h-16 px-6 border-b border-white/10 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-serif font-bold text-sm">U</span>
              </div>
              {sidebarOpen && (
                <h1 className="font-serif font-bold text-emerald-50 text-sm tracking-tight whitespace-nowrap">UBIT Faculty</h1>
              )}
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center transition-all duration-300 ${
                    sidebarOpen ? 'px-4 py-3 gap-3 rounded-xl' : 'p-3 justify-center rounded-lg'
                  } ${
                    isActive
                      ? 'bg-white/10 text-emerald-400'
                      : 'text-emerald-100/50 hover:text-emerald-50 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/5 bg-black/10">
            <button onClick={handleLogout} className="w-full flex items-center p-3 gap-3 rounded-xl text-rose-400 hover:bg-rose-500/10">
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-h-screen min-w-0 flex flex-col bg-[#FBF9F6]">
        {/* HEADER */}
        <header className="h-16 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-emerald-900/5 px-4 sm:px-8">
          <div className="h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-emerald-900/40">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-900/30 leading-none mb-1">
                  Faculty Center / {activeTab}
                </h1>
                <p className="text-lg font-serif font-bold text-[#1A2F23] hidden sm:block">Academic Year 2026</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-900/5 border border-emerald-900/10 flex items-center justify-center text-emerald-900">
              <UserIcon className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-4 sm:p-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="p-10 rounded-[2rem] bg-[#F5F2ED] border border-emerald-900/5">
                  <h2 className="text-4xl font-serif font-bold text-[#1A2F23] mb-2">
                    Welcome, {user.name.split(' ').pop()}
                  </h2>
                  <p className="text-emerald-900/50 font-medium">Your teaching metrics and recent portal activities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard icon={BookOpen} label="Assigned Courses" value={courses.length} color="text-emerald-700" />
                  <StatCard icon={Bell} label="Active Bulletins" value={myAnnouncements.length} color="text-amber-700" />
                  <StatCard icon={Users} label="Total Students" value="120+" color="text-indigo-700" />
                </div>

                <div className="bg-white rounded-3xl border border-emerald-900/5 p-8 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 mb-6">Internal Activity Feed</h3>
                  {myAnnouncements.length > 0 ? (
                    <div className="space-y-4">
                      {myAnnouncements.slice(0, 3).map((ann) => (
                        <div key={ann.id} className="p-5 rounded-2xl bg-[#FBF9F6] border border-emerald-900/5">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-bold text-[#1A2F23]">{ann.title}</p>
                            <span className="text-[9px] font-black text-emerald-900/20 uppercase tracking-widest">{ann.date}</span>
                          </div>
                          <p className="text-xs text-emerald-900/60 line-clamp-1 border-l-2 border-emerald-900/10 pl-3 italic">{ann.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-900/30 italic">No portal entries found.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
                {courses.map((course) => (
                  <div key={course.id} className="p-8 rounded-3xl border border-emerald-900/5 bg-white shadow-sm group hover:-translate-y-1 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 rounded bg-emerald-900 text-white text-[9px] font-black uppercase tracking-widest">{course.code}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{course.field}</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-4 group-hover:text-emerald-700 transition-colors">{course.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-emerald-900/30 uppercase tracking-widest border-t border-emerald-900/5 pt-4">
                      <Users className="w-3 h-3" />
                      <span>32 Students Enrolled</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white rounded-[2rem] border border-emerald-900/5 p-10 shadow-sm">
                  <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-8">Publish Repository Material</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 mb-2 block text-center lg:text-left">Entry Title</label>
                      <input type="text" placeholder="e.g. CS-402 Lecture 04" className="w-full h-12 px-5 rounded-xl border border-emerald-900/5 bg-[#FBF9F6] outline-none focus:border-emerald-900/20 transition-all font-medium text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 mb-2 block">Category</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-emerald-900/5 bg-[#FBF9F6] outline-none text-xs font-bold uppercase tracking-widest">
                          <option>Lecture Notes</option>
                          <option>Assignment</option>
                          <option>Past Paper</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 mb-2 block">Target Course</label>
                        <select className="w-full h-12 px-4 rounded-xl border border-emerald-900/5 bg-[#FBF9F6] outline-none text-xs font-bold uppercase tracking-widest">
                          {courses.map(c => <option key={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="border-2 border-dashed border-emerald-900/10 rounded-3xl p-12 text-center hover:bg-[#F5F2ED] transition-colors cursor-pointer group">
                      <FileText className="w-10 h-10 text-emerald-900/20 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900">Drop Archive File</p>
                      <p className="text-[9px] text-emerald-900/30 uppercase mt-2">PDF / PPTX (MAX 20MB)</p>
                    </div>
                    <button type="button" className="w-full h-14 rounded-xl bg-emerald-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:bg-emerald-800 transition-all">
                      Confirm Publication
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white rounded-[2rem] border border-emerald-900/5 p-10 shadow-sm mb-10">
                  <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-8">Compose Portal Bulletin</h3>
                  <form onSubmit={handlePostAnnouncement} className="space-y-6">
                    <input 
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Subject Line" 
                      className="w-full h-12 px-5 rounded-xl border border-emerald-900/5 bg-[#FBF9F6] outline-none text-sm font-medium" 
                    />
                    <textarea 
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Broadcast content for students..." 
                      rows={4} 
                      className="w-full p-5 rounded-xl border border-emerald-900/5 bg-[#FBF9F6] outline-none resize-none text-sm leading-relaxed" 
                    />
                    <button type="submit" className="w-full h-14 rounded-xl bg-emerald-900 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                      Send Broadcast
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="p-8 rounded-3xl bg-white border border-emerald-900/5 text-center shadow-sm">
      <div className={`w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center mx-auto mb-4 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className={`text-4xl font-serif font-bold text-[#1A2F23] mb-1`}>{value}</div>
      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30">{label}</p>
    </div>
  );
}