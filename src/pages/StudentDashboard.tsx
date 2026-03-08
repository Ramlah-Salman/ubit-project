import { useState } from 'react';
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
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

type Tab = 'dashboard' | 'timetable' | 'announcements' | 'resources';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout, timetable, announcements, resources, selectedProgram, selectedField } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Filter announcements based on program and field
  const filteredAnnouncements = announcements.filter((a) => {
    const matchesProgram = !a.program || a.program === selectedProgram;
    const matchesField = !a.field || a.field === selectedField;
    return matchesProgram && matchesField;
  });

  // Filter resources
  const filteredResources = resources.filter((r) => {
    const matchesProgram = !r.program || r.program === selectedProgram;
    const matchesField = !r.field || r.field === selectedField;
    return matchesProgram && matchesField;
  });

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
                  <p className="text-xs text-sidebar-foreground/60">Student Dashboard</p>
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
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`badge-program ${user.program === 'morning' ? 'badge-morning' : 'badge-evening'}`}>
                {user.program}
              </span>
              <span className={`badge-program ${user.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                {user.field}
              </span>
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <DashboardContent
              user={user}
              timetable={timetable}
              announcements={filteredAnnouncements}
              resources={filteredResources}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'timetable' && <TimetableContent timetable={timetable} />}
          {activeTab === 'announcements' && <AnnouncementsContent announcements={filteredAnnouncements} />}
          {activeTab === 'resources' && <ResourcesContent resources={filteredResources} />}
        </div>
      </main>
    </div>
  );
}

// Dashboard Overview
function DashboardContent({
  user,
  timetable,
  announcements,
  resources,
  onNavigate,
}: {
  user: any;
  timetable: any[];
  announcements: any[];
  resources: any[];
  onNavigate: (tab: Tab) => void;
}) {
  const todayClasses = timetable.slice(0, 3);
  const recentAnnouncements = announcements.slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Welcome Card */}
      <div className="card-academic">
        <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Good Morning, {user.name}! 👋
        </h2>
        <p className="text-muted-foreground">
          Here's an overview of your academic activities for today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div className="card-academic">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-lg text-foreground">Today's Classes</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('timetable')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{cls.subject}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {cls.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {cls.room}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="card-academic">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-semibold text-lg text-foreground">Recent Announcements</h3>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('announcements')}>
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-medium text-foreground text-sm">{ann.title}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{ann.date}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-academic text-center">
          <div className="text-3xl font-serif font-bold text-accent">{timetable.length}</div>
          <p className="text-sm text-muted-foreground">Weekly Classes</p>
        </div>
        <div className="card-academic text-center">
          <div className="text-3xl font-serif font-bold text-accent">{announcements.length}</div>
          <p className="text-sm text-muted-foreground">Announcements</p>
        </div>
        <div className="card-academic text-center">
          <div className="text-3xl font-serif font-bold text-accent">{resources.length}</div>
          <p className="text-sm text-muted-foreground">Resources</p>
        </div>
        <div className="card-academic text-center">
          <div className="text-3xl font-serif font-bold text-accent">5</div>
          <p className="text-sm text-muted-foreground">Enrolled Courses</p>
        </div>
      </div>
    </div>
  );
}

// Timetable
function TimetableContent({ timetable }: { timetable: any[] }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="card-academic overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left p-4 font-serif font-semibold text-foreground">Day</th>
                <th className="text-left p-4 font-serif font-semibold text-foreground">Time</th>
                <th className="text-left p-4 font-serif font-semibold text-foreground">Subject</th>
                <th className="text-left p-4 font-serif font-semibold text-foreground">Room</th>
                <th className="text-left p-4 font-serif font-semibold text-foreground">Instructor</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry, index) => (
                <tr key={entry.id} className={index % 2 === 0 ? 'bg-card' : 'bg-secondary/20'}>
                  <td className="p-4 font-medium text-foreground">{entry.day}</td>
                  <td className="p-4 text-muted-foreground">{entry.time}</td>
                  <td className="p-4 text-foreground">{entry.subject}</td>
                  <td className="p-4 text-muted-foreground">{entry.room}</td>
                  <td className="p-4 text-muted-foreground">{entry.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Announcements
function AnnouncementsContent({ announcements }: { announcements: any[] }) {
  return (
    <div className="space-y-4 animate-fade-up">
      {announcements.map((ann) => (
        <div key={ann.id} className="card-academic card-hover">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-serif font-semibold text-lg text-foreground">{ann.title}</h3>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{ann.date}</span>
          </div>
          <p className="text-muted-foreground mb-4">{ann.content}</p>
          <div className="flex items-center gap-3">
            {ann.program && (
              <span className={`badge-program ${ann.program === 'morning' ? 'badge-morning' : 'badge-evening'}`}>
                {ann.program}
              </span>
            )}
            {ann.field && (
              <span className={`badge-program ${ann.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                {ann.field}
              </span>
            )}
            <span className="text-sm text-muted-foreground">By {ann.author}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Resources
function ResourcesContent({ resources }: { resources: any[] }) {
  const typeLabels = {
    notes: 'Lecture Notes',
    assignment: 'Assignment',
    'past-paper': 'Past Paper',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up">
      {resources.map((res) => (
        <div key={res.id} className="card-academic card-hover">
          <div className="flex items-start justify-between mb-3">
            <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
              {typeLabels[res.type as keyof typeof typeLabels]}
            </span>
            {res.field && (
              <span className={`badge-program ${res.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                {res.field}
              </span>
            )}
          </div>
          <h3 className="font-medium text-foreground mb-2">{res.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{res.subject}</p>
          <Button variant="outline" size="sm" className="w-full">
            <BookOpen className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      ))}
    </div>
  );
}