import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { env } from '../config/env';
import { personalInfo } from '../data/portfolioData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  section?: 'home' | 'about' | 'projects' | 'contact';
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'David Barrera | Data Engineer & Systems Engineer',
  description = 'Data Engineer en Blend360. Ingeniero de Sistemas graduado de la Universidad EAN. Especializado en AWS, Python y pipelines de datos.',
  keywords = 'data engineer, ingeniero de sistemas, python, sql, aws, spark, etl, pipelines de datos, blend360, cloud computing',
  image = env.personal.ogImage,
  url = env.siteUrl,
  section = 'home',
  structuredData
}) => {
  const { i18n } = useTranslation();
  const canonicalUrl = url || env.siteUrl;
  const resolvedImage = env.toAbsoluteUrl(image || env.personal.ogImage);
  const resolvedProfileImage = env.toAbsoluteUrl(env.personal.profileImage);
  const sameAsLinks = [personalInfo.linkedin, personalInfo.github].filter(Boolean);

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: 'Data Engineer & Systems Engineer',
    description,
    url: env.siteUrl,
    image: {
      '@type': 'ImageObject',
      url: resolvedProfileImage,
      contentUrl: resolvedProfileImage,
      width: 800,
      height: 800,
      caption: personalInfo.name
    },
    sameAs: sameAsLinks,
    knowsAbout: [
      { '@type': 'Thing', name: 'Python' },
      { '@type': 'Thing', name: 'SQL' },
      { '@type': 'Thing', name: 'AWS' },
      { '@type': 'Thing', name: 'Apache Spark' },
      { '@type': 'Thing', name: 'Data Pipelines' }
    ],
    alumniOf: { '@type': 'EducationalOrganization', name: 'Universidad EAN' },
    email: personalInfo.email,
    address: { '@type': 'PostalAddress', addressCountry: 'CO', addressLocality: env.personal.location },
    worksFor: { '@type': 'Organization', name: 'Blend360' }
  };

  const getSectionMeta = () => {
    switch (section) {
      case 'about':
        return {
          title: `Sobre Mi - ${title}`,
          description: 'Conoce mas sobre mi experiencia como Data Engineer y mi trayectoria profesional.',
          keywords: `${keywords}, sobre mi, experiencia, trayectoria profesional`
        };
      case 'projects':
        return {
          title: `Proyectos - ${title}`,
          description: 'Explora mis proyectos de desarrollo web, aplicaciones y soluciones tecnologicas.',
          keywords: `${keywords}, proyectos, portfolio, aplicaciones web`
        };
      case 'contact':
        return {
          title: `Contacto - ${title}`,
          description: 'Ponte en contacto conmigo para colaboraciones y oportunidades profesionales.',
          keywords: `${keywords}, contacto, colaboracion, trabajo`
        };
      default:
        return { title, description, keywords };
    }
  };

  const sectionMeta = getSectionMeta();

  return (
    <HelmetProvider>
      <Helmet>
      <title>{sectionMeta.title}</title>
      <meta name='description' content={sectionMeta.description} />
      <meta name='keywords' content={sectionMeta.keywords} />
      <link rel='canonical' href={canonicalUrl} />
      <html lang={i18n.language} />

      {/* Structured Data */}
      <script type='application/ld+json'>{JSON.stringify(structuredData || defaultStructuredData)}</script>

      {/* Hreflang */}
      <link rel='alternate' hrefLang='es' href={`${env.siteUrl}/?lang=es`} />
      <link rel='alternate' hrefLang='en' href={`${env.siteUrl}/?lang=en`} />
      <link rel='alternate' hrefLang='x-default' href={`${env.siteUrl}/`} />

      {/* Open Graph */}
      <meta property='og:type' content='profile' />
      <meta property='og:title' content={sectionMeta.title} />
      <meta property='og:description' content={sectionMeta.description} />
      <meta property='og:image' content={resolvedImage} />
      <meta property='og:image:secure_url' content={resolvedImage} />
      <meta property='og:image:type' content='image/jpeg' />
      <meta property='og:image:width' content='800' />
      <meta property='og:image:height' content='800' />
      <meta property='og:image:alt' content={`${personalInfo.name} - Data Engineer`} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:locale' content={i18n.language === 'es' ? 'es_ES' : 'en_US'} />
      <meta property='og:site_name' content='David Barrera Portfolio' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={sectionMeta.title} />
      <meta name='twitter:description' content={sectionMeta.description} />
      <meta name='twitter:image' content={resolvedImage} />
      <meta name='twitter:image:alt' content={`${personalInfo.name} - Data Engineer`} />

      {/* Additional SEO */}
      <meta name='robots' content='index, follow' />
      <meta name='author' content={personalInfo.name} />
      <meta name='theme-color' content='#3b82f6' />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEOHead;
