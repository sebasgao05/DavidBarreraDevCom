import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink, Eye, Star } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../contexts/ThemeContext';
import LazyImage from './LazyImage';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { projects } = usePortfolioData();
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const { ref, isVisible } = useScrollAnimation();

  const filteredProjects = filter === 'featured' 
    ? projects.filter(project => project.featured)
    : projects;

  return (
    <section ref={ref} id="projects" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <div className={`text-center mb-16 reveal ${isVisible ? 'active' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-8"></div>
          
          {/* Filter buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600'
              }`}
            >
              {t('projects.allProjects')}
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === 'featured'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600'
              }`}
            >
              <Star className="w-4 h-4" />
              {t('projects.featured')}
            </button>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container`}>
          {filteredProjects.map((project, index) => (
            <div key={index} className={`card overflow-hidden group reveal-stagger ${isVisible ? 'active' : ''} ${isDark ? 'project-card-dark' : 'project-card-light'}`}>
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <LazyImage
                  src={project.image}
                  alt={`Captura de pantalla del proyecto ${project.title} - ${project.description}`}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  width={400}
                  height={200}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/400x200/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label="View code"
                    >
                      <Github className="w-5 h-5 text-gray-900" />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label="View demo"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-900" />
                    </a>
                  </div>
                </div>

                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {t('projects.featured')}
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('projects.technologies')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary text-center text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    {t('projects.viewCode')}
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {t('projects.viewDemo')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-16">
          <div className={`card p-8 max-w-2xl mx-auto ${isDark ? 'modern-card-dark' : 'modern-card-light'}`}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('projects.moreProjects')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('projects.moreProjectsDesc')}
            </p>
            <a
              href="https://github.com/sebasgao05"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              {t('projects.viewGithub')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;