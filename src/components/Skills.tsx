import React from 'react';
import { useTranslation } from 'react-i18next';
import { Code, Server, Database, Cloud, Wrench } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../contexts/ThemeContext';

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { skills } = usePortfolioData();
  const { ref, isVisible } = useScrollAnimation();

  const skillCategories = [
    { key: 'frontend', icon: Code, data: skills.frontend },
    { key: 'backend', icon: Server, data: skills.backend },
    { key: 'database', icon: Database, data: skills.database },
    { key: 'cloud', icon: Cloud, data: skills.cloud },
    { key: 'tools', icon: Wrench, data: skills.tools }
  ];

  const SkillBar: React.FC<{ name: string; level: number }> = ({ name, level }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{name}</span>
        <span className="text-sm text-primary-600 dark:text-primary-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary-600 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
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
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container`}>
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={category.key} className={`card p-6 hover:shadow-xl transition-all duration-300 reveal-stagger ${isVisible ? 'active' : ''} ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {t(`skills.${category.key}`)}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.data.map((skill, skillIndex) => (
                    <SkillBar
                      key={skillIndex}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

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