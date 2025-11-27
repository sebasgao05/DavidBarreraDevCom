import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Mail, ArrowDown } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import LazyImage from './LazyImage';

const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { personalInfo } = usePortfolioData();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, [i18n]);
  
  console.log('Current language:', currentLang);
  console.log('Available status translation:', t('contact.availableStatus'));

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-dark-900 dark:via-dark-800 dark:to-purple-900/20"
      aria-label="Sección principal - Presentación de David Barrera"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div key={`status-${currentLang}-${Date.now()}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span key={`text-${currentLang}`} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentLang === 'en' ? 'Available for new projects' : 'Disponible para nuevos proyectos'}
              </span>
            </div>
            <p className="text-primary-600 dark:text-primary-400 font-medium mb-4 text-lg">
              {t('hero.greeting')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient magnetic">{personalInfo.name}</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 font-medium typing-animation">
              {personalInfo.role}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              {t('hero.description')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={personalInfo.cvUrl}
                download
                className="btn-primary inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {t('hero.downloadCV')}
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {t('hero.contactMe')}
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative group">
              {/* Glassmorphism container */}
              <div className="relative w-80 h-80 rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-6 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400/30 to-purple-600/30 dark:from-blue-400/20 dark:to-purple-600/20 flex items-center justify-center overflow-hidden relative">
                  <LazyImage
                    src={personalInfo.profileImage}
                    alt={`Foto profesional de ${personalInfo.name}, Desarrollador Full Stack especializado en React y AWS`}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    width={320}
                    height={320}
                    loading="eager"
                    responsive={false}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&size=320&background=gradient&color=ffffff&bold=true`;
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
                </div>
                
                {/* Floating tech icons */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-200/50 dark:border-white/30 animate-float shadow-lg">
                  <span className="text-lg">⚛️</span>
                </div>
                <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-200/50 dark:border-white/30 animate-float shadow-lg" style={{ animationDelay: '1s' }}>
                  <span className="text-lg">☁️</span>
                </div>
                <div className="absolute top-1/4 -left-4 w-10 h-10 bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-gray-200/50 dark:border-white/30 animate-float shadow-lg" style={{ animationDelay: '2s' }}>
                  <span className="text-sm">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;