import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useFocusManagement } from '../hooks/useFocusManagement';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (section: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle, onNavigate }) => {
  const { t } = useTranslation();
  const containerRef = useFocusManagement(isOpen, { 
    trapFocus: true, 
    restoreFocus: true 
  });

  const menuItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'projects', label: t('nav.projects'), icon: Briefcase },
    { id: 'contact', label: t('nav.contact'), icon: Mail }
  ];

  const handleItemClick = (section: string) => {
    onNavigate(section);
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onToggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden relative z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isOpen ? t('menu.close') : t('menu.open')}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
            }`}
          />
          <X 
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
            }`}
          />
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <nav
        ref={containerRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onKeyDown={handleKeyDown}
        role="navigation"
        aria-label={t('menu.navigation')}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('menu.navigation')}
            </h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('menu.close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-6">
            <ul className="space-y-2 px-4" role="list">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} role="listitem">
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors font-medium">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              David Barrera © 2024
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;