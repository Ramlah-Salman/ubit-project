import { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp, UserRole } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login, selectedProgram, selectedField } = useApp();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FIX: Force scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Access your courses, timetable, and resources',
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: Briefcase,
      description: 'Manage courses, upload materials, post announcements',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast({
        title: 'Please select a role',
        description: 'Choose whether you are a student or faculty member.',
        variant: 'destructive',
      });
      return;
    }

    if (!email || !password) {
      toast({
        title: 'Missing credentials',
        description: 'Please enter your email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(email, password, selectedRole);

    if (success) {
      toast({
        title: 'Login successful',
        description: `Welcome back! Redirecting to your ${selectedRole} dashboard.`,
      });

      setTimeout(() => {
        navigate(selectedRole === 'student' ? '/student-dashboard' : '/faculty-dashboard');
      }, 500);
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <MainLayout>
      {/* Changed min-h to ensure it occupies the full viewport 
         minus common header height, and added items-start with pt-20
         to ensure it's not "stuck" to the footer on tall screens.
      */}
      <div className="min-h-screen flex items-start justify-center pt-20 pb-12 px-4 bg-background">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-sidebar-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
              <span className="text-sidebar-primary-foreground font-serif font-bold text-2xl">U</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access the UBIT Portal</p>

            {/* Show selected program/field */}
            {(selectedProgram || selectedField) && (
              <div className="flex justify-center gap-2 mt-4">
                {selectedProgram && (
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedProgram === 'morning' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'}`}>
                    {selectedProgram}
                  </span>
                )}
                {selectedField && (
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedField === 'CS' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {selectedField}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id as UserRole)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left group ${
                      isSelected
                        ? 'border-sidebar-primary bg-sidebar-primary/5 ring-4 ring-sidebar-primary/10'
                        : 'border-border bg-card hover:border-sidebar-primary/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-3 transition-transform group-hover:scale-110 ${isSelected ? 'text-sidebar-primary' : 'text-muted-foreground'}`} />
                    <p className="font-bold text-foreground text-sm">{role.title}</p>
                    <p className="text-[12px] text-muted-foreground mt-1 leading-tight">{role.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                University Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-sidebar-primary transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@uok.edu.pk"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-secondary/20 focus:bg-background focus:ring-2 ring-sidebar-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-sidebar-primary transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-border bg-secondary/20 focus:bg-background focus:ring-2 ring-sidebar-primary/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-sidebar-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-[11px] font-medium text-muted-foreground mt-8 uppercase tracking-[0.2em]">
            Authorized Access Only
          </p>
        </div>
      </div>
    </MainLayout>
  );
}