import { useState, useEffect } from 'react';
import { Menu, X, Diamond } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Determine active section
      const sections = ['home', 'problem', 'services', 'how-it-works', 'stats', 'coming-soon', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/92 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
          : 'bg-cream/92 backdrop-blur-xl'
      }`}
      style={{ borderBottom: '1px solid #EBE7DF' }}
    >
      <nav className="content-container flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group"
        >
          <Diamond className="w-5 h-5 text-navy transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.5} />
          <span className="font-sans font-medium text-base text-navy tracking-[0.01em]">
            Wits Assist
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link-underline font-sans text-sm text-navy transition-all duration-200 ${
                activeSection === link.href.replace('#', '') ? 'font-medium active' : 'font-normal'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5"
          >
            Book a Session
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-navy hover:bg-navy/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-xl border-t border-[#EBE7DF]">
          <div className="content-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-3 px-4 rounded-lg text-navy font-sans text-sm transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-amber/10 font-medium'
                    : 'hover:bg-navy/5'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-primary mt-2 text-center"
            >
              Book a Session
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
