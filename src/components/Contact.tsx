import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { personalInfo } = usePortfolioData();

  const contactMethods = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      icon: Linkedin,
      label: t('contact.linkedin'),
      value: 'LinkedIn Profile',
      href: personalInfo.linkedin,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Github,
      label: t('contact.github'),
      value: 'GitHub Profile',
      href: personalInfo.github,
      color: 'text-gray-900 dark:text-gray-100'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {t('contact.contactInfo')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t('contact.description')}
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={method.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors duration-200 group"
                  >
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-dark-700 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {method.label}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {method.label === t('contact.linkedin') ? t('contact.linkedinProfile') : 
                         method.label === t('contact.github') ? t('contact.githubProfile') : 
                         method.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="card p-6 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {t('contact.availability')}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t('contact.availabilityDesc')}
              </p>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{t('contact.availableStatus')}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('contact.form.title')}
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const subject = formData.get('subject') || 'Contacto desde portafolio';
              const body = `Nombre: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMensaje:\n${formData.get('message')}`;
              window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body)}`;
            }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder={t('contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors duration-200 resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                {t('contact.form.send')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('contact.form.directContact')}{' '}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  {personalInfo.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;