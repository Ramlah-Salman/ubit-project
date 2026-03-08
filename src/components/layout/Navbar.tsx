import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Programs', path: '/programs' },
  { name: 'Bulletins', path: '/announcements' },
  { name: 'Resources', path: '/resources' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* LOGO - Increased sizing */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded bg-[#1A2F23] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-serif font-bold text-2xl">U</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif font-bold text-[#1A2F23] text-xl leading-none tracking-tight">UBIT</h1>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-900/40">Portal</p>
            </div>
          </Link>

          {/* DESKTOP NAV - Increased from 10px to 13px */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-black uppercase tracking-[0.15em] transition-all hover:text-[#1A2F23] ${
                  isActive(link.path) ? 'text-[#1A2F23] border-b-2 border-emerald-500 pb-1' : 'text-emerald-900/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* AUTH SECTION */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-12 px-5 rounded-xl hover:bg-emerald-900/5 gap-3 border border-emerald-900/5">
                    <div className="w-8 h-8 rounded-full bg-emerald-900/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-emerald-900" />
                    </div>
                    {/* Show first and last name with a space */}
                    <span className="text-sm font-bold text-[#1A2F23]">
                      {user ? user.name.split(' ').slice(0, 2).join(' ') : ''}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-emerald-900/10 shadow-xl">
                  <div className="px-4 py-4 bg-[#FBF9F6] rounded-xl mb-2">
                    <p className="text-sm font-bold text-[#1A2F23]">{user?.name}</p>
                    <p className="text-xs text-emerald-900/40 mb-3">{user?.email}</p>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 rounded bg-emerald-900 text-white text-[9px] font-black uppercase tracking-wider">{user?.field}</span>
                      <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase tracking-wider">{user?.program}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-emerald-900/5" />
                  <DropdownMenuItem asChild className="rounded-lg focus:bg-emerald-900/5">
                    <Link to={user?.role === 'student' ? '/student-dashboard' : '/faculty-dashboard'} className="text-[12px] font-black text-emerald-900/60 uppercase tracking-widest p-3">
                      Go to Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-emerald-900/5" />
                  <DropdownMenuItem onClick={logout} className="rounded-lg focus:bg-rose-50 text-rose-500 p-3">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="text-[12px] font-black uppercase tracking-widest">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                {/* Button text increased to 12px */}
                <button className="h-12 px-10 rounded-xl bg-emerald-900 text-white text-[12px] font-black uppercase tracking-[0.2em] hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10">
                  Secure Login
                </button>
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-emerald-900">
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-8 border-t border-emerald-900/5 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-6 py-4 rounded-xl text-[14px] font-black uppercase tracking-[0.2em] ${
                    isActive(link.path) ? 'bg-[#F5F2ED] text-[#1A2F23]' : 'text-emerald-900/40'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-emerald-900/5 mt-6 pt-6 px-2">
                {isAuthenticated ? (
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-center py-5 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] text-rose-500 bg-rose-50/50">
                    Sign Out
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block py-5 rounded-xl text-[12px] font-black uppercase tracking-[0.2em] bg-emerald-900 text-white text-center">
                    Login to Portal
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}