import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white py-12 px-4 md:px-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gradient mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-gray-400">
              {t('footer.role')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  className="p-3 bg-gray-800 dark:bg-dark-800 rounded-full hover:bg-primary-600 dark:hover:bg-primary-600 transition-all duration-200 transform hover:scale-110"
                  aria-label={link.label}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end gap-2">
              © {currentYear} {t('footer.madeWith')}{' '}
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              {t('footer.by')} {personalInfo.name}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.builtWith')}
            </p>
            <p className="text-gray-400 text-sm">
              {t('footer.deployedOn')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;