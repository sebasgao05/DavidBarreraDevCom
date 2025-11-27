import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X, Languages } from 'lucide-react';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  const navItems = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'experience', href: '#experience' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 ${
      isScrolled ? 'nav-sticky' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-gradient">DB</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200 flex items-center gap-2"
              aria-label="Toggle language"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">
                {i18n.language === 'es' ? 'ES' : 'EN'}
              </span>
            </button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 shadow-lg">
            <nav className="py-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;