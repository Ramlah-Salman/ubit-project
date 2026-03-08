import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Briefcase, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp, UserRole } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, selectedProgram, selectedField } = useApp();
  const { toast } = useToast();

  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      description: 'Create a student account to access your portal',
    },
    {
      id: 'faculty',
      title: 'Faculty',
      icon: Briefcase,
      description: 'Create a faculty account to manage courses',
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

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are the same.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Weak password',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const success = await signup(name, email, password, selectedRole);

    if (success) {
      toast({
        title: 'Account created',
        description: `Welcome to UBIT Portal! Redirecting to your ${selectedRole} dashboard.`,
      });

      setTimeout(() => {
        navigate(selectedRole === 'student' ? '/student-dashboard' : '/faculty-dashboard');
      }, 500);
    } else {
      toast({
        title: 'Signup failed',
        description: 'User may already exist or there was a server error.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-serif font-bold text-2xl">U</span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Create your account</h1>
            <p className="text-muted-foreground">Sign up to access the UBIT Portal</p>

            {/* Show selected program/field */}
            {(selectedProgram || selectedField) && (
              <div className="flex justify-center gap-2 mt-4">
                {selectedProgram && (
                  <span className={`badge-program ${selectedProgram === 'morning' ? 'badge-morning' : 'badge-evening'}`}>
                    {selectedProgram.charAt(0).toUpperCase() + selectedProgram.slice(1)}
                  </span>
                )}
                {selectedField && (
                  <span className={`badge-program ${selectedField === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                    {selectedField}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6 animate-fade-up animation-delay-100">
            <label className="block text-sm font-medium text-foreground mb-3">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => {
                const isSelected = selectedRole === role.id;
                const Icon = role.icon;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id as UserRole)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-accent bg-accent/5'
                        : 'border-border bg-card hover:border-accent/50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`} />
                    <p className="font-medium text-foreground">{role.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-up animation-delay-200">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="input-academic pl-12"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@uok.edu.pk"
                  className="input-academic pl-12"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="input-academic pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="input-academic pl-12 pr-12"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-accent-academic"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign Up <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-up animation-delay-300">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

