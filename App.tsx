import React from 'react';
import { LocalizationProvider } from './context/LocalizationContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import IqraIDE from './components/IqraIDE';
import Footer from './components/Footer';
import { useScrollAnimation } from './hooks/useScrollAnimation';

const ScrollFadeInSection: React.FC<{children: React.ReactNode, id: string}> = ({ children, id }) => {
  const { ref } = useScrollAnimation();
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
          <ScrollFadeInSection id="features">
            <Features />
          </ScrollFadeInSection>
          <ScrollFadeInSection id="ide">
            <IqraIDE />
          </ScrollFadeInSection>
        </main>
        <Footer />
      </div>
    </LocalizationProvider>
  );
};

export default App;