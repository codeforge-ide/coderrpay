'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={project.avatar}
            alt={project.author}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="div">
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {project.author}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton size="small">
            <StarBorderIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {project.stars}
          </Typography>
        </Box>
        <Box>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
