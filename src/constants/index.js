import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  docker,
  postgresql,
  rubyrails,
  coverhunt,
  dcc,
  kelhel,
  microverse,
  vercel,
  mui,
  framer,
  sketch,
  adobexd,
  nextjs,
  slackRedesign,
  lyftRedesign,
  bbvaRedesign,
  realEstateRedesign,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Frontend Developer',
    icon: frontend,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'UI/UX Design',
    icon: ux,
  },
  {
    title: 'Software Prototyping',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Next.js',
    icon: nextjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'Rails',
    icon: rubyrails,
  },
  {
    name: 'PostgreSQL',
    icon: postgresql,
  },
  {
    name: 'Vercel',
    icon: vercel,
  },
  {
    name: 'Material UI',
    icon: mui,
  },
  {
    name: 'Framer Motion',
    icon: framer,
  },
  {
    name: 'Sketch',
    icon: sketch,
  },
  {
    name: 'Adobe XD',
    icon: adobexd,
  },
  {
    name: 'Git',
    icon: git,
  },
  {
    name: 'Docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Co-founder & FullStack Developer',
    company_name: 'RealEstate SaaS Platform',
    icon: nextjs,
    iconBg: '#333333',
    date: '2022 - Present',
    points: [
      'Complete design and development of a SaaS platform for the real estate sector, from conception to implementation.',
      'Creation of intuitive and attractive user interfaces using React, Next.js, and Tailwind CSS.',
      'Backend development with Node.js, implementation of RESTful APIs, and PostgreSQL database management.',
      'Implementation of secure authentication, user management, and permissions using modern technologies.',
      'Performance optimization, SEO, and user experience to maximize customer retention and satisfaction.',
      'Integration with third-party services such as payment gateways, maps, and notification services.'
    ]
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'Slack Redesign',
    description: 'Rediseño de la plataforma Slack con enfoque en mejorar la experiencia de usuario para herramientas de productividad con IA.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'green-text-gradient',
      },
      {
        name: 'framer-motion',
        color: 'pink-text-gradient',
      },
    ],
    image: slackRedesign,
    repo: 'https://github.com/yourusername/slack-redesign',
    demo: 'https://slack-redesign-demo.vercel.app/',
  },
  {
    id: 'project-2',
    name: 'Lyft Redesign',
    description: 'Rediseño de la aplicación Lyft con una interfaz más intuitiva y accesible para conductores y pasajeros.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'typescript',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: lyftRedesign,
    repo: 'https://github.com/yourusername/lyft-redesign',
    demo: 'https://lyft-redesign-demo.vercel.app/',
  },
  {
    id: 'project-3',
    name: 'BBVA México Redesign',
    description: 'Rediseño de la banca en línea de BBVA México con enfoque en seguridad, usabilidad y experiencia de usuario moderna.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'mui',
        color: 'pink-text-gradient',
      },
    ],
    image: bbvaRedesign,
    repo: 'https://github.com/yourusername/bbva-redesign',
    demo: 'https://bbva-redesign-demo.vercel.app/',
  },
  {
    id: 'project-4',
    name: 'Real Estate Platform',
    description: 'Rediseño de plataforma inmobiliaria con funcionalidades avanzadas de búsqueda y visualización de propiedades.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'prisma',
        color: 'green-text-gradient',
      },
      {
        name: 'tailwind',
        color: 'pink-text-gradient',
      },
    ],
    image: realEstateRedesign,
    repo: 'https://github.com/yourusername/realestate-redesign',
    demo: 'https://realestate-redesign-demo.vercel.app/',
  },
];

export { services, technologies, experiences, projects };
