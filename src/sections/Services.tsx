import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PenLine, Users, Compass, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: PenLine,
    title: 'Writing Centre',
    description:
      'Get help with essays, reports, dissertations, and referencing. Book a one-on-one consultation with a writing consultant for tomorrow, not two weeks from now.',
    link: 'Book writing help',
    image: import.meta.env.BASE_URL + 'assets/writing-desk.jpg',
  },
  {
    icon: Users,
    title: 'Peer Tutoring',
    description:
      'Find a tutor for your specific course — Maths, Stats, Accounting, Physics, Law, and more. See their availability, ratings, and book instantly.',
    link: 'Find a tutor',
    image: import.meta.env.BASE_URL + 'assets/tutor-session.jpg',
  },
  {
    icon: Compass,
    title: 'Academic Advising',
    description:
      'Get guidance on course registration, degree planning, and academic probation support. Walk in or book a virtual appointment that fits your schedule.',
    link: 'Speak to an advisor',
    image: import.meta.env.BASE_URL + 'assets/advisor-meeting.jpg',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-cream"
    >
      <div className="content-container">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-[600px] mx-auto mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.08em] text-text-muted mb-4">
            The Solution
          </p>
          <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.2] tracking-[-0.01em] text-navy">
            Three services. One platform. Zero friction.
          </h2>
          <p className="font-sans text-base text-charcoal/80 font-light leading-[1.8] mt-5">
            Wits Assist centralises Writing Centre consultations, Peer Tutoring
            sessions, and Academic Advising into a single, mobile-friendly
            booking system.
          </p>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group bg-white rounded-xl p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover hover:border hover:border-amber/20"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-amber" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-2xl text-navy mb-3">
                  {service.title}
                </h3>
                <p className="font-sans text-[15px] text-charcoal/70 font-light leading-[1.7] mb-5">
                  {service.description}
                </p>

                {/* Link */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) {
                      const top =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        80;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 text-navy font-medium text-sm group/link"
                >
                  <span className="relative">
                    {service.link}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber transition-all duration-250 group-hover/link:w-full" />
                  </span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
