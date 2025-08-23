'use client';

import React from 'react';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div 
      className="flex flex-col h-full rounded-lg p-6 transition-all hover:scale-105 cursor-pointer"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="flex items-center mb-4">
        <img
          src={project.avatar}
          alt={project.author}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="text-current text-base font-bold leading-tight">
            {project.name}
          </h3>
          <p className="text-current/70 text-sm font-normal leading-normal">
            by {project.author}
          </p>
        </div>
      </div>
      
      <p className="text-current/70 text-sm font-normal leading-normal mb-4 flex-1">
        {project.description}
      </p>
      
      <div className="flex items-center mb-4">
        <svg className="w-4 h-4 mr-1 text-current/70" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-current/70 text-sm">
          {project.stars}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs rounded-full text-current/70"
            style={{ backgroundColor: 'var(--border-color)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
