export const personalInfo = {
  name: 'David Barrera',
  role: 'Desarrollador de Aplicaciones & Estudiante de Ingeniería',
  email: 'sebasgao05@icloud.com', 
  linkedin: 'https://www.linkedin.com/in/sebasgao05/', 
  github: 'https://github.com/sebasgao05', 
  cvUrl: '/cv-david-barrera.pdf',
  profileImage: '/images/profile/profile-david.webp'
};

export const skills = {
  frontend: [
    { name: 'React', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Next.js', level: 70 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'JavaScript', level: 95 }
  ],
  backend: [
    { name: 'Java', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Express.js', level: 85 },
    { name: 'FastAPI', level: 70 }
  ],
  database: [
    { name: 'PostgreSQL', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'MySQL', level: 85 },
    { name: 'Redis', level: 70 }
  ],
  cloud: [
    { name: 'AWS', level: 75 },
    { name: 'Docker', level: 80 },
    { name: 'Kubernetes', level: 65 },
    { name: 'CI/CD', level: 80 }
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'VS Code', level: 95 },
    { name: 'Figma', level: 75 },
    { name: 'Postman', level: 85 }
  ]
};

export const experience = [
  {
    title: 'Desarrollador de Aplicaciones - Internado',
    company: 'IBM',
    period: '2025',
    description: 'Desarrollo de aplicaciones empresariales utilizando tecnologías modernas. Participación en proyectos de transformación digital y implementación de soluciones cloud.',
    technologies: ['Java', 'Spring Boot', 'React', 'IBM Cloud', 'Docker']
  },
  {
    title: 'Capitán - AWS Cloud Club',
    company: 'EAN University',
    period: '2025-1 - 2026-1',
    description: 'Liderazgo del club de cloud computing, organización de workshops y eventos técnicos. Mentoría a estudiantes en tecnologías AWS y arquitecturas cloud.',
    technologies: ['AWS', 'Cloud Architecture', 'Leadership', 'Teaching']
  }
];

export const projects = [
  {
    title: 'AWS Cloud + IOT',
    description: 'proyecto desarrollado un sensor de gas implementado en la nube, incluyendo arquitecturas serverless',
    image: '/images/projects/project-aws-iot.jpg',
    technologies: ['DynamoDB', 'EC2', 'SNS'],
    githubUrl: 'https://github.com/sebasgao05',
    demoUrl: 'https://54.242.72.108/',
    featured: true
  },
  {
    title: 'Portafolio Personal',
    description: 'Portafolio web desarrollado con React y TypeScript, desplegado en AWS con CI/CD automatizado.',
    image: '/images/projects/project-portfolio.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront'],
    githubUrl: 'https://github.com/sebasgao05/DavidBarreraDevCom',
    demoUrl: 'https://david-barrera.com/',
    featured: true
  },
  {
    title: 'Generador de Cv',
    description: 'Generador de Hojas de Vida en pdf, desplegado en AWS Amplify.',
    image: '/images/projects/Generador-CV.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AWS Amplify'],
    githubUrl: 'https://github.com/sebasgao05/GenerateCV',
    demoUrl: 'https://generar-cv.david-barrera.com/',
    featured: false
  },
  {
    title: '2048 Game - EAN Version',
    description: 'Implementación del popular juego 2048 con temática universitaria EAN. Desarrollado con JavaScript vanilla y diseño responsive.',
    image: '/images/projects/project-2048.jpg',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'AWS Amplify'],
    githubUrl: 'https://github.com/sebasgao05/2048-EAN',
    demoUrl: 'https://main.d2hjpea8ccpmhc.amplifyapp.com/',
    featured: false
  }
];

export const education = [
  {
    degree: 'Ingeniería de Sistemas',
    institution: 'Universidad EAN',
    period: '2021 - 2025',
    description: 'Formación integral en desarrollo de software, arquitectura de sistemas y tecnologías emergentes. Enfoque en cloud computing y desarrollo de aplicaciones empresariales.'
  }
];

export const certifications = [
  {
    name: 'AWS Educate',
    issuer: 'AWS',
    date: '2024-2025',
    credlyUrl: 'https://www.credly.com/users/david-sebastian-barrera-gaona'
  },
  {
    name: 'AWS Cloud Club Captain',
    issuer: 'AWS',
    date: '2025',
    credlyUrl: 'https://www.credly.com/badges/b1a76f4c-192a-4006-80cf-6f6f2df6a142/public_url'
  }
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Intermedio (B2)' }
];

export const currentlyLearning = [
  'Machine Learning',
  'GraphQL',
  'Microservices Architecture'
];
