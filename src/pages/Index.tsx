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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border mb-8 animate-fade-up">
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
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 card-hover ${
                  selectedProgram === 'morning'
                    ? 'border-accent bg-accent/10'
                    : 'border-border bg-card/80 backdrop-blur-sm hover:border-accent/50'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <Sun className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Morning Program
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regular semester courses from 8:00 AM to 2:00 PM
                  </p>
                  <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Evening Program */}
              <button
                onClick={() => handleProgramSelect('evening')}
                className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 card-hover ${
                  selectedProgram === 'evening'
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card/80 backdrop-blur-sm hover:border-primary/50'
                }`}
              >
                <div className="absolute top-4 right-4">
                  <Moon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    Evening Program
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Self-supporting courses from 4:00 PM to 9:00 PM
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card border border-border card-hover animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-serif font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-6">About Our Department</h2>
            <p className="section-subtitle mx-auto mb-8">
              The Department of Computer Science & Software Engineering (UBIT) at University of Karachi 
              has been a pioneer in computing education since 1989. We offer undergraduate and graduate 
              programs in Computer Science and Software Engineering, preparing students for successful 
              careers in the ever-evolving technology landscape.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="card-academic card-hover text-left">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-3">Computer Science</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on theoretical foundations, algorithms, artificial intelligence, 
                  data science, and advanced computing concepts.
                </p>
              </div>
              <div className="card-academic card-hover text-left">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-3">Software Engineering</h3>
                <p className="text-sm text-muted-foreground">
                  Emphasis on software development methodologies, project management, 
                  quality assurance, and industry-ready practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}