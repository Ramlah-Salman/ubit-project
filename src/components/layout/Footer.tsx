import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#1A2F23] text-emerald-50 mt-auto border-t border-emerald-900/20">
      <div className="container mx-auto px-6 py-10"> {/* Reduced vertical padding */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                <span className="text-white font-serif font-bold text-2xl">U</span> {/* Increased font */}
              </div>
              <div>
                <h3 className="font-serif font-bold text-2xl tracking-tight text-white">UBIT</h3>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400/80">
                  CS & Software Engineering
                </p>
              </div>
            </div>
            <p className="text-base text-emerald-100/70 leading-relaxed max-w-md font-medium"> {/* Increased from text-sm */}
              The Department of Computer Science & Software Engineering at University of Karachi 
              is committed to excellence in education and research in computing sciences.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-5">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/programs" className="text-base text-emerald-100/60 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-base text-emerald-100/60 hover:text-white transition-colors">
                  Bulletins
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-base text-emerald-100/60 hover:text-white transition-colors">
                  Repository
                </Link>
              </li>
              <li>
                <a 
                  href="https://uok.edu.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base text-emerald-100/60 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  University of Karachi
                  <ExternalLink className="w-4 h-4 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-5">Reach Out</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base text-emerald-100/60">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-emerald-500" />
                <span className="leading-snug">Main University Road, Karachi 75270</span>
              </li>
              <li className="flex items-center gap-3 text-base text-emerald-100/60">
                <Phone className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span>+92-21-9926-1300</span>
              </li>
              <li className="flex items-center gap-3 text-base text-emerald-100/60">
                <Mail className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                <span className="font-medium">ubit@uok.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-100/30">
            © {new Date().getFullYear()} UBIT Department. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100/20">Privacy Policy</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100/20">Academic Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}