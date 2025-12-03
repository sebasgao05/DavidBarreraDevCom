import { env } from '../config/env';

// Multi lingual portfolio data
export const portfolioData = {
  es: {
    personalInfo: {
      role: 'Desarrollador & Estudiante de Ingeniería'
    },
    experience: [
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
    ],
    projects: [
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
    ],
    education: [
      {
        degree: 'Ingeniería de Sistemas',
        institution: 'Universidad EAN',
        period: '2021 - 2025',
        description: 'Formación integral en desarrollo de software, arquitectura de sistemas y tecnologías emergentes. Enfoque en cloud computing y desarrollo de aplicaciones empresariales.'
      }
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio (B2)' }
    ]
  },
  en: {
    personalInfo: {
      role: 'Application Developer & Engineering Student'
    },
    experience: [
      {
        title: 'Application Developer - Internship',
        company: 'IBM',
        period: '2025',
        description: 'Development of enterprise applications using modern technologies. Participation in digital transformation projects and cloud solutions implementation.',
        technologies: ['Java', 'Spring Boot', 'React', 'IBM Cloud', 'Docker']
      },
      {
        title: 'Captain - AWS Cloud Club',
        company: 'EAN University',
        period: '2025-1 - 2026-1',
        description: 'Leadership of cloud computing club, organizing workshops and technical events. Mentoring students in AWS technologies and cloud architectures.',
        technologies: ['AWS', 'Cloud Architecture', 'Leadership', 'Teaching']
      }
    ],
    projects: [
      {
        title: 'AWS Cloud + IOT',
        description: 'Project developed a gas sensor implemented in the cloud, including serverless architectures',
        image: '/images/projects/project-aws-iot.jpg',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation'],
        githubUrl: 'https://github.com/sebasgao05',
        demoUrl: 'https://54.242.72.108/',
        featured: true
      },
            {
        title: 'Personal Portfolio',
        description: 'Web portfolio developed with React and TypeScript, deployed on AWS with automated CI/CD.',
        image: '/images/projects/project-portfolio.jpg',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AWS S3', 'CloudFront'],
        githubUrl: 'https://github.com/sebasgao05/DavidBarreraDevCom',
        demoUrl: 'https://david-barrera.com/',
        featured: true
      },
      {
        title: 'Generador de Cv',
        description: 'PDF resume generator, deployed on AWS Amplify.',
        image: '/images/projects/Generador-CV.jpg',
        technologies: ['HTML', 'CSS', 'JavaScript', 'AWS Amplify'],
        githubUrl: 'https://github.com/sebasgao05/GenerateCV',
        demoUrl: 'https://generar-cv.david-barrera.com/',
        featured: false
      },
      {
        title: '2048 Game - EAN Version',
        description: 'Implementation of the popular 2048 game with EAN university theme. Developed with vanilla JavaScript and responsive design.',
        image: '/images/projects/project-2048.jpg',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'AWS Amplify'],
        githubUrl: 'https://github.com/sebasgao05/2048-EAN',
        demoUrl: 'https://main.d2hjpea8ccpmhc.amplifyapp.com/',
        featured: false
      }
    ],
    education: [
      {
        degree: 'Systems Engineering',
        institution: 'EAN University',
        period: '2021 - 2025',
        description: 'Comprehensive training in software development, systems architecture and emerging technologies. Focus on cloud computing and enterprise application development.'
      }
    ],
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'Intermediate (B2)' }
    ]
  }
};

// Static data (language independent)
export const personalInfo = {
  name: env.personal.name,
  email: env.personal.email,
  linkedin: env.personal.linkedin,
  github: env.personal.github,
  cvUrl: env.personal.cv.es,
  profileImage: env.personal.profileImage
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

export const certifications = [
  {
    name: 'IBM Agile Explorer',
    issuer: 'IBM',
    date: '2025',
    credlyUrl: 'https://www.credly.com/badges/d42b6db1-a575-4d23-a173-b91e633d4024/public_url',
    image: 'https://images.credly.com/size/340x340/images/a972f054-be07-4845-85c7-95c8d11852f5/IBM-Agile-Explorer.png'
  },
  {
    name: 'AWS Educate',
    issuer: 'AWS',
    date: '2024-2025',
    credlyUrl: 'https://www.credly.com/users/david-sebastian-barrera-gaona',
    image: 'https://images.credly.com/size/340x340/images/e51a8579-188d-4363-8ed1-12ad164ef57b/blob'
  },
  {
    name: 'AWS Cloud Club Captain',
    issuer: 'AWS',
    date: '2025',
    credlyUrl: 'https://www.credly.com/badges/b1a76f4c-192a-4006-80cf-6f6f2df6a142/public_url',
    image: 'https://images.credly.com/size/340x340/images/54fdb971-fd75-4c35-88d3-a26abf11dfc8/image.png'
  },
  {
    name: 'AWS Cloud Club Captain: Gold Level',
    issuer: 'AWS',
    date: '2025',
    credlyUrl: 'https://www.credly.com/badges/6ab9b1ef-1a35-44c0-9bd7-3cc0a0fa7262/public_url',
    image: 'https://images.credly.com/size/340x340/images/d2f9e17a-6036-4b42-97b1-0ab2323c4b2f/image.png'
  }
];

export const currentlyLearning = [
  'Machine Learning',
  'GraphQL',
  'Microservices Architecture'
];
