import { QuestionCategory } from '../types';

export interface CategoryInfo {
  id: QuestionCategory;
  label: string;
  iconName: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'All Topics',
    label: 'All Topics',
    iconName: 'Layers',
    description: 'All 500+ .NET & tech interview questions curated from top tech interviews.'
  },
  {
    id: 'C# / OOPS',
    label: 'C# / OOPS',
    iconName: 'Code',
    description: 'Object-oriented programming, classes, inheritance, polymorphism, delegates, and C# fundamentals.'
  },
  {
    id: '.NET Framework',
    label: '.NET Framework',
    iconName: 'Cpu',
    description: 'CLR, CTS, CLS, Garbage Collection generations, assemblies, multithreading, and reflection.'
  },
  {
    id: '.NET Core',
    label: '.NET Core',
    iconName: 'Zap',
    description: 'ASP.NET Core request pipeline, middleware, dependency injection lifetimes, Kestrel, and CORS.'
  },
  {
    id: 'Web API',
    label: 'Web API',
    iconName: 'Globe',
    description: 'RESTful architecture, HTTP verbs, JWT token authentication, OAuth, and Content Negotiation.'
  },
  {
    id: 'SQL',
    label: 'SQL',
    iconName: 'Database',
    description: 'RDBMS concepts, indexes, joins, stored procedures, CTE, ACID properties, and query optimization.'
  },
  {
    id: 'JavaScript',
    label: 'JavaScript',
    iconName: 'FileCode',
    description: 'Event loop, closures, promises, async/await, prototype chain, and ES6+ features.'
  },
  {
    id: 'Design Patterns',
    label: 'Design Patterns',
    iconName: 'Boxes',
    description: 'SOLID principles, Singleton, Factory Method, Repository, and architectural patterns.'
  },
  {
    id: 'React',
    label: 'React',
    iconName: 'Atom',
    description: 'Component lifecycle, hooks, virtual DOM, state management, and performance tuning.'
  },
  {
    id: 'Azure',
    label: 'Azure',
    iconName: 'Cloud',
    description: 'Azure App Services, Blob Storage, Key Vault, Azure Functions, and cloud hosting.'
  },
  {
    id: 'General',
    label: 'General',
    iconName: 'HelpCircle',
    description: 'System design, microservices, CI/CD, Git, and software engineering best practices.'
  }
];
