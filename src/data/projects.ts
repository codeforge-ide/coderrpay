export interface Project {
  id: string;
  name: string;
  description: string;
  author: string;
  avatar: string;
  stars: number;
  tags: string[];
}

export const mockProjects: Project[] = [];
