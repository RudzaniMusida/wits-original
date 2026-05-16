import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, Search, CalendarCheck, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '1',
    icon: MousePointer2,
    title: 'Choose your service',
    description: 'Select Writing, Tutoring, or Advising — all in one place.',
  },
  {
    number: '2',
    icon: Search,
    title: 'Find your match',
    description: 'Filter by subject, availability, or mode — in-person or virtual.',
  },
  {
    number: '3',
    icon: CalendarCheck,
    title: 'Book in two minutes',
    description: 'Pick a slot. Receive instant confirmation. No emails, no spreadsheets.',
  },
  {
    number: '4',
    icon: GraduationCap,
    title: 'Get support',
    description: 'Attend your session. Get a follow-up summary. Reschedule anytime.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      const stepEls = stepsRef.current?.querySelectorAll('.step-item');
      const lineEls = stepsRef.current?.querySelectorAll('.step-line');

      if (stepEls) {
        gsap.from(stepEls, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      if (lineEls) {
        gsap.from(lineEls, {
          scaleX: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-text-muted mb-4">
            How It Works
          </p>
          <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.2] tracking-[-0.01em] text-navy">
            From panic to progress in four steps
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="step-item relative">
                {/* Connecting line (desktop only) */}
                {!isLast && (
                  <div
                    className="step-line hidden lg:block absolute top-6 left-[calc(50%+28px)] w-[calc(100%-56px)] h-px border-t border-dashed border-[#EBE7DF] origin-left"
                  />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center mb-5">
                    <span className="font-serif text-xl text-white font-normal">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-navy" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/70 font-light leading-[1.7] max-w-[240px]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
