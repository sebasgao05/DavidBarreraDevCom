import { env } from '../config/env';
import type { SkillsOrbits } from '../types/skills';
import { orbitsToSkills } from '../types/skills';

// Multi lingual portfolio data
export const portfolioData = {
  es: {
    personalInfo: {
      role: 'Ingeniero de Software | Ingeniería de datos | Desarrollador AWS Cloud',
    },
    experience: [
      {
        title: 'All Star Semillero – Desarrollo de Software, Análisis y Nube',
        company: 'Blend360',
        period: 'Mayo 2026 - Presente',
        description: 'Seleccionado para el programa de alto potencial All Star. Desarrollo en Java, Python y JavaScript para backend y cloud. Construcción de APIs REST, gestión de bases de datos SQL y aplicación de metodologías Agile/Scrum en entornos colaborativos.',
        technologies: ['Java', 'Python', 'JavaScript', 'AWS', 'APIs REST', 'SQL', 'Agile/Scrum']
      },
      {
        title: 'Practicante Desarrollador de Aplicaciones',
        company: 'IBM',
        period: 'Febrero 2025 - Diciembre 2025',
        description: 'Migración a la nube y modernización de aplicaciones legacy hacia AWS. Mejoras en backend y automatización cloud en sprints Agile/Scrum. Implementación de flujos DevOps y automatización de procesos, reduciendo en un 30% las actividades manuales.',
        technologies: ['Java', 'Spring Boot', 'AWS', 'Docker', 'DevOps', 'Agile/Scrum']
      }
    ],
    volunteer: [
      {
        title: 'AWS Community Builder - DevTools',
        company: 'AWS',
        period: 'Marzo 2026 - Actualidad',
        description: 'Miembro del programa AWS Community Builder en la categoría DevTools. Contribución a la comunidad AWS mediante contenido técnico, eventos y mentoría. Promoción de mejores prácticas en herramientas de desarrollo y DevOps.',
        technologies: ['AWS DevTools', 'CI/CD', 'CodePipeline', 'CodeBuild', 'Community Building'],
        profileUrl: 'https://aws.amazon.com/developer/community/community-builders/'
      },
      {
        title: 'Student Builder Group Leader (SBGL)',
        company: 'EAN University',
        period: 'Abril 2025 - Junio 2026',
        description: 'Organizó 24+ eventos técnicos con 400+ asistentes presenciales y 60 virtuales. Colaboró con 7+ grupos de estudiantes en Colombia para promover tecnologías AWS y arquitecturas cloud.',
        technologies: ['AWS', 'Cloud Architecture', 'Leadership', 'Teaching'],
        profileUrl: 'https://builder.aws.com/community/cloud-clubs/'
      }
    ],
    projects: [
      {
        title: 'Finanzas Personales – Aplicación Full Stack Serverless',
        description: 'Aplicación full stack serverless de gestión de finanzas personales con autenticación segura, APIs GraphQL, base de datos NoSQL y pruebas automatizadas. Arquitectura cloud-native con AWS Amplify Gen 2.',
        image: '/images/projects/FinanzasPersonales.png',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AWS Amplify Gen 2', 'AWS AppSync', 'GraphQL', 'DynamoDB', 'Cognito', 'Vitest'],
        githubUrl: 'https://github.com/sebasgao05/FinanzasPersonales',
        demoUrl: 'https://qbtwm8k851.execute-api.us-east-1.amazonaws.com/',
        featured: true
      },
      {
        title: 'Duitama Taxi Pricing',
        description: 'Sistema de cálculo de tarifas de taxi para la ciudad de Duitama. API Rest que permite calcular el costo de viajes basado en distancia y tiempo, con interfaz intuitiva y responsive.',
        image: '/images/projects/project-taxi-pricing.jpg',
        technologies: ['Node.js', 'Express', 'Typescript', 'AWS SAM', 'Jest', 'AWS', 'API REST', 'Serverless'],
        githubUrl: 'https://github.com/sebasgao05/duitama-taxi-pricing',
        demoUrl: 'https://qbtwm8k851.execute-api.us-east-1.amazonaws.com/production/docs',
        featured: true
      },
      {
        title: 'Cloud Control Panel',
        description: 'Panel de control serverless para gestionar instancias EC2 en una o múltiples cuentas AWS. Incluye scheduler con EventBridge, notificaciones, estimación de costos, roles y permisos (RBAC), y CI/CD con GitHub Actions.',
        image: '/images/projects/ControlPanelServerless.png',
        technologies: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudFront', 'S3', 'EventBridge', 'CloudFormation', 'Serverless'],
        githubUrl: 'https://github.com/sebasgao05/cloud-control-panel',
        demoUrl: 'https://github.com/sebasgao05/cloud-control-panel',
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
        title: 'AWS Cloud + IOT',
        description: 'proyecto desarrollado un sensor de gas implementado en la nube, incluyendo arquitecturas serverless',
        image: '/images/projects/project-aws-iot.jpg',
        technologies: ['DynamoDB', 'EC2', 'SNS'],
        githubUrl: 'https://github.com/sebasgao05',
        demoUrl: 'https://54.242.72.108/',
        featured: false
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
        period: '2022 - 2025',
        description: 'Ingeniero de Sistemas graduado con formacion integral en desarrollo de software, arquitectura de sistemas y tecnologías emergentes. Enfoque en cloud computing y desarrollo de aplicaciones empresariales.',
        professionalCardUrl: 'https://tramites.copnia.gov.co/Copnia_Microsite/CertificateOfGoodStanding/WaterMarkmethod?CertificateNumber=091122-0833386%20CNDB'
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
      role: 'Software Engineer | Data Engineering | AWS Cloud Developer',
    },
    experience: [
      {
        title: 'All Star Program – Software Development, Analytics, and Cloud',
        company: 'Blend360',
        period: 'May 2026 - Present',
        description: 'Selected for the high-potential All Star program. Development in Java, Python, and JavaScript for backend and cloud. Building REST APIs, SQL database management, and applying Agile/Scrum methodologies in collaborative environments.',
        technologies: ['Java', 'Python', 'JavaScript', 'AWS', 'APIs REST', 'SQL', 'Agile/Scrum']
      },
      {
        title: 'Application Developer Intern',
        company: 'IBM',
        period: 'February 2025 - December 2025',
        description: 'Cloud migration and modernization of legacy applications to AWS. Backend improvements and cloud automation in Agile/Scrum sprints. Implementation of DevOps workflows and process automation, reducing manual activities by 30%.',
        technologies: ['Java', 'Spring Boot', 'AWS', 'Docker', 'DevOps', 'Agile/Scrum']
      }
    ],
    volunteer: [
      {
        title: 'AWS Community Builder - DevTools',
        company: 'AWS',
        period: 'March 2026 - Present',
        description: 'Member of the AWS Community Builder program in the DevTools category. Contributing to the AWS community through technical content, events and mentoring. Promoting best practices in development tools and DevOps.',
        technologies: ['AWS DevTools', 'CI/CD', 'CodePipeline', 'CodeBuild', 'Community Building'],
        profileUrl: 'https://aws.amazon.com/developer/community/community-builders/'
      },
      {
        title: 'Student Builder Group Leader (SBGL)',
        company: 'EAN University',
        period: 'April 2025 - June 2026',
        description: 'Organized 24+ technical events with 400+ in-person attendees and 60 virtual participants. Collaborated with 7+ student groups across Colombia to promote AWS technologies and cloud architectures.',
        technologies: ['AWS', 'Cloud Architecture', 'Leadership', 'Teaching'],
        profileUrl: 'https://builder.aws.com/community/cloud-clubs/'
      }
    ],
    projects: [
      {
        title: 'Personal Finance – Full Stack Serverless Application',
        description: 'Full stack serverless personal finance management application with secure authentication, GraphQL APIs, NoSQL database, and automated testing. Cloud-native architecture with AWS Amplify Gen 2.',
        image: '/images/projects/FinanzasPersonales.png',
        technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AWS Amplify Gen 2', 'AWS AppSync', 'GraphQL', 'DynamoDB', 'Cognito', 'Vitest'],
        githubUrl: 'https://github.com/sebasgao05/FinanzasPersonales',
        demoUrl: 'https://qbtwm8k851.execute-api.us-east-1.amazonaws.com/',
        featured: true
      },
      {
        title: 'Duitama Taxi Pricing',
        description: 'Taxi fare calculation system for Duitama city. API Rest that allows calculating trip costs based on distance and time, with intuitive and responsive interface.',
        image: '/images/projects/project-taxi-pricing.jpg',
        technologies: ['Node.js', 'Express', 'Typescript', 'AWS SAM', 'Jest', 'AWS', 'API REST', 'Serverless'],
        githubUrl: 'https://github.com/sebasgao05/duitama-taxi-pricing',
        demoUrl: 'https://qbtwm8k851.execute-api.us-east-1.amazonaws.com/production/docs',
        featured: true
      },
      {
        title: 'Cloud Control Panel',
        description: 'Serverless control panel to manage EC2 instances across one or multiple AWS accounts. Includes an EventBridge scheduler, notifications, cost estimation, role-based access control (RBAC), and CI/CD with GitHub Actions.',
        image: '/images/projects/ControlPanelServerless.png',
        technologies: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudFront', 'S3', 'EventBridge', 'CloudFormation', 'Serverless'],
        githubUrl: 'https://github.com/sebasgao05/cloud-control-panel',
        demoUrl: 'https://github.com/sebasgao05/cloud-control-panel',
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
        title: 'AWS Cloud + IOT',
        description: 'Project developed a gas sensor implemented in the cloud, including serverless architectures',
        image: '/images/projects/project-aws-iot.jpg',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudFormation'],
        githubUrl: 'https://github.com/sebasgao05',
        demoUrl: 'https://54.242.72.108/',
        featured: false
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
        period: '2022 - 2025',
        description: 'Systems Engineer graduated with comprehensive training in software development, systems architecture and emerging technologies. Focus on cloud computing and enterprise application development.',
        professionalCardUrl: 'https://tramites.copnia.gov.co/Copnia_Microsite/CertificateOfGoodStanding/WaterMarkmethod?CertificateNumber=091122-0833386%20CNDB'
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
      { name: 'Tailwind CSS', level: 'intermedio' },
      { name: 'Angular', level: 'basico' },
      { name: 'Vite', level: 'basico' },
      { name: 'shadcn/ui', level: 'basico' }
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
      { name: 'Spring WebFlux', level: 'basico' },
      { name: 'GraphQL', level: 'basico' }
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
      { name: 'IAM', level: 'intermedio' },
      { name: 'AWS AppSync', level: 'intermedio' },
      { name: 'Amazon Cognito', level: 'intermedio' },
      { name: 'AWS Amplify', level: 'intermedio' }
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
      { name: 'Terraform', level: 'fundamentos' },
      { name: 'GitHub Actions', level: 'intermedio' },
      { name: 'SonarQube', level: 'basico' },
      { name: 'Artifactory', level: 'basico' }
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
      { name: 'Jira', level: 'basico' },
      { name: 'Vitest', level: 'intermedio' },
      { name: 'fast-check', level: 'basico' },
      { name: 'JMeter', level: 'basico' },
      { name: 'Karate', level: 'basico' }
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
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Agosto 2026 - Agosto 2029',
    credlyUrl: 'https://www.credly.com/badges/842d7d89-b234-42fd-9c65-01a567c6f3a8/public_url',
    image: '/images/badge/aws-certified-ai-practitioner.png'
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    date: 'Julio 2026 - Julio 2029',
    credlyUrl: 'https://www.credly.com/badges/bbb6141d-8b49-498b-9b79-92b1ae847608/public_url',
    image: '/images/badge/aws-certified-cloud-practitioner.webp'
  },
  {
    name: 'AWS Cloud Club Captain',
    issuer: 'Amazon Web Services (AWS)',
    date: '2025 - 2026',
    credlyUrl: 'https://www.credly.com/badges/b1a76f4c-192a-4006-80cf-6f6f2df6a142/public_url',
    image: '/images/badge/aws-cloud-club-captain-112.webp'
  }
];

export const currentlyLearning = [
  'Machine Learning',
  'GraphQL',
  'Microservices Architecture'
];
