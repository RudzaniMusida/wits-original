import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Calendar, Video, Clock, MessageCircle, Star, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { text: 'Find a tutor by subject and see their live availability', icon: Check },
  { text: 'Book any session in under two minutes', icon: Check },
  { text: 'Cancel or reschedule without the guilt trip', icon: Check },
  { text: 'Get WhatsApp reminders one hour before', icon: Check },
  { text: 'Join virtual consultations from anywhere', icon: Check },
  { text: 'Rate your session and help others find great tutors', icon: Check },
];

export default function ComingSoon() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Stagger feature items
      const featureItems = leftRef.current?.querySelectorAll('.feature-item');
      if (featureItems) {
        gsap.from(featureItems, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
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
      id="coming-soon"
      ref={sectionRef}
      className="section-padding bg-cream"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div ref={leftRef}>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-text-muted mb-4">
              Coming Next Semester
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.2] tracking-[-0.01em] text-navy">
              A booking experience built around how students actually work.
            </h2>
            <p className="font-sans text-base text-charcoal/80 font-light leading-[1.8] mt-5">
              The new Wits Assist platform launches next semester. Here&apos;s
              what you can expect:
            </p>

            {/* Feature List */}
            <div className="mt-8 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="feature-item flex items-center gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-success" strokeWidth={2.5} />
                    </div>
                    <span className="font-sans text-[15px] text-charcoal font-light">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Booking Mockup Card */}
          <div ref={rightRef} className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-xl shadow-elevated p-6 md:p-8 w-full max-w-[380px] animate-float">
              {/* Confirmation Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-navy">
                    Booking Confirmed
                  </h4>
                  <p className="font-sans text-xs text-text-muted">
                    Ref: WA-2847
                  </p>
                </div>
              </div>

              {/* Session Card */}
              <div className="bg-cream rounded-lg p-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-navy" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-navy">
                      Statistics Tutoring
                    </p>
                    <p className="font-sans text-xs text-text-muted mt-0.5">
                      With Thabo M. — Peer Tutor
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
                    <span className="font-sans text-xs text-charcoal">
                      Wednesday, 14 May 2026
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
                    <span className="font-sans text-xs text-charcoal">
                      14:00 — 15:00 (1 hour)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-text-muted" strokeWidth={1.5} />
                    <span className="font-sans text-xs text-charcoal">
                      Google Meet (virtual)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button className="flex-1 py-2.5 px-4 border border-navy text-navy font-sans text-xs font-medium rounded-lg hover:bg-navy hover:text-white transition-colors">
                  Add to Calendar
                </button>
                <button className="flex-1 py-2.5 px-4 bg-amber text-white font-sans text-xs font-medium rounded-lg hover:bg-amber/90 transition-colors">
                  Join Session
                </button>
              </div>

              {/* Reminder Note */}
              <div className="flex items-start gap-2 bg-amber/5 rounded-lg p-3">
                <MessageCircle className="w-3.5 h-3.5 text-amber mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <p className="font-sans text-xs text-charcoal/70 font-light">
                  You&apos;ll receive a WhatsApp reminder 1 hour before your
                  session.
                </p>
              </div>

              {/* Reschedule */}
              <button className="flex items-center gap-2 mx-auto mt-4 text-text-muted hover:text-navy transition-colors">
                <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="font-sans text-xs">Reschedule</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
