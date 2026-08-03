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
  title = 'David Barrera | Ingeniero de Software & AWS Cloud Developer',
  description = 'David Barrera — Ingeniero de Software en Bogota. Desarrollo backend, full stack y cloud en AWS. AWS Certified Cloud Practitioner.',
  keywords = 'David Sebastian Barrera Gaona, David Barrera, Software Engineer, Ingeniero de Software Colombia, AWS Cloud Developer, Java, Python, TypeScript, React, Spring Boot, GraphQL, AWS, Blend360, cloud computing, AWS Certified Cloud Practitioner, full stack developer',
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
    name: 'David Sebastian Barrera Gaona',
    alternateName: 'David Barrera',
    jobTitle: 'Software Engineer & AWS Cloud Developer',
    description,
    url: env.siteUrl,
    image: {
      '@type': 'ImageObject',
      url: resolvedProfileImage,
      contentUrl: resolvedProfileImage,
      width: 800,
      height: 800,
      caption: 'David Barrera - Software Engineer & AWS Cloud Developer'
    },
    sameAs: [...sameAsLinks, 'https://www.credly.com/users/david-sebastian-barrera-gaona'],
    knowsAbout: [
      { '@type': 'Thing', name: 'Java' },
      { '@type': 'Thing', name: 'Python' },
      { '@type': 'Thing', name: 'AWS' },
      { '@type': 'Thing', name: 'TypeScript' },
      { '@type': 'Thing', name: 'React' },
      { '@type': 'Thing', name: 'Spring Boot' },
      { '@type': 'Thing', name: 'GraphQL' }
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Certified Cloud Practitioner',
        credentialCategory: 'Professional Certification',
        recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' },
        validFrom: '2026-07',
        validUntil: '2029-07',
        url: 'https://www.credly.com/badges/bbb6141d-8b49-498b-9b79-92b1ae847608/public_url'
      }
    ],
    alumniOf: { '@type': 'EducationalOrganization', name: 'Universidad EAN' },
    email: personalInfo.email,
    address: { '@type': 'PostalAddress', addressCountry: 'CO', addressLocality: 'Bogotá' },
    worksFor: { '@type': 'Organization', name: 'Blend360', url: 'https://www.blend360.com/' }
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
      <meta property='og:image:alt' content={`${personalInfo.name} - Ingeniero de Software & AWS Cloud Developer`} />
      <meta property='og:url' content={canonicalUrl} />
      <meta property='og:locale' content={i18n.language === 'es' ? 'es_ES' : 'en_US'} />
      <meta property='og:site_name' content='David Barrera - Software Engineer Portfolio' />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={sectionMeta.title} />
      <meta name='twitter:description' content={sectionMeta.description} />
      <meta name='twitter:image' content={resolvedImage} />
      <meta name='twitter:image:alt' content={`${personalInfo.name} - Ingeniero de Software & AWS Cloud Developer`} />

      {/* Additional SEO */}
      <meta name='robots' content='index, follow, max-image-preview:large' />
      <meta name='author' content='David Sebastian Barrera Gaona' />
      <meta name='theme-color' content='#3b82f6' />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEOHead;
