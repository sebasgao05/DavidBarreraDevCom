type EnvKey = string;

const readEnv = (key: EnvKey, fallback: string) => {
  const value = process.env[key];
  return value && value.trim() !== '' ? value : fallback;
};

const SITE_URL = readEnv('REACT_APP_SITE_URL', 'https://david-barrera.com');

const toAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalized = value.startsWith('/') ? value : `/${value}`;
  return `${SITE_URL}${normalized}`;
};

export const env = {
  siteUrl: SITE_URL,
  personal: {
    name: readEnv('REACT_APP_PERSON_NAME', 'David Barrera'),
    email: readEnv('REACT_APP_CONTACT_EMAIL', 'sebasgao05@icloud.com'),
    linkedin: readEnv('REACT_APP_LINKEDIN_URL', 'https://www.linkedin.com/in/sebasgao05/'),
    github: readEnv('REACT_APP_GITHUB_URL', 'https://github.com/sebasgao05'),
    location: readEnv('REACT_APP_LOCATION', 'Bogota, CO'),
    profileImage: readEnv('REACT_APP_PROFILE_IMAGE', '/images/profile/profile-david.jpg'),
    ogImage: toAbsoluteUrl(readEnv('REACT_APP_OG_IMAGE', '/og-image.jpg')),
    cv: {
      es: readEnv('REACT_APP_CV_ES_URL', '/DavidBarrera-BogotaES.pdf'),
      en: readEnv('REACT_APP_CV_EN_URL', '/DavidBarrera-BogotaEN.pdf')
    }
  },
  toAbsoluteUrl
};
