import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(overlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
        .to(
          headlineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          sublineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .to(
          chevronRef.current,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.1'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('problem');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center bg-cream overflow-hidden"
      style={{ borderTop: '1px solid #EBE7DF' }}
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.08]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[720px] mx-auto px-6 text-center pt-[72px]">
        <p
          ref={overlineRef}
          className="font-sans text-sm uppercase tracking-[0.08em] text-charcoal mb-6 opacity-0 translate-y-5"
        >
          Wits Academic Support Hub
        </p>

        <h1
          ref={headlineRef}
          className="font-serif text-[40px] md:text-[52px] lg:text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-navy opacity-0 translate-y-5"
        >
          A{' '}
          <span className="text-amber">unified</span>{' '}
          place for writing, tutoring, and academic guidance.
        </h1>

        <p
          ref={sublineRef}
          className="font-sans text-lg text-charcoal/80 font-light leading-[1.8] mt-6 max-w-[560px] mx-auto opacity-0 translate-y-5"
        >
          Book support in under two minutes. Get reminders. Attend in-person or
          online. All free for registered Wits students.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0 translate-y-5"
        >
          <button onClick={handleBookClick} className="btn-primary">
            Book a Session
          </button>
          <button onClick={handleScrollDown} className="btn-secondary">
            See How It Works
          </button>
        </div>

        <div
          ref={chevronRef}
          className="mt-16 opacity-0 cursor-pointer"
          onClick={handleScrollDown}
        >
          <ChevronDown className="w-5 h-5 text-text-muted mx-auto animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}
