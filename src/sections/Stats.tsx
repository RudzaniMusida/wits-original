import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 25, prefix: '< ', suffix: '%', label: 'Target abandonment rate' },
  { value: 2, prefix: '', suffix: ' min', label: 'Average booking time' },
  { value: 50, prefix: '', suffix: '+', label: 'Peer tutors available' },
  { value: 3, prefix: '', suffix: '', label: 'Services unified' },
];

function AnimatedCounter({
  stat,
  triggered,
}: {
  stat: Stat;
  triggered: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!triggered) return;

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: stat.value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(Math.round(countRef.current.value));
        },
      });
    });

    return () => ctx.revert();
  }, [triggered, stat.value]);

  return (
    <span>
      {stat.prefix}
      {displayValue}
      {stat.suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => setTriggered(true),
      });

      // Fade in the stat items
      const items = sectionRef.current?.querySelectorAll('.stat-item');
      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="stats"
      ref={sectionRef}
      className="py-20 md:py-24 bg-navy-dark"
    >
      <div className="content-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="font-serif text-[40px] md:text-[56px] font-light text-white leading-tight">
                <AnimatedCounter stat={stat} triggered={triggered} />
              </div>
              <p className="font-sans text-sm uppercase tracking-[0.06em] text-white/60 mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
