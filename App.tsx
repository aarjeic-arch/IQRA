import React from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CodeExample from './components/CodeExample';
import Testimonials from './components/Testimonials';
import Community from './components/Community';
import Footer from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const AnimatedSection: React.FC<{children: React.ReactNode, id: string}> = ({ children, id }) => {
  const { ref, controls } = useScrollAnimation();
  // This is a simplified stand-in for an animation library like Framer Motion.
  // In a real app, you'd use the `controls` to trigger animations.
  // For this example, we'll just use a CSS class approach based on visibility.
  return (
    <section ref={ref} id={id} className="py-16 md:py-24 px-6 container mx-auto">
      {children}
    </section>
  );
}


const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <div className="bg-[#0A101F] text-slate-300 overflow-x-hidden font-sans">
        <Header />
        <main>
          <Hero />
          <AnimatedSection id="features">
            <Features />
          </AnimatedSection>
          <AnimatedSection id="examples">
            <CodeExample />
          </AnimatedSection>
          <AnimatedSection id="testimonials">
            <Testimonials />
          </AnimatedSection>
          <AnimatedSection id="community">
            <Community />
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default App;
