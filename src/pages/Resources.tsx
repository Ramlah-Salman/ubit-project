import { useState } from 'react';
import { BookOpen, Filter, FileText, ClipboardList, ScrollText, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Resources() {
  const { resources } = useApp();
  const [fieldFilter, setFieldFilter] = useState<'all' | 'CS' | 'SE'>('all');
  const [programFilter, setProgramFilter] = useState<'all' | 'morning' | 'evening'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'notes' | 'assignment' | 'past-paper'>('all');

  const filteredResources = resources.filter((res) => {
    const matchesField = fieldFilter === 'all' || !res.field || res.field === fieldFilter;
    const matchesProgram = programFilter === 'all' || !res.program || res.program === programFilter;
    const matchesType = typeFilter === 'all' || res.type === typeFilter;
    return matchesField && matchesProgram && matchesType;
  });

  const typeIcons = {
    notes: FileText,
    assignment: ClipboardList,
    'past-paper': ScrollText,
  };

  const typeLabels = {
    notes: 'Lecture Notes',
    assignment: 'Assignment',
    'past-paper': 'Past Paper',
  };

  // Modernized color palette for resource types
  const typeColors = {
    notes: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    assignment: 'text-amber-600 bg-amber-50 border-amber-100',
    'past-paper': 'text-indigo-600 bg-indigo-50 border-indigo-100',
  };

  return (
    <MainLayout>
      {/* Header - Consistent with Programs/Announcements */}
      <section className="py-20 bg-[#F5F2ED] border-b border-emerald-900/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-800 bg-emerald-100/50 rounded-sm">
            Digital Archive
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A2F23] mb-4">Resources</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Access the central repository for lecture material and past assessments
          </p>
        </div>
      </section>

      {/* Modern Pill Filters - Sticky */}
      <section className="py-6 bg-white border-b border-emerald-900/5 sticky top-[72px] z-20 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 flex items-center gap-2 mr-2">
              <Filter className="w-3 h-3" /> Filter Archive
            </span>
            
            {/* Type Filter Group */}
            <div className="flex bg-[#F5F2ED] p-1 rounded-full border border-emerald-900/5 overflow-x-auto no-scrollbar">
              {(['all', 'notes', 'assignment', 'past-paper'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all duration-300 ${
                    typeFilter === type 
                    ? 'bg-white text-emerald-900 shadow-sm' 
                    : 'text-emerald-900/40 hover:text-emerald-900'
                  }`}
                >
                  {type === 'all' ? 'All Types' : typeLabels[type as keyof typeof typeLabels]}
                </button>
              ))}
            </div>

            {/* Field Filter Group */}
            <div className="flex bg-[#F5F2ED] p-1 rounded-full border border-emerald-900/5">
              {(['all', 'CS', 'SE'] as const).map((field) => (
                <button
                  key={field}
                  onClick={() => setFieldFilter(field)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    fieldFilter === field 
                    ? 'bg-white text-emerald-900 shadow-sm' 
                    : 'text-emerald-900/40 hover:text-emerald-900'
                  }`}
                >
                  {field === 'all' ? 'All Fields' : field}
                </button>
              ))}
            </div>

            {/* Program Filter Group */}
            <div className="flex bg-[#F5F2ED] p-1 rounded-full border border-emerald-900/5">
              {(['all', 'morning', 'evening'] as const).map((program) => (
                <button
                  key={program}
                  onClick={() => setProgramFilter(program)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    programFilter === program 
                    ? 'bg-white text-emerald-900 shadow-sm' 
                    : 'text-emerald-900/40 hover:text-emerald-900'
                  }`}
                >
                  {program === 'all' ? 'All' : program.charAt(0).toUpperCase() + program.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredResources.map((res, index) => {
                const Icon = typeIcons[res.type as keyof typeof typeIcons];
                const typeStyle = typeColors[res.type as keyof typeof typeColors];

                return (
                  <div
                    key={res.id}
                    className="group relative p-8 rounded-3xl border border-emerald-900/5 bg-[#FBF9F6] transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors duration-500 ${typeStyle}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex gap-2">
                        {res.program && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                            res.program === 'morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {res.program}
                          </span>
                        )}
                        {res.field && (
                          <span className="px-2 py-0.5 rounded bg-emerald-900 text-white text-[9px] font-black uppercase tracking-tighter">
                            {res.field}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-3 ${typeStyle}`}>
                        {typeLabels[res.type as keyof typeof typeLabels]}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#1A2F23] mb-2 group-hover:text-emerald-700 transition-colors">
                        {res.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{res.subject}</p>
                    </div>

                    <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-emerald-900/10 text-emerald-900 text-xs font-bold transition-all duration-300 hover:bg-emerald-900 hover:text-white hover:border-emerald-900 shadow-sm">
                      <Download className="w-4 h-4 group-hover:animate-bounce" />
                      Download Resource
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-[#F5F2ED] flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-emerald-900/20" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-2">No materials found</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We couldn't find any resources matching your current filter selection.
              </p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}