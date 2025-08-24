'use client';

import React, { useState } from 'react';
import { TextField, InputAdornment, Tabs, Tab, Box, Avatar, Typography, IconButton, Card, CardContent } from '@mui/material';
import { Search, Favorite, ChatBubbleOutline, Send } from '@mui/icons-material';
import ProjectCard from '@/components/ProjectCard';
import { mockProjects } from '@/data/projects';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`feed-tabpanel-${index}`}
      aria-labelledby={`feed-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function PostCard({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
          <Avatar
            src={post.user.avatar}
            sx={{ width: 40, height: 40 }}
          />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                {post.user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {post.timestamp}
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                lineHeight: 1.4,
                fontSize: '0.875rem'
              }}
            >
              {post.content}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 1, ml: 6.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={handleLike}
              sx={{
                color: liked ? 'error.main' : 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Favorite sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {likeCount}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <ChatBubbleOutline sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography 
              variant="caption"
              sx={{ 
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {post.comments}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'action.hover' }
              }}
            >
              <Send sx={{ fontSize: 20 }} />
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {post.shares}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function FeedPage() {
  const [mainTab, setMainTab] = useState(0);
  const [feedTab, setFeedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars');

  const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setMainTab(newValue);
  };

  const handleFeedTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setFeedTab(newValue);
  };

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
    <Box sx={{ maxWidth: 960, flex: 1 }}>
      <Box sx={{ px: 2, py: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'action.selected',
              borderRadius: 1.5,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }
          }}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            }
          }}
        />
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Tabs 
          value={mainTab} 
          onChange={handleMainTabChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'white',
              height: '3px',
            }
          }}
        >
          <Tab 
            label="Feed" 
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 0,
              mr: 4,
              color: mainTab === 0 ? 'text.primary' : 'text.secondary',
              '&.Mui-selected': {
                color: 'text.primary',
              }
            }} 
          />
          <Tab 
            label="Discover" 
            sx={{ 
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 0,
              color: mainTab === 1 ? 'text.primary' : 'text.secondary',
              '&.Mui-selected': {
                color: 'text.primary',
              }
            }} 
          />
        </Tabs>
      </Box>

      <TabPanel value={mainTab} index={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs 
            value={feedTab} 
            onChange={handleFeedTabChange}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: 'white',
                height: '3px',
              }
            }}
          >
            <Tab 
              label="For you" 
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minWidth: 'auto',
                px: 0,
                mr: 4,
                color: feedTab === 0 ? 'text.primary' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                }
              }} 
            />
            <Tab 
              label="Following" 
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minWidth: 'auto',
                px: 0,
                mr: 4,
                color: feedTab === 1 ? 'text.primary' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                }
              }} 
            />
            <Tab 
              label="Web3" 
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                minWidth: 'auto',
                px: 0,
                color: feedTab === 2 ? 'text.primary' : 'text.secondary',
                '&.Mui-selected': {
                  color: 'text.primary',
                }
              }} 
            />
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'text.secondary' }}>No posts in your feed yet.</Typography>
        </Box>
      </TabPanel>

      <TabPanel value={mainTab} index={1}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: 'text.secondary' }}>No projects to discover yet.</Typography>
        </Box>
      </TabPanel>
    </Box>
  );
}