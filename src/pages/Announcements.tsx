import { useState } from 'react';
import { Bell, Filter, Calendar, User, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';

export default function Announcements() {
  const { announcements } = useApp();
  const [fieldFilter, setFieldFilter] = useState<'all' | 'CS' | 'SE'>('all');
  const [programFilter, setProgramFilter] = useState<'all' | 'morning' | 'evening'>('all');

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesField = fieldFilter === 'all' || !ann.field || ann.field === fieldFilter;
    const matchesProgram = programFilter === 'all' || !ann.program || ann.program === programFilter;
    return matchesField && matchesProgram;
  });

  return (
    <MainLayout>
      {/* Header - Matching Programs Page */}
      <section className="py-20 bg-[#F5F2ED] border-b border-emerald-900/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-[0.3em] font-bold text-emerald-800 bg-emerald-100/50 rounded-sm">
            Departmental News
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A2F23] mb-4">Announcements</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Stay informed with the latest updates from UBIT Karachi
          </p>
        </div>
      </section>

      {/* Filter Bar - Modern Minimalist */}
      <section className="py-6 bg-white border-b border-emerald-900/5 sticky top-[72px] z-20 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-900/30 flex items-center gap-2 mr-2">
                <Filter className="w-3 h-3" /> Filters
              </span>
              
              {/* Field Filter Group */}
              <div className="flex bg-[#F5F2ED] p-1 rounded-full border border-emerald-900/5">
                {(['all', 'CS', 'SE'] as const).map((field) => (
                  <button
                    key={field}
                    onClick={() => setFieldFilter(field)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
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
                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 ${
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
        </div>
      </section>

      {/* Announcements List - Matching Program Cards Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredAnnouncements.map((ann, index) => (
                <div
                  key={ann.id}
                  className="group relative p-8 md:p-10 rounded-3xl border border-emerald-900/5 bg-[#FBF9F6] transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Subtle Top Line Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    ann.program === 'morning' ? 'bg-amber-500' : ann.program === 'evening' ? 'bg-indigo-500' : 'bg-emerald-600'
                  }`} />

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">
                        <Calendar className="w-3.5 h-3.5" />
                        {ann.date}
                      </div>
                      <div className="flex gap-2">
                        {ann.program && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                            ann.program === 'morning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {ann.program}
                          </span>
                        )}
                        {ann.field && (
                          <span className="px-2 py-0.5 rounded bg-emerald-900 text-white text-[9px] font-black uppercase tracking-tighter">
                            {ann.field}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-[#1A2F23] leading-tight group-hover:text-emerald-700 transition-colors">
                      {ann.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base border-l-2 border-emerald-900/5 pl-6 py-1">
                      {ann.content}
                    </p>

                    <div className="flex items-center gap-4 pt-6 mt-2 border-t border-emerald-900/5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-900/60 uppercase tracking-widest">
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        {ann.author}
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                         <span className="text-[10px] font-black text-emerald-900/20 uppercase tracking-widest">Official Bulletin</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State - Minimal */
            <div className="text-center py-24 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-[#F5F2ED] flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-emerald-900/20" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A2F23] mb-2">Nothing found</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Adjust your filters to see other department announcements.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}