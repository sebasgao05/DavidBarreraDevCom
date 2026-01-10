import { useTranslation } from 'react-i18next';
import { portfolioData, personalInfo, skills, skillsOrbits, certifications, currentlyLearning } from '../data/portfolioData';
import { env } from '../config/env';

export const usePortfolioData = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'es' | 'en';
  
  return {
    personalInfo: {
      ...personalInfo,
      role: portfolioData[currentLang].personalInfo.role,
      cvUrl: currentLang === 'es' ? env.personal.cv.es : env.personal.cv.en
    },
    experience: portfolioData[currentLang].experience,
    projects: portfolioData[currentLang].projects,
    education: portfolioData[currentLang].education,
    languages: portfolioData[currentLang].languages,
    skills,
    skillsOrbits,
    certifications,
    currentlyLearning
  };
};
