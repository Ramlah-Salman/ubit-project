import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  Bell,
  LogOut,
  Menu,
  Plus,
  FileText,
  Users,
  User as UserIcon,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Announcement form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('notes');

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
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    addAnnouncement({
      title: newTitle,
      content: newContent,
      program: selectedProgram,
      field: selectedField,
      author: user.name,
    });

    toast({
      title: 'Announcement posted',
      description: 'Your announcement has been published successfully.',
    });

    setNewTitle('');
    setNewContent('');
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) {
      toast({
        title: 'Missing title',
        description: 'Please enter a title for the upload.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Material uploaded',
      description: `"${uploadTitle}" has been uploaded successfully.`,
    });

    setUploadTitle('');
    setUploadType('notes');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'upload', label: 'Upload Material', icon: Upload },
    { id: 'announcements', label: 'Post Announcement', icon: Bell },
  ];

  // Filter announcements by faculty
  const myAnnouncements = announcements.filter((a) => a.author === user.name);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        }`}
      >
        <div className={`h-full flex flex-col ${sidebarOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
                <span className="text-sidebar-primary-foreground font-serif font-bold text-lg">U</span>
              </div>
              {sidebarOpen && (
                <div>
                  <h1 className="font-serif font-semibold text-sidebar-foreground">UBIT Portal</h1>
                  <p className="text-xs text-sidebar-foreground/60">Faculty Dashboard</p>
                </div>
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
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'courses' && 'My Courses'}
                  {activeTab === 'upload' && 'Upload Material'}
                  {activeTab === 'announcements' && 'Post Announcement'}
                </h1>
                <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-up">
              {/* Welcome Card */}
              <div className="card-academic">
                <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                  Good Day, {user.name.split(' ').pop()}! 👋
                </h2>
                <p className="text-muted-foreground">
                  Manage your courses, upload materials, and post announcements.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-academic text-center card-hover">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-accent">{courses.length}</div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>
                <div className="card-academic text-center card-hover">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-primary">{myAnnouncements.length}</div>
                  <p className="text-sm text-muted-foreground">Announcements Posted</p>
                </div>
                <div className="card-academic text-center card-hover">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-accent">120+</div>
                  <p className="text-sm text-muted-foreground">Students Enrolled</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-academic">
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
                  <p className="text-muted-foreground text-sm">No announcements posted yet.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
              {courses.map((course) => (
                <div key={course.id} className="card-academic card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                      {course.code}
                    </span>
                    <span className={`badge-program ${course.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                      {course.field}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-foreground mb-2">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Semester {course.semester}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>32 students enrolled</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="max-w-2xl animate-fade-up">
              <div className="card-academic">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-6">Upload Course Material</h3>
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Material Title</label>
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Week 5 Lecture Notes"
                      className="input-academic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Material Type</label>
                    <select
                      value={uploadType}
                      onChange={(e) => setUploadType(e.target.value)}
                      className="input-academic"
                    >
                      <option value="notes">Lecture Notes</option>
                      <option value="assignment">Assignment</option>
                      <option value="past-paper">Past Paper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">File</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, PPT up to 10MB</p>
                    </div>
                  </div>
                  <Button type="submit" className="btn-accent-academic w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Material
                  </Button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="max-w-2xl animate-fade-up">
              <div className="card-academic">
                <h3 className="font-serif font-semibold text-lg text-foreground mb-6">Create Announcement</h3>
                <form onSubmit={handlePostAnnouncement} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Announcement title"
                      className="input-academic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Content</label>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write your announcement here..."
                      rows={5}
                      className="input-academic resize-none"
                    />
                  </div>
                  <Button type="submit" className="btn-accent-academic w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Announcement
                  </Button>
                </form>
              </div>

              {/* Previous Announcements */}
              {myAnnouncements.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-serif font-semibold text-lg text-foreground mb-4">Your Announcements</h3>
                  <div className="space-y-4">
                    {myAnnouncements.map((ann) => (
                      <div key={ann.id} className="card-academic">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h4 className="font-medium text-foreground">{ann.title}</h4>
                          <span className="text-sm text-muted-foreground">{ann.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}