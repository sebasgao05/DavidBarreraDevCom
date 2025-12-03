import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Languages, Award } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../contexts/ThemeContext';

const About: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { languages, currentlyLearning, certifications } = usePortfolioData();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="about" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className={`text-center mb-16 reveal ${isVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className={`grid lg:grid-cols-2 gap-12 items-start stagger-container`}>
          {/* Main Description */}
          <div className={`space-y-6 reveal-stagger ${isVisible ? 'active' : ''}`}>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Currently Learning */}
              <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold">{t('about.currentlyLearning')}</h3>
                </div>
                <ul className="space-y-2">
                  {currentlyLearning.map((item, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Languages className="w-6 h-6 text-primary-600" />
                  <h3 className="text-lg font-semibold">{t('about.languages')}</h3>
                </div>
                <ul className="space-y-3">
                  {languages.map((lang, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className={`card p-8 reveal-stagger ${isVisible ? 'active' : ''} ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-semibold">Certificaciones</h3>
            </div>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex gap-4 items-start">
                  {cert.image && (
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="border-l-4 border-primary-600 pl-4 flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {cert.date}
                    </p>
                    <a
                      href={cert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                    >
                      Ver en Credly →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;