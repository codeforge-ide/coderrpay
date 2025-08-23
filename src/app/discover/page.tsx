'use client';

import React, { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/data/projects';

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');

  const filteredProjects = mockProjects
    .filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stars - a.stars;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-current tracking-light text-[32px] font-bold leading-tight min-w-72">
          Discover Projects
        </p>
      </div>
      
      <div className="flex justify-between gap-4 mb-6 p-4">
        <input
          type="text"
          placeholder="Search Projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 rounded-lg border text-current bg-transparent"
          style={{ borderColor: 'var(--border-color)' }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-3 rounded-lg border text-current bg-transparent min-w-[120px]"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
        >
          <option value="stars">Sort by Stars</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
