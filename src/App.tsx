import React, { Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import DeferredContent from './components/DeferredContent';

const SEOHead = React.lazy(() => import('./components/SEOHead'));
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Experience = React.lazy(() => import('./components/Experience'));
const Projects = React.lazy(() => import('./components/Projects'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const KonamiCode = React.lazy(() => import('./components/KonamiCode'));

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    (window as any).secret = () => {
      const message = document.createElement('div');
      message.innerHTML = 'Escribe "konami" en cualquier parte de la pagina';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #3b82f6;
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 18px;
        z-index: 9999;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 3000);
    };
  }, { once: true });
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <DeferredContent>
            <Suspense fallback={null}>
              <SEOHead />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
              <KonamiCode />
            </Suspense>
          </DeferredContent>
        </main>
        <DeferredContent>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </DeferredContent>
      </div>
    </ThemeProvider>
  );
}

export default App;
