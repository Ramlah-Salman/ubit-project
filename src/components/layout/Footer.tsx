import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">U</span>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg">UBIT</h3>
                <p className="text-xs text-primary-foreground/70">Department of Computer Science & Software Engineering</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md">
              The Department of Computer Science & Software Engineering at University of Karachi 
              is committed to excellence in education and research in computing sciences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Announcements
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <a 
                  href="https://uok.edu.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors inline-flex items-center gap-1"
                >
                  University of Karachi
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>University of Karachi, Main University Road, Karachi 75270</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+92-21-9926-1300</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>ubit@uok.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} UBIT Department Portal. University of Karachi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}