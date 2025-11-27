import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, GraduationCap } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const { experience, education } = usePortfolioData();

  return (
    <section id="experience" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {t('experience.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {t('experience.workExperience')}
            </h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index !== experience.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-20 bg-primary-200 dark:bg-primary-800"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 card p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {exp.title}
                        </h4>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                        {exp.company}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {t('experience.education')}
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {edu.degree}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {edu.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Additional Education Info */}
              <div className="card p-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {t('experience.continuousEducation')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('experience.continuousDesc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                    Coursera
                  </span>
                  <span className="px-3 py-1 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                    Udemy
                  </span>
                  <span className="px-3 py-1 bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                    AWS Training
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;