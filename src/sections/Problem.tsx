import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: 'I emailed the Writing Centre twice. Never heard back.',
    attribution: 'Third-year Law student',
  },
  {
    text: 'You have to book two weeks in advance. Then your tutor calls in sick.',
    attribution: 'First-year Engineering student',
  },
  {
    text: "There's no central place to see who tutors what. I can't find anyone's email.",
    attribution: 'Second-year Commerce student',
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slides in from left
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Quotes stagger in from right
      const quoteEls = quotesRef.current?.querySelectorAll('.quote-card');
      if (quoteEls) {
        gsap.from(quoteEls, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-text-muted mb-4">
              The Problem
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.2] tracking-[-0.01em] text-navy">
              <span className="text-amber text-[42px] md:text-[52px]">62%</span>{' '}
              of students who tried to get help, gave up.
            </h2>
            <p className="font-sans text-base text-charcoal/80 font-light leading-[1.8] mt-6">
              In a 2024 SRC survey, only 38% of students successfully received
              support from WASH. The rest encountered broken booking systems,
              no-show tutors, and communication black holes.
            </p>
          </div>

          {/* Right Column - Quotes */}
          <div ref={quotesRef} className="pt-2">
            {quotes.map((quote, index) => (
              <div key={index} className="quote-card">
                <p className="quote-text">&ldquo;{quote.text}&rdquo;</p>
                <p className="quote-attribution">— {quote.attribution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
