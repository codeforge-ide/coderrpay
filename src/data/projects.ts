export interface Project {
  id: string;
  name: string;
  description: string;
  author: string;
  avatar: string;
  stars: number;
  tags: string[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Awesome Project',
    description: 'A new framework for building web applications.',
    author: 'John Doe',
    avatar: '/path/to/avatar1.png',
    stars: 1500,
    tags: ['web', 'framework', 'javascript'],
  },
  {
    id: '2',
    name: 'Super Wallet',
    description: 'A secure and easy-to-use crypto wallet.',
    author: 'Jane Smith',
    avatar: '/path/to/avatar2.png',
    stars: 2500,
    tags: ['crypto', 'wallet', 'security'],
  },
  {
    id: '3',
    name: 'AI-Powered Search',
    description: 'A search engine that understands natural language.',
    author: 'Sam Wilson',
    avatar: '/path/to/avatar3.png',
    stars: 3500,
    tags: ['ai', 'search', 'nlp'],
  },
  {
    id: '4',
    name: 'Decentralized Social Media',
    description: 'A social media platform that is not controlled by any single entity.',
    author: 'Alice Johnson',
    avatar: '/path/to/avatar4.png',
    stars: 4500,
    tags: ['decentralized', 'social-media', 'blockchain'],
  },
  {
    id: '5',
    name: 'Open Source Game Engine',
    description: 'A game engine that is free and open source.',
    author: 'Bob Brown',
    avatar: '/path/to/avatar5.png',
    stars: 5500,
    tags: ['game-engine', 'open-source', 'gamedev'],
  },
];
