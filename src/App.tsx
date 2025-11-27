import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import KonamiCode from './components/KonamiCode';

// Easter egg function
if (typeof window !== 'undefined') {
  (window as any).secret = () => {
    const message = document.createElement('div');
    message.innerHTML = 'Escribe "konami" en cualquier parte de la página';
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
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SEOHead />
        <KonamiCode />
        <div className="min-h-screen bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;