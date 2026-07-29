import { 
  HeroSection, 
  AboutSection, 
  EducationItem, 
  SkillItem, 
  ProjectItem, 
  ExperienceItem, 
  CertificateItem, 
  AchievementItem, 
  LeadershipItem, 
  CVItem, 
  BlogPost, 
  SocialLink, 
  SiteSettings 
} from '../types';

export const initialSiteSettings: SiteSettings = {
  siteTitle: 'Daniel Owino | Professional E-Portfolio',
  logoText: 'DANIEL OWINO',
  primaryColor: '#2563eb',
  secondaryColor: '#0f172a',
  accentColor: '#3b82f6',
  fontFamily: 'Inter, sans-serif',
  footerText: 'Empowering innovation through software engineering, cloud solutions, and leadership.',
  copyrightText: '© 2026 Daniel Owino. All rights reserved.',
  defaultProfileImage: '',
  seoDescription: 'Professional E-Portfolio and Technology Showcase of Daniel Owino - Software Engineer, Technology Specialist & Student Leader.',
  emailContact: 'danielowino233@gmail.com',
  phoneContact: '+254 700 000 000',
  locationContact: 'Nairobi, Kenya',
};

export const initialHero: HeroSection = {
  fullName: 'DANIEL OWINO',
  title: 'Software Engineer & Full-Stack Developer',
  shortIntro: 'Passionate about designing scalable cloud applications, building robust full-stack architectures, and leveraging modern software technologies to solve complex real-world problems.',
  tagline: 'Building the future with clean code, scalable architecture, and user-centric design.',
  profileImageUrl: '',
  primaryButtonText: 'Explore Projects',
  primaryButtonLink: '#projects',
  secondaryButtonText: 'Download Resume',
  secondaryButtonLink: '#resume',
  contactButtonText: 'Contact Me',
  contactButtonLink: '#contact',
};

export const initialAbout: AboutSection = {
  biography: `I am Daniel Owino, a dedicated Software Engineer and Technology Consultant with a strong foundation in computer science, cloud computing, and full-stack software development. Driven by curiosity and a desire for continuous learning, I specialize in building reliable, high-performance web applications, cloud-native services, and user-focused digital solutions.

Over the past years of intensive academic study, hands-on software development, and community leadership, I have acquired expertise in modern web frameworks, database administration, RESTful API design, and cloud architecture. I thrive in collaborative environments where software craftsmanship, clean code principles, and problem-solving drive product excellence.`,
  personalIntro: 'Motivated tech enthusiast and developer committed to turning visionary concepts into elegant, functional digital applications.',
  mission: 'To architect clean, scalable, and impactful technology solutions that empower organizations, optimize workflows, and enhance human experiences.',
  vision: 'To become a distinguished global software leader and technology innovator driving digital transformation across Africa and worldwide.',
  careerInterests: [
    'Full-Stack Web & Mobile Development',
    'Cloud Systems Architecture & DevOps',
    'Enterprise Data Engineering & APIs',
    'Artificial Intelligence & Applied Machine Learning',
    'Cybersecurity & Network Infrastructure'
  ],
  specializations: [
    'Frontend Engineering (React, TypeScript, Tailwind CSS)',
    'Backend Development (Node.js, Express, REST APIs)',
    'Database Architecture (PostgreSQL, Firestore, MongoDB)',
    'Cloud Infrastructure (Google Cloud Platform, AWS, Docker)',
    'System Design & Security Best Practices'
  ],
  values: [
    'Technical Excellence & Code Craftsmanship',
    'Integrity & Professional Reliability',
    'Continuous Learning & Adaptability',
    'Collaborative Leadership & Mentorship',
    'User-Centered Problem Solving'
  ],
  shortTermGoals: [
    'Attain advanced Cloud Architect and Full-Stack Certifications',
    'Deploy high-impact open-source and enterprise software systems',
    'Expand mentorship initiatives for emerging software developer communities'
  ],
  longTermGoals: [
    'Found a cutting-edge technology enterprise focused on scalable cloud solutions',
    'Lead high-performing global engineering teams in developing transformative tech',
    'Contribute to open-source computing standards and digital infrastructure growth'
  ],
  profileImageUrl: '',
};

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    institution: 'University of Technology & Computer Science',
    degree: 'Bachelor of Science in Information Technology',
    fieldOfStudy: 'Software Engineering & Cloud Computing',
    startDate: '2022-09',
    endDate: '2026-06',
    currentStatus: true,
    description: 'Specializing in Advanced Software Architecture, Database Systems, Cloud Infrastructure, and Network Security. Maintaining consistent academic excellence and active student tech leadership.',
    institutionLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
    relevantSubjects: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Distributed Systems & Cloud Computing',
      'Software Testing & Quality Assurance',
      'Computer Networks & Cybersecurity'
    ],
    achievements: [
      'Dean\'s Honor Roll for Outstanding Academic Performance',
      'Lead Developer & Organizer for Annual Campus Hackathon',
      'Published Capstone Project on Enterprise Cloud Asset Management'
    ],
    order: 1,
    published: true,
  },
  {
    id: 'edu-2',
    institution: 'National Tech Institute',
    degree: 'Diploma in Computer Systems & Networking',
    fieldOfStudy: 'Computer Engineering & Networking',
    startDate: '2020-01',
    endDate: '2022-05',
    currentStatus: false,
    description: 'Comprehensive study of hardware diagnostics, Cisco routing & switching, Linux systems administration, and foundational software development.',
    institutionLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
    relevantSubjects: [
      'Linux System Administration',
      'Cisco CCNA Networking Essentials',
      'Hardware Maintenance & Security',
      'Web Technologies & Scripting'
    ],
    achievements: [
      'Graduated with First Class Honors',
      'Best Networking Practical Student Award'
    ],
    order: 2,
    published: true,
  }
];

export const initialSkills: SkillItem[] = [
  // Programming
  { id: 'sk-1', name: 'TypeScript / JavaScript', category: 'Programming', level: 'Proficient', yearsOfExperience: 4, order: 1, published: true },
  { id: 'sk-2', name: 'Python', category: 'Programming', level: 'Advanced', yearsOfExperience: 3, order: 2, published: true },
  { id: 'sk-3', name: 'Java / C#', category: 'Programming', level: 'Intermediate', yearsOfExperience: 2, order: 3, published: true },
  
  // Web Development
  { id: 'sk-4', name: 'React.js & Next.js', category: 'Web Development', level: 'Proficient', yearsOfExperience: 4, order: 4, published: true },
  { id: 'sk-5', name: 'Node.js & Express', category: 'Web Development', level: 'Proficient', yearsOfExperience: 3, order: 5, published: true },
  { id: 'sk-6', name: 'Tailwind CSS & Modern UI', category: 'Web Development', level: 'Proficient', yearsOfExperience: 3, order: 6, published: true },
  { id: 'sk-7', name: 'REST APIs & GraphQL', category: 'Web Development', level: 'Advanced', yearsOfExperience: 3, order: 7, published: true },

  // Databases
  { id: 'sk-8', name: 'PostgreSQL & SQL', category: 'Databases', level: 'Advanced', yearsOfExperience: 3, order: 8, published: true },
  { id: 'sk-9', name: 'Google Cloud Firestore / Firebase', category: 'Databases', level: 'Proficient', yearsOfExperience: 3, order: 9, published: true },
  { id: 'sk-10', name: 'MongoDB & Redis', category: 'Databases', level: 'Intermediate', yearsOfExperience: 2, order: 10, published: true },

  // Cloud & Deployment
  { id: 'sk-11', name: 'Google Cloud Platform (GCP)', category: 'Cloud & Deployment', level: 'Advanced', yearsOfExperience: 2, order: 11, published: true },
  { id: 'sk-12', name: 'Docker & Containerization', category: 'Cloud & Deployment', level: 'Intermediate', yearsOfExperience: 2, order: 12, published: true },
  { id: 'sk-13', name: 'Git & GitHub CI/CD', category: 'Cloud & Deployment', level: 'Proficient', yearsOfExperience: 4, order: 13, published: true },

  // Professional & Soft Skills
  { id: 'sk-14', name: 'Agile & Scrum Methodologies', category: 'Professional Skills', level: 'Advanced', yearsOfExperience: 3, order: 14, published: true },
  { id: 'sk-15', name: 'Technical Leadership & Mentorship', category: 'Leadership', level: 'Advanced', yearsOfExperience: 2, order: 15, published: true },
  { id: 'sk-16', name: 'Complex Problem Solving', category: 'Problem Solving', level: 'Proficient', yearsOfExperience: 4, order: 16, published: true },
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Cloud Asset Management System',
    shortDescription: 'A multi-tenant cloud application for real-time tracking, auditing, and maintenance management of enterprise hardware and software assets.',
    detailedDescription: 'Built to streamline operations for medium-to-large organizations, this system centralizes hardware inventory, software license tracking, automated maintenance alerts, and audit report generation into a responsive dashboard.',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    problemStatement: 'Organizations struggled with fragmented asset records across spreadsheets, leading to lost hardware, unmonitored license expirations, and costly compliance failures.',
    solution: 'Designed a unified SaaS dashboard with role-based access control (RBAC), automated barcode scan tracking, and cloud database synchronization.',
    keyFeatures: [
      'Real-time asset tracking with barcode & QR scanning',
      'Role-based security for Admins, Managers, and Technicians',
      'Automated email notifications for warranty & maintenance schedules',
      'Interactive visual telemetry and audit logs'
    ],
    myRole: 'Lead Full-Stack Developer & Database Architect',
    challenges: 'Ensuring sub-second search and filtering performance over 100,000 asset records while maintaining high security.',
    results: 'Reduced asset audit time by 65% and eliminated unauthorized hardware usage across pilot enterprise testing.',
    githubUrl: 'https://github.com/danielowino/enterprise-asset-manager',
    liveUrl: 'https://asset-manager.example.com',
    startDate: '2024-01',
    completionDate: '2024-05',
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'proj-2',
    title: 'Smart Agribusiness IoT & Analytics Dashboard',
    shortDescription: 'An end-to-end telemetry dashboard monitoring soil moisture, temperature, and crop health metrics in real-time.',
    detailedDescription: 'Leveraging IoT sensors and modern cloud telemetry APIs, this platform provides smallholder and commercial farmers with actionable weather insights, automated irrigation scheduling, and crop yield forecasting.',
    category: 'IoT & Cloud',
    technologies: ['React', 'TypeScript', 'Python', 'Firebase Firestore', 'Google Cloud Functions', 'Recharts'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    ],
    problemStatement: 'Farmers faced uncertain crop yields due to unpredictable climate patterns and inefficient water usage during dry seasons.',
    solution: 'Integrated wireless soil sensors with a cloud-backed dashboard that automatically triggers smart water pumps based on threshold logic.',
    keyFeatures: [
      'Live sensor data streaming via WebSockets and Firebase',
      'Automated irrigation triggers based on soil moisture curves',
      'AI-powered weather forecasting and crop disease risk warnings',
      'Exportable yield performance report spreadsheets'
    ],
    myRole: 'Full-Stack Developer & IoT System Designer',
    challenges: 'Handling intermittent rural network connectivity with offline data caching and automatic re-syncing.',
    results: 'Saved up to 40% water consumption in agricultural trial zones.',
    githubUrl: 'https://github.com/danielowino/smart-agri-dashboard',
    liveUrl: 'https://smartagri.example.com',
    startDate: '2024-06',
    completionDate: '2024-10',
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'proj-3',
    title: 'Campus Student Portal & Resource Hub',
    shortDescription: 'A modern, unified portal for students to access academic schedules, course materials, club activities, and campus news.',
    detailedDescription: 'Developed to replace outdated legacy campus portals, delivering a lightning-fast Mobile-first interface with push notifications, course registration, peer-to-peer discussion boards, and event scheduling.',
    category: 'Mobile & Web',
    technologies: ['React', 'TypeScript', 'Express', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80'
    ],
    problemStatement: 'Students experienced frustration with slow, non-responsive portals during course registration peaks.',
    solution: 'Architected a lightweight responsive web app with intelligent caching and seamless document downloads.',
    keyFeatures: [
      'Instant timetable & grade overview',
      'Club event booking & ticket generation',
      'Secure PDF lecture notes repository',
      'Real-time campus announcements'
    ],
    myRole: 'Lead UI/UX Designer & Frontend Engineer',
    challenges: 'Managing high concurrency during campus registration windows without server downtime.',
    results: 'Used by over 3,000 active students daily with zero downtime during peak examination periods.',
    githubUrl: 'https://github.com/danielowino/campus-resource-hub',
    liveUrl: 'https://campus.example.com',
    startDate: '2023-08',
    completionDate: '2023-12',
    featured: true,
    published: true,
    order: 3,
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    organization: 'Apex Digital Solutions',
    position: 'Full-Stack Software Engineer',
    employmentType: 'Employment',
    startDate: '2024-06',
    endDate: 'Present',
    currentPosition: true,
    location: 'Nairobi, Kenya',
    description: 'Developing high-concurrency web applications, REST API services, and modern frontend interfaces for corporate clients across fintech, logistics, and education.',
    responsibilities: [
      'Architected and deployed responsive React/TypeScript single-page applications connected to Express backends.',
      'Designed relational database schemas in PostgreSQL and managed Firebase Firestore real-time databases.',
      'Implemented OAuth2 authentication, JWT secure sessions, and role-based access control.',
      'Collaborated in Agile sprints, conducting code reviews and optimizing API response latency by 35%.'
    ],
    achievements: [
      'Successfully delivered 4 major client web platforms ahead of deadline.',
      'Received Company Performance Award for Technical Quality & Innovation.'
    ],
    skillsUsed: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'GCP', 'Tailwind CSS'],
    organizationLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80',
    order: 1,
    published: true,
  },
  {
    id: 'exp-2',
    organization: 'Global Tech Innovations',
    position: 'Software Engineering Intern',
    employmentType: 'Internship',
    startDate: '2023-05',
    endDate: '2023-11',
    currentPosition: false,
    location: 'Nairobi, Kenya',
    description: 'Worked closely with senior systems architects to build internal tooling, automate testing suites, and optimize UI component libraries.',
    responsibilities: [
      'Built reusable accessible React component libraries reducing frontend development cycles for core teams.',
      'Wrote comprehensive unit and integration test scripts using Jest and Cypress.',
      'Assisted in containerizing legacy Node.js microservices using Docker.'
    ],
    achievements: [
      'Automated deployment pipelines, reducing deployment errors by 50%.',
      'Authored technical documentation used across company engineering teams.'
    ],
    skillsUsed: ['JavaScript', 'React', 'Docker', 'Git', 'REST APIs', 'Unit Testing'],
    organizationLogo: 'https://images.unsplash.com/photo-1542744094-3a317272018a?auto=format&fit=crop&w=200&q=80',
    order: 2,
    published: true,
  }
];

export const initialCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Google Cloud Certified Associate Cloud Engineer',
    issuingOrganization: 'Google Cloud Platform',
    description: 'Demonstrated proficiency in deploying applications, monitoring operations, and managing enterprise cloud solutions on GCP.',
    issueDate: '2024-03-15',
    credentialId: 'GCP-ACE-982341',
    credentialUrl: 'https://www.credly.com',
    certificateFileUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
    verificationUrl: 'https://cloud.google.com/certification',
    category: 'Cloud Computing',
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'cert-2',
    title: 'Meta Front-End Developer Professional Certificate',
    issuingOrganization: 'Meta / Coursera',
    description: 'Comprehensive mastery of React, JavaScript, HTML5/CSS3, UX/UI principles, Version Control with Git, and Advanced Web Applications.',
    issueDate: '2023-09-10',
    credentialId: 'META-FE-772109',
    credentialUrl: 'https://www.coursera.org',
    certificateFileUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: 'cert-3',
    title: 'Cisco Certified Network Associate (CCNA)',
    issuingOrganization: 'Cisco Networking Academy',
    description: 'Validation of core knowledge in networking fundamentals, IP connectivity, IP services, security fundamentals, and network automation.',
    issueDate: '2022-11-20',
    credentialId: 'CISCO-CCNA-441092',
    certificateFileUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    category: 'Networking & Security',
    featured: false,
    published: true,
    order: 3,
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '1st Place Winner - Annual Inter-University Software Hackathon',
    description: 'Awarded first position out of 45 competing university engineering teams for developing an AI-driven smart agriculture irrigation platform.',
    date: '2024-04-18',
    organization: 'National Innovation Hub',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    category: 'Hackathon & Innovation',
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: 'ach-2',
    title: 'Academic Excellence Award',
    description: 'Recognized for top academic standings in Software Architecture and Computer Systems Networking.',
    date: '2023-11-05',
    organization: 'School of Computing & Technology',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    category: 'Academic Honor',
    featured: true,
    published: true,
    order: 2,
  }
];

export const initialLeadership: LeadershipItem[] = [
  {
    id: 'lead-1',
    organization: 'Developer Student Community (DSC)',
    position: 'Tech Lead & Community Chapter President',
    description: 'Heading a campus chapter of over 400 student developers, organizing technical workshops, hackathons, and software bootcamps.',
    responsibilities: [
      'Organized and hosted 15+ hands-on technical workshops on React, Cloud Computing, and Git.',
      'Mentored junior students in building capstone software projects and preparing for tech interviews.',
      'Partnered with industry tech leaders to bring guest speakers and career opportunities to campus.'
    ],
    achievements: [
      'Grew active community membership by 120% in a single academic year.',
      'Led 8 student teams to successfully submit global developer challenge projects.'
    ],
    startDate: '2023-09',
    endDate: 'Present',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    order: 1,
    published: true,
  },
  {
    id: 'lead-2',
    organization: 'Tech Youth Mentorship Initiative',
    position: 'Volunteer Technical Instructor',
    description: 'Volunteering weekends to teach high school students introductory programming, web design basics, and digital literacy.',
    responsibilities: [
      'Taught HTML, CSS, and basic JavaScript to classes of 30+ students.',
      'Guided students through building their very first personal websites.'
    ],
    achievements: [
      'Mentored over 80 youth in basic computer skills and coding fundamentals.'
    ],
    startDate: '2022-06',
    endDate: '2023-08',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    order: 2,
    published: true,
  }
];

export const initialCV: CVItem = {
  title: 'Daniel Owino - Official Curriculum Vitae',
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Professional sample PDF link
  fileName: 'Daniel_Owino_Software_Engineer_CV.pdf',
  updatedAt: new Date().toISOString().split('T')[0],
  version: '2026.1',
  summary: 'Experienced Full-Stack Software Engineer with specialized skills in TypeScript, React, Node.js, Cloud Architectures, and System Administration. Proven track record of leading software projects and technical communities.',
  previousVersions: [
    {
      version: '2025.2',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      updatedAt: '2025-10-15'
    }
  ]
};

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Architecting Scalable Cloud-Native Applications in 2026',
    slug: 'architecting-scalable-cloud-native-applications-2026',
    featuredImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    excerpt: 'An in-depth guide on designing resilient microservices, optimizing serverless backends, and enforcing modern zero-trust security patterns.',
    content: `
# Architecting Scalable Cloud-Native Applications in 2026

Modern software engineering demands high elasticity, sub-second latency, and fault-tolerant architecture. As enterprise systems migrate to cloud environments, understanding the core principles of cloud-native design is vital.

## 1. Decoupled Services & Event-Driven Architecture
Monolithic architectures often suffer from cascading failures. By decoupling business domains into lightweight microservices communicating via asynchronous event buses (such as Google Cloud Pub/Sub or Kafka), engineering teams can scale individual services independently.

## 2. Infrastructure as Code (IaC)
Manual server provisioning is error-prone. Adopting IaC tools like Terraform or CloudFormation guarantees reproducible environment setups across staging, preview, and production.

\`\`\`typescript
// Example: Health check endpoint in Express TypeScript
import express, { Request, Response } from 'express';

const app = express();
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'HEALTHY', timestamp: new Date().toISOString() });
});
\`\`\`

## 3. Persistent Observability & Telemetry
In distributed systems, logging is no longer sufficient. Full telemetry requires structured logging, distributed tracing, and real-time metric dashboards to identify performance bottlenecks before they impact users.

---
*Written by Daniel Owino - Software Engineer*
    `,
    category: 'Cloud Computing',
    tags: ['Cloud', 'Architecture', 'TypeScript', 'DevOps'],
    author: 'Daniel Owino',
    publicationDate: '2026-05-10',
    readingTimeMinutes: 5,
    published: true,
    featured: true,
    views: 342,
  },
  {
    id: 'blog-2',
    title: 'Mastering State Management & Performant React Interfaces',
    slug: 'mastering-state-management-performant-react-interfaces',
    featuredImageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Best practices for organizing state in large React TypeScript projects to avoid unnecessary re-renders and maintain clean component trees.',
    content: `
# Mastering State Management & Performant React Interfaces

Building fast, responsive web interfaces requires careful consideration of how data flows through React component trees.

## Common Pitfalls in State Management
1. **Over-using Global State**: Putting every small modal toggle in global context leads to component re-render cascades. Keep state local whenever possible.
2. **Missing Memoization**: Expensive calculations inside render cycles should be wrapped in \`useMemo\` or computed outside the component.

## Best Practices
- **Use Immutable Updates**: Always update arrays and objects using pure functions.
- **Leverage Firestore Real-time Listeners**: Sync local state with Cloud Firestore observables for seamless user experience without polling.
    `,
    category: 'Web Development',
    tags: ['React', 'Frontend', 'Performance', 'UI/UX'],
    author: 'Daniel Owino',
    publicationDate: '2026-02-14',
    readingTimeMinutes: 4,
    published: true,
    featured: false,
    views: 215,
  }
];

export const initialSocials: SocialLink[] = [
  { id: 'soc-1', platform: 'LinkedIn', url: 'https://linkedin.com/in/danielowino', iconName: 'Linkedin', published: true, order: 1 },
  { id: 'soc-2', platform: 'GitHub', url: 'https://github.com/danielowino', iconName: 'Github', published: true, order: 2 },
  { id: 'soc-3', platform: 'X/Twitter', url: 'https://twitter.com/danielowino', iconName: 'Twitter', published: true, order: 3 },
  { id: 'soc-4', platform: 'Email', url: 'mailto:danielowino233@gmail.com', iconName: 'Mail', published: true, order: 4 },
];
