import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'wash@wits.ac.za',
    href: 'mailto:wash@wits.ac.za',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+27 11 717 1234',
    href: 'tel:+27117171234',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '1st Floor, Solomon Mahlangu House',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Monday–Thursday, 9am–4pm',
    href: '#',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    studentNumber: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', studentNumber: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftRef}>
            <p className="font-sans text-sm uppercase tracking-[0.08em] text-text-muted mb-4">
              Get In Touch
            </p>
            <h2 className="font-serif text-[32px] md:text-[40px] font-light leading-[1.2] tracking-[-0.01em] text-navy">
              We&apos;re here to help
            </h2>
            <p className="font-sans text-base text-charcoal/80 font-light leading-[1.8] mt-5">
              Have questions about the new platform? Want to become a peer
              tutor? Reach out to the Wits Assist team.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              {contactDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={index}
                    href={detail.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-amber/20">
                      <Icon className="w-5 h-5 text-amber" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.06em] text-text-muted">
                        {detail.label}
                      </p>
                      <p className="font-sans text-base text-navy mt-0.5 transition-colors group-hover:text-amber">
                        {detail.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={rightRef}>
            <div className="bg-white border border-[#EBE7DF] rounded-xl p-6 md:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl text-navy mb-2">
                    Message sent!
                  </h3>
                  <p className="font-sans text-sm text-text-muted font-light">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-sans text-sm text-charcoal mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-lg font-sans text-sm text-charcoal placeholder:text-text-muted/60 focus:outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/15 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="studentNumber"
                      className="block font-sans text-sm text-charcoal mb-1.5"
                    >
                      Student Number
                    </label>
                    <input
                      type="text"
                      id="studentNumber"
                      value={formData.studentNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          studentNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-lg font-sans text-sm text-charcoal placeholder:text-text-muted/60 focus:outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/15 transition-all"
                      placeholder="e.g. 12345678"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-sans text-sm text-charcoal mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-lg font-sans text-sm text-charcoal placeholder:text-text-muted/60 focus:outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/15 transition-all"
                      placeholder="you@students.wits.ac.za"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-sans text-sm text-charcoal mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border border-[#EBE7DF] rounded-lg font-sans text-sm text-charcoal placeholder:text-text-muted/60 focus:outline-none focus:border-amber focus:ring-[3px] focus:ring-amber/15 transition-all resize-y min-h-[120px]"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>

                  <p className="font-sans text-xs text-text-muted text-center mt-4">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
