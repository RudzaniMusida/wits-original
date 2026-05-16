import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import Stats from './sections/Stats';
import ComingSoon from './sections/ComingSoon';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-cream">
      <Navigation />
      <main>
        <Hero />
        <Problem />
        <Services />
        <HowItWorks />
        <Stats />
        <ComingSoon />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
