import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Server, Database, Cloud, Wrench, BarChart3, Infinity as InfinityIcon, Zap } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../contexts/ThemeContext';
import { skillsOrbits } from '../data/portfolioData';
import SkillsOrbit from './SkillsOrbit';

const Skills: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const { skills } = usePortfolioData();
  const { ref, isVisible } = useScrollAnimation();
  const [viewMode, setViewMode] = useState<'orbit' | 'bars'>('orbit');
  const currentLang = i18n.language as 'es' | 'en';

  const skillCategories = [
    { key: 'frontend', icon: Code, data: skills.frontend },
    { key: 'backend', icon: Server, data: skills.backend },
    { key: 'database', icon: Database, data: skills.database },
    { key: 'cloud', icon: Cloud, data: skills.cloud },
    { key: 'devops', icon: InfinityIcon, data: skills.devops },
    { key: 'tools', icon: Wrench, data: skills.tools },
    { key: 'integracion', icon: Zap, data: skills.integracion }
  ];

  const SkillBar: React.FC<{ name: string; level: number; color: string }> = ({ name, level, color }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-sm" style={{ color }}>{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${level}%`,
            background: `linear-gradient(to right, ${color}, ${color}90)`
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <section ref={ref} id="skills" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <div className={`text-center mb-16 reveal ${isVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {t('skills.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-6"></div>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center mb-8">
            <div className={`flex rounded-lg p-1 ${isDark ? 'bg-dark-700' : 'bg-white'} shadow-md`}>
              <button
                onClick={() => setViewMode('orbit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'orbit'
                    ? 'bg-primary-600 text-white shadow-md'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-dark-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Cloud className="w-4 h-4" />
                Vista Órbitas
              </button>
              <button
                onClick={() => setViewMode('bars')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  viewMode === 'bars'
                    ? 'bg-primary-600 text-white shadow-md'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-dark-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Vista Barras
              </button>
            </div>
          </div>
        </div>

        {/* Orbit View */}
        {viewMode === 'orbit' && (
          <div className={`reveal ${isVisible ? 'active' : ''}`}>
            <SkillsOrbit />
          </div>
        )}

        {/* Bars View */}
        {viewMode === 'bars' && (
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-container`}>
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              const orbitData = skillsOrbits[category.key as keyof typeof skillsOrbits];
              return (
                <div key={category.key} className={`card p-6 hover:shadow-xl transition-all duration-300 reveal-stagger ${isVisible ? 'active' : ''} ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${orbitData.color}20` }}>
                      <IconComponent className="w-6 h-6" style={{ color: orbitData.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {orbitData.name[currentLang]}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.data.map((skill, skillIndex) => (
                      <SkillBar
                        key={skillIndex}
                        name={skill.name}
                        level={skill.level}
                        color={orbitData.color}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {skills.frontend.length + skills.backend.length}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Tecnologías</p>
            </div>
            <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                1+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Años Experiencia</p>
            </div>
            <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                10+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Proyectos</p>
            </div>
            <div className={`card p-6 ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                100%
              </div>
              <p className="text-gray-600 dark:text-gray-400">Dedicación</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;