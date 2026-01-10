import { env } from '../config/env';
import type { SkillsOrbits } from '../types/skills';
import { orbitsToSkills } from '../types/skills';

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
        period: 'Febrero 2025 - Diciembre 2025',
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
      { name: 'Inglés', level: 'Intermedio (B2)' },
      { name: 'Italiano', level: 'Básico (A1)' }
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
        period: 'February 2025 - December 2025',
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
      { name: 'English', level: 'Intermediate (B2)' },
      { name: 'Italian', level: 'Basic (A1)' }
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

export const skillsOrbits: SkillsOrbits = {
  frontend: {
    name: { es: 'Frontend', en: 'Frontend' },
    color: '#cb1722',
    satellites: [
      { name: 'HTML5', level: 'intermedio' },
      { name: 'CSS3', level: 'intermedio' },
      { name: 'JavaScript', level: 'intermedio' },
      { name: 'React', level: 'intermedio' },
      { name: 'TypeScript', level: 'intermedio' },
      { name: 'Next.js', level: 'basico' },
      { name: 'Tailwind CSS', level: 'intermedio' }
    ]
  },
  backend: {
    name: { es: 'Backend', en: 'Backend' },
    color: '#FE7C2C',
    satellites: [
      { name: 'Java', level: 'intermedio' },
      { name: 'Node.js', level: 'intermedio' },
      { name: 'Python', level: 'intermedio' },
      { name: 'Spring Boot', level: 'basico' },
      { name: 'JavaScript', level: 'intermedio' },
    ]
  },
  database: {
    name: { es: 'Bases de Datos', en: 'Databases' },
    color: '#4054d7',
    satellites: [
      { name: 'PostgreSQL', level: 'intermedio' },
      { name: 'MongoDB', level: 'intermedio' },
      { name: 'MySQL', level: 'intermedio' },
      { name: 'Aurora', level: 'intermedio' },
      { name: 'RDS', level: 'intermedio' },
      { name: 'DynamoDB', level: 'intermedio' }
    ]
  },
  cloud: {
    name: { es: 'Cloud Computing - AWS', en: 'Cloud Computing - AWS' },
    color: '#5d33b8',
    satellites: [
      { name: 'EC2', level: 'intermedio' },
      { name: 'Lambda', level: 'intermedio' },
      { name: 'ECS', level: 'intermedio' },
      { name: 'API Gateway', level: 'intermedio' },
      { name: 'S3', level: 'intermedio' },
      { name: 'Route 53', level: 'intermedio' },
      { name: 'CloudWatch', level: 'intermedio' },
      { name: 'SQS', level: 'intermedio' },
      { name: 'IAM', level: 'intermedio' }
    ]
  },
  devops: {
    name: { es: 'DevOps', en: 'DevOps' },
    color: '#126f5c',
    satellites: [
      { name: 'Gradle', level: 'basico' },
      { name: 'JUnit', level: 'basico' },
      { name: 'Azure Release', level: 'intermedio' },
      { name: 'Jenkins', level: 'basico' },
      { name: 'Maven', level: 'basico' },
      { name: 'Docker', level: 'basico' },
      { name: 'Kubernetes', level: 'fundamentos' },
      { name: 'Terraform', level: 'fundamentos' }
    ]
  },
  tools: {
    name: { es: 'Herramientas', en: 'Tools' },
    color: '#bc1356',
    satellites: [
      { name: 'Git', level: 'intermedio' },
      { name: 'Testing', level: 'intermedio' },
      { name: 'VS Code', level: 'intermedio' },
      { name: 'Figma', level: 'intermedio' },
      { name: 'Postman', level: 'intermedio' },
      { name: 'IntelliJ IDEA', level: 'intermedio' },
      { name: 'Jira', level: 'basico' }
    ]
  },
  integracion: {
    name: { es: 'Desarrollo de Integración', en: 'Integration Development' },
    color: '#bc1356',
    satellites: [
      { name: 'APIs REST', level: 'intermedio' },
      { name: 'APIs GraphQL', level: 'basico' },
      { name: 'Microservicios', level: 'basico' },
      { name: 'Serverless', level: 'intermedio' },
      { name: 'Azure Functions', level: 'basico' },
      { name: 'KAFKA', level: 'basico' }
    ]
  }
};

// Legacy skills for backward compatibility - generated from skillsOrbits
export const skills = orbitsToSkills(skillsOrbits);

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