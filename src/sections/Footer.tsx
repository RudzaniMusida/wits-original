import { Diamond } from 'lucide-react';

const serviceLinks = [
  'Writing Centre',
  'Peer Tutoring',
  'Academic Advising',
];

const platformLinks = [
  'How It Works',
  'For Tutors',
  'FAQs',
  'Accessibility',
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-dark pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="content-container">
        {/* Row 1: 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Diamond className="w-5 h-5 text-white" strokeWidth={1.5} />
              <span className="font-sans font-medium text-base text-white tracking-[0.01em]">
                Wits Assist
              </span>
            </div>
            <p className="font-sans text-sm text-white/60 font-light leading-[1.7] max-w-[260px]">
              The new way to access academic support at Wits University.
            </p>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white uppercase tracking-[0.06em] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('services');
                      if (el) {
                        const top = el.getBoundingClientRect().top + window.scrollY - 80;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                    className="font-sans text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white uppercase tracking-[0.06em] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => {
                      if (link === 'How It Works') {
                        e.preventDefault();
                        const el = document.getElementById('how-it-works');
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      }
                    }}
                    className="font-sans text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="font-sans text-sm font-medium text-white uppercase tracking-[0.06em] mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:wash@wits.ac.za"
                  className="font-sans text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                >
                  wash@wits.ac.za
                </a>
              </li>
              <li>
                <a
                  href="tel:+27117171234"
                  className="font-sans text-sm text-white/60 font-light hover:text-white transition-colors duration-200"
                >
                  +27 11 717 1234
                </a>
              </li>
              <li>
                <span className="font-sans text-sm text-white/60 font-light">
                  1st Floor, Solomon Mahlangu House
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2: Divider */}
        <div className="border-t border-white/10 my-10" />

        {/* Row 3: Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/40">
            © 2026 Wits University. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-sans text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-sans text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Use
            </a>
            <button
              onClick={scrollToTop}
              className="font-sans text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
