import { useNavigate } from 'react-router-dom';
import { Sun, Moon, ArrowRight, BookOpen, FileText, Calendar, Clock } from 'lucide-react';
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
      timing: '8:00 AM - 2:00 PM',
      duration: '4 Years (8 Semesters)',
      description: 'Regular undergraduate program with comprehensive coursework and research opportunities.',
      features: [
        'Regular semester-based courses',
        'Access to all labs and facilities',
        'Research project opportunities',
        'Industry internship programs',
      ],
    },
    evening: {
      icon: Moon,
      title: 'Evening Program',
      timing: '4:00 PM - 9:00 PM',
      duration: '4 Years (8 Semesters)',
      description: 'Self-supporting program designed for working professionals and those seeking flexible schedules.',
      features: [
        'Flexible evening timings',
        'Same curriculum as morning program',
        'Weekend lab sessions available',
        'Experienced industry professionals as faculty',
      ],
    },
  };

  const fields = [
    {
      id: 'CS',
      name: 'Computer Science',
      code: 'CS',
      description: 'Explore theoretical foundations, algorithms, AI, machine learning, and advanced computing.',
      courses: ['Data Structures', 'Algorithms', 'AI & ML', 'Database Systems', 'Computer Networks'],
    },
    {
      id: 'SE',
      name: 'Software Engineering',
      code: 'SE',
      description: 'Master software development methodologies, project management, and industry practices.',
      courses: ['Software Design', 'Requirements Engineering', 'Quality Assurance', 'DevOps', 'Agile Methods'],
    },
  ];

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title mb-4 animate-fade-up">Academic Programs</h1>
          <p className="section-subtitle mx-auto animate-fade-up animation-delay-100">
            Choose your preferred program timing and field of study
          </p>
        </div>
      </section>

      {/* Program Selection */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-semibold text-center mb-8">Select Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(['morning', 'evening'] as const).map((program) => {
              const details = programDetails[program];
              const isSelected = selectedProgram === program;
              const Icon = details.icon;

              return (
                <button
                  key={program}
                  onClick={() => setSelectedProgram(program)}
                  className={`group text-left p-8 rounded-2xl border-2 transition-all duration-300 card-hover ${
                    isSelected
                      ? program === 'morning'
                        ? 'border-accent bg-accent/5'
                        : 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      program === 'morning' ? 'bg-accent/10' : 'bg-primary/10'
                    }`}>
                      <Icon className={`w-7 h-7 ${program === 'morning' ? 'text-accent' : 'text-primary'}`} />
                    </div>
                    {isSelected && (
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        program === 'morning' ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                      }`}>
                        Selected
                      </div>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                    {details.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{details.description}</p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {details.timing}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {details.duration}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {details.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          program === 'morning' ? 'bg-accent' : 'bg-primary'
                        }`} />
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

      {/* Field Selection */}
      {selectedProgram && (
        <section className="py-12 bg-secondary/30 animate-fade-up">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-semibold text-center mb-4">Select Your Field</h2>
            <p className="text-center text-muted-foreground mb-8">
              Choose your area of specialization in the {selectedProgram} program
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => handleFieldSelect(field.id as 'CS' | 'SE')}
                  className="group text-left p-8 rounded-2xl border-2 border-border bg-card transition-all duration-300 card-hover hover:border-accent/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-accent" />
                    </div>
                    <span className={`badge-program ${field.id === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                      {field.code}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                    {field.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{field.description}</p>

                  <div className="mb-4">
                    <p className="text-xs font-medium text-foreground mb-2">Key Courses:</p>
                    <div className="flex flex-wrap gap-2">
                      {field.courses.slice(0, 3).map((course) => (
                        <span key={course} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    Continue to Login <ArrowRight className="w-4 h-4" />
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