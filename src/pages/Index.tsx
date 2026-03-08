import { useNavigate } from 'react-router-dom';
import { Sun, Moon, ArrowRight, GraduationCap, BookOpen, Users, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';
import heroBg from '@/assets/hero-bg.jpg';

export default function Index() {
  const navigate = useNavigate();
  const { setSelectedProgram, selectedProgram } = useApp();

  const handleProgramSelect = (program: 'morning' | 'evening') => {
    setSelectedProgram(program);
    navigate('/programs');
  };

  const stats = [
    { icon: GraduationCap, label: 'Students', value: '1,200+' },
    { icon: Users, label: 'Faculty Members', value: '45+' },
    { icon: BookOpen, label: 'Courses Offered', value: '60+' },
    { icon: Award, label: 'Years of Excellence', value: '35+' },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/20 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge - Added mt-10 on mobile only to prevent header collision */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mt-5 md:mt-0 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">Welcome to UBIT</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 animate-fade-up animation-delay-100">
              UBIT Department
              <span className="block text-accent">Portal</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up animation-delay-200">
              Department of Computer Science & Software Engineering
              <span className="block text-sm mt-2">University of Karachi</span>
            </p>
            {/* Program Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-fade-up animation-delay-300">
              {/* Morning Program */}
              <button
                onClick={() => handleProgramSelect('morning')}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                  selectedProgram === 'morning'
                    ? 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                    : 'border-border/40 bg-card/80 backdrop-blur-sm hover:border-amber-500/30 hover:bg-amber-500/[0.02]'
                }`}
              >
                {/* Decorative Background Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />
                
                <div className="absolute top-4 right-4">
                  <Sun className={`w-6 h-6 transition-colors duration-300 ${selectedProgram === 'morning' ? 'text-amber-500' : 'text-muted-foreground group-hover:text-amber-500'}`} />
                </div>
                <div className="text-left relative z-10">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Morning Program
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regular semester courses from 8:00 AM to 2:00 PM
                  </p>
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Evening Program */}
              <button
                onClick={() => handleProgramSelect('evening')}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                  selectedProgram === 'evening'
                    ? 'border-indigo-500/50 bg-indigo-500/5 shadow-[0_0_20px_rgba(99,102,241,0.1)]'
                    : 'border-border/40 bg-card/80 backdrop-blur-sm hover:border-indigo-500/30 hover:bg-indigo-500/[0.02]'
                }`}
              >
                {/* Decorative Background Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors" />

                <div className="absolute top-4 right-4">
                  <Moon className={`w-6 h-6 transition-colors duration-300 ${selectedProgram === 'evening' ? 'text-indigo-500' : 'text-muted-foreground group-hover:text-indigo-500'}`} />
                </div>
                <div className="text-left relative z-10">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Evening Program
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Self-supporting courses from 4:00 PM to 9:00 PM
                  </p>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-500 font-medium text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden bg-[#F5F2ED]">
        {/* Ambient Glow - Soft emerald light hitting the beige surface */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-200/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative text-center p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-emerald-900/5 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 animate-fade-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 1. Subtle Hover Gradient - Fading emerald light */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* 2. Minimalist Top Line - Gold-Emerald accent */}
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-emerald-800/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                {/* 3. Icon Container - emerald themed squircle (Rotation removed) */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#E8E4DB] flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-emerald-800 group-hover:shadow-lg group-hover:shadow-emerald-900/20">
                  <stat.icon className="w-8 h-8 text-emerald-900 transition-colors duration-500 group-hover:text-white" />
                </div>

                {/* 4. Value - Serif font for that premium academic feel */}
                <div className="relative z-10 text-4xl font-serif font-bold text-[#1A2F23] mb-1 tracking-tight">
                  {stat.value}
                </div>

                {/* 5. Label - Clean, spaced, and professional */}
                <div className="relative z-10 text-[10px] uppercase tracking-[0.25em] text-emerald-900/60 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* About Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#F5F2ED] via-white to-[#F5F2ED]">
        {/* Decorative Grid Pattern - Adds a 'tech-academic' texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} />
             
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Header Area */}
            <div className="mb-16 animate-fade-up">
              <div className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-800 bg-emerald-100/50 rounded-sm">
                Academic Excellence
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A2F23] mb-6">
                About Our Department
              </h2>
              <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8 rounded-full" />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The Department of Computer Science & Software Engineering (UBIT) at University of Karachi 
                has been a pioneer in computing education since 1989. We prepare students for the 
                ever-evolving technology landscape through academic excellence.
              </p>
            </div>

            {/* Academic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Computer Science Card */}
              <div className="group relative p-10 bg-white/60 backdrop-blur-md border border-emerald-900/10 rounded-2xl text-left transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/[0.03] rounded-bl-[120px] -mr-16 -mt-16 transition-all duration-500 group-hover:bg-emerald-600/[0.08]" />
                
                <h3 className="font-serif font-bold text-2xl text-[#1A2F23] mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-emerald-600 transition-all duration-500 group-hover:w-12" />
                  Computer Science
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Focus on theoretical foundations, algorithms, artificial intelligence, 
                  data science, and advanced computing concepts that drive the digital age.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wider text-emerald-900/70 font-bold">
                  <span className="flex items-center gap-2 italic">/ AI & ML</span>
                  <span className="flex items-center gap-2 italic">/ Algorithms</span>
                  <span className="flex items-center gap-2 italic">/ Data Science</span>
                  <span className="flex items-center gap-2 italic">/ Theory</span>
                </div>
              </div>

              {/* Software Engineering Card */}
              <div className="group relative p-10 bg-white/60 backdrop-blur-md border border-emerald-900/10 rounded-2xl text-left transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/[0.03] rounded-bl-[120px] -mr-16 -mt-16 transition-all duration-500 group-hover:bg-emerald-600/[0.08]" />

                <h3 className="font-serif font-bold text-2xl text-[#1A2F23] mb-4 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-emerald-600 transition-all duration-500 group-hover:w-12" />
                  Software Engineering
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Emphasis on software development methodologies, project management, 
                  quality assurance, and building scalable industrial-grade applications.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-wider text-emerald-900/70 font-bold">
                  <span className="flex items-center gap-2 italic">/ Dev Ops</span>
                  <span className="flex items-center gap-2 italic">/ Full-Stack</span>
                  <span className="flex items-center gap-2 italic">/ Project Mgmt</span>
                  <span className="flex items-center gap-2 italic">/ QA Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}