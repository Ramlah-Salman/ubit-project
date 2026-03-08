import { useNavigate } from 'react-router-dom';
import { Sun, Moon, ArrowRight, BookOpen, Calendar, Clock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Programs() {
  const navigate = useNavigate();
  const { selectedProgram, setSelectedProgram, setSelectedField } = useApp();

  const handleFieldSelect = (field: 'CS' | 'SE') => {
    setSelectedField(field);
    navigate('/login');
  };

  const programDetails = {
    morning: {
      icon: Sun,
      title: 'Morning Program',
      color: 'amber',
      timing: '8:00 AM - 2:00 PM',
      duration: '4 Years (8 Semesters)',
      description: 'Regular undergraduate program with comprehensive coursework and research opportunities.',
      features: ['Regular semester-based courses', 'Access to all labs and facilities', 'Research project opportunities', 'Industry internship programs'],
    },
    evening: {
      icon: Moon,
      title: 'Evening Program',
      color: 'indigo',
      timing: '4:00 PM - 9:00 PM',
      duration: '4 Years (8 Semesters)',
      description: 'Self-supporting program designed for working professionals and flexible schedules.',
      features: ['Flexible evening timings', 'Same curriculum as morning', 'Weekend lab sessions', 'Industry professional faculty'],
    },
  };

  const fields = [
    {
      id: 'CS',
      name: 'Computer Science',
      code: 'CS',
      description: 'Explore theoretical foundations, algorithms, AI, and advanced computing.',
      courses: ['Data Structures', 'Algorithms', 'AI & ML'],
    },
    {
      id: 'SE',
      name: 'Software Engineering',
      code: 'SE',
      description: 'Master software development methodologies and industry practices.',
      courses: ['Software Design', 'QA & Testing', 'DevOps'],
    },
  ];

  return (
    <MainLayout>
      {/* Header - Subtle Beige Background */}
      <section className="py-20 bg-[#F5F2ED] border-b border-emerald-900/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-800 bg-emerald-100/50 rounded-sm">
            Academic Path
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A2F23] mb-4">Academic Programs</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your preferred timing and specialization to continue
          </p>
        </div>
      </section>

      {/* Program Selection - Minimal Glass Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {(['morning', 'evening'] as const).map((program) => {
              const details = programDetails[program];
              const isSelected = selectedProgram === program;
              const Icon = details.icon;
              const activeColor = details.color === 'amber' ? 'text-amber-600' : 'text-indigo-600';
              const activeBg = details.color === 'amber' ? 'bg-amber-50' : 'bg-indigo-50';
              const activeBorder = details.color === 'amber' ? 'border-amber-200' : 'border-indigo-200';

              return (
                <button
                  key={program}
                  onClick={() => setSelectedProgram(program)}
                  className={`group relative text-left p-10 rounded-3xl border transition-all duration-500 ${
                    isSelected 
                    ? `${activeBorder} ${activeBg} shadow-lg shadow-emerald-900/5` 
                    : 'border-emerald-900/5 bg-[#FBF9F6] hover:border-emerald-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isSelected ? 'bg-white shadow-sm' : 'bg-white/50'}`}>
                      <Icon className={`w-7 h-7 ${isSelected ? activeColor : 'text-emerald-900/40'}`} />
                    </div>
                    {isSelected && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white ${activeColor} border ${activeBorder}`}>
                        Active
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-[#1A2F23] mb-3">{details.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{details.description}</p>

                  <div className="flex gap-6 mb-8 py-4 border-y border-emerald-900/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1A2F23]/60">
                      <Clock className="w-4 h-4 text-emerald-600" /> {details.timing}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1A2F23]/60">
                      <Calendar className="w-4 h-4 text-emerald-600" /> {details.duration}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {details.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? (details.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500') : 'bg-emerald-900/20'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Field Selection - Revealed on Choice */}
      {selectedProgram && (
        <section className="py-20 bg-[#F5F2ED] animate-fade-up">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold text-[#1A2F23] mb-10">Select Specialization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => handleFieldSelect(field.id as 'CS' | 'SE')}
                  className="group relative text-left p-10 bg-white rounded-3xl border border-emerald-900/5 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-emerald-900/20 uppercase group-hover:text-emerald-600 transition-colors">
                      {field.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-3">{field.name}</h3>
                  <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{field.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {field.courses.map((course) => (
                        <span key={course} className="px-2 py-1 bg-[#F5F2ED] text-[9px] font-bold text-emerald-900/60 rounded uppercase tracking-tighter">
                          {course}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-600 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
}