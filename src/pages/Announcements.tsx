import { useState } from 'react';
import { Bell, Filter, Calendar, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

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
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
              <Bell className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h1 className="section-title mb-1">Announcements</h1>
              <p className="text-muted-foreground">Stay updated with the latest department news</p>
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
              Filter by:
            </div>

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

            <div className="h-6 w-px bg-border hidden sm:block" />

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

      {/* Announcements List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredAnnouncements.map((ann, index) => (
                <div
                  key={ann.id}
                  className="card-academic card-hover animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <h3 className="font-serif font-semibold text-xl text-foreground">{ann.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                      <Calendar className="w-4 h-4" />
                      {ann.date}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{ann.content}</p>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                    {ann.program && (
                      <span className={`badge-program ${ann.program === 'morning' ? 'badge-morning' : 'badge-evening'}`}>
                        {ann.program.charAt(0).toUpperCase() + ann.program.slice(1)} Program
                      </span>
                    )}
                    {ann.field && (
                      <span className={`badge-program ${ann.field === 'CS' ? 'badge-cs' : 'badge-se'}`}>
                        {ann.field === 'CS' ? 'Computer Science' : 'Software Engineering'}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground ml-auto">
                      <User className="w-4 h-4" />
                      {ann.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-lg text-foreground mb-2">No announcements found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}