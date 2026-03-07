import { useState } from 'react';
import { BookOpen, Filter, FileText, ClipboardList, ScrollText, Download } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

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

  const typeColors = {
    notes: 'bg-accent/10 text-accent',
    assignment: 'bg-primary/10 text-primary',
    'past-paper': 'bg-orange-500/10 text-orange-600',
  };

  return (
    <MainLayout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="section-title mb-1">Resources</h1>
              <p className="text-muted-foreground">Access lecture notes, assignments, and past papers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter:
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'notes', 'assignment', 'past-paper'] as const).map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                  className={typeFilter === type ? '' : 'bg-transparent'}
                >
                  {type === 'all' ? 'All Types' : typeLabels[type as keyof typeof typeLabels]}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-border hidden md:block" />

            {/* Field Filter */}
            <div className="flex items-center gap-2">
              {(['all', 'CS', 'SE'] as const).map((field) => (
                <Button
                  key={field}
                  variant={fieldFilter === field ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFieldFilter(field)}
                  className={fieldFilter === field ? '' : 'bg-transparent'}
                >
                  {field === 'all' ? 'All Fields' : field}
                </Button>
              ))}
            </div>

            <div className="h-6 w-px bg-border hidden md:block" />

            {/* Program Filter */}
            <div className="flex items-center gap-2">
              {(['all', 'morning', 'evening'] as const).map((program) => (
                <Button
                  key={program}
                  variant={programFilter === program ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setProgramFilter(program)}
                  className={programFilter === program ? '' : 'bg-transparent'}
                >
                  {program === 'all' ? 'All Programs' : program.charAt(0).toUpperCase() + program.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res, index) => {
                const Icon = typeIcons[res.type as keyof typeof typeIcons];
                const colorClass = typeColors[res.type as keyof typeof typeColors];

                return (
                  <div
                    key={res.id}
                    className="card-academic card-hover animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                        {res.program && (
                          <span className={`badge-program ${res.program === 'morning' ? 'badge-morning' : 'badge-evening'}`}>
                            {res.program.charAt(0).toUpperCase() + res.program.slice(1)}
                          </span>
                        )}
                        {res.field && (
                          <span className={`badge-program ${res.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                            {res.field}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-3 ${colorClass}`}>
                      {typeLabels[res.type as keyof typeof typeLabels]}
                    </span>

                    <h3 className="font-serif font-semibold text-lg text-foreground mb-2">{res.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{res.subject}</p>

                    <Button variant="outline" className="w-full group">
                      <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Download
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}