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
  Plus,
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

  // Announcement form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Upload form
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('notes');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    toast({ title: 'Announcement posted', description: 'Your announcement has been published.' });
    setNewTitle('');
    setNewContent('');
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) {
      toast({ title: 'Missing title', description: 'Please enter a title for the upload.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Material uploaded', description: `"${uploadTitle}" has been uploaded successfully.` });
    setUploadTitle('');
    setUploadType('notes');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'upload', label: 'Upload Material', icon: Upload },
    { id: 'announcements', label: 'Post Announcement', icon: Bell },
  ];

  const myAnnouncements = announcements.filter((a) => a.author === user.name);

  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Mobile backdrop */}
      {sidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0 ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`h-16 px-6 border-b border-sidebar-border flex items-center justify-between`}>
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white font-bold font-serif text-lg">U</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="text-sidebar-foreground font-semibold font-serif">UBIT Portal</h1>
                  <p className="text-xs text-sidebar-foreground/60">Faculty Dashboard</p>
                </div>
              )}
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5 text-sidebar-foreground" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-secondary">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">{activeTab}</h1>
                <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="card-academic p-6">
                <h2 className="text-2xl font-serif font-semibold text-foreground">Hello, {user.name} 👋</h2>
                <p className="text-muted-foreground">Manage courses, uploads, and announcements.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard icon={BookOpen} label="Courses" value={courses.length} color="text-accent" />
                <StatCard icon={Bell} label="Announcements" value={myAnnouncements.length} color="text-primary" />
                <StatCard icon={Users} label="Students" value="120+" color="text-accent" />
              </div>

              <div className="card-academic p-4">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Recent Announcements</h3>
                {myAnnouncements.length > 0 ? (
                  <div className="space-y-3">
                    {myAnnouncements.slice(0, 3).map((ann) => (
                      <div key={ann.id} className="p-3 rounded-lg bg-secondary/50">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-foreground text-sm">{ann.title}</p>
                          <span className="text-xs text-muted-foreground">{ann.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No announcements yet.</p>
                )}
              </div>
            </div>
          )}

          {/* COURSES */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="card-academic p-6">
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">{course.code}</span>
                    <span className="badge-program">{course.field}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-1">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">Semester {course.semester}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>32 students enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* UPLOAD */}
          {activeTab === 'upload' && (
            <div className="max-w-2xl mx-auto">
              <div className="card-academic p-6">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Upload Material</h3>
                <form onSubmit={handleUpload} className="space-y-4">
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Material title"
                    className="input-academic"
                  />
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="input-academic"
                  >
                    <option value="notes">Lecture Notes</option>
                    <option value="assignment">Assignment</option>
                    <option value="past-paper">Past Paper</option>
                  </select>
                  <div className="border-2 border-dashed border-border p-8 text-center cursor-pointer">
                    <FileText className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click or drag file</p>
                  </div>
                  <Button type="submit" className="btn-accent-academic w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Material
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="max-w-2xl mx-auto">
              <div className="card-academic p-6">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Post Announcement</h3>
                <form onSubmit={handlePostAnnouncement} className="space-y-4">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title"
                    className="input-academic"
                  />
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={4}
                    placeholder="Content..."
                    className="input-academic resize-none"
                  />
                  <Button type="submit" className="btn-accent-academic w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Announcement
                  </Button>
                </form>
                {myAnnouncements.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {myAnnouncements.map((ann) => (
                      <div key={ann.id} className="card-academic p-4">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium text-foreground">{ann.title}</h4>
                          <span className="text-xs text-muted-foreground">{ann.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-border text-center shadow-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-2xl font-serif font-bold mb-1">{value}</div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}