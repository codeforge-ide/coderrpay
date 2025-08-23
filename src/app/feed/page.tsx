'use client';

import React, { useState } from 'react';
import { TextField, InputAdornment, Tabs, Tab, Box, Avatar, Typography, IconButton, Paper } from '@mui/material';
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

const mockPosts = [
  {
    id: 1,
    user: {
      name: 'Alex Turner',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-wG8niXwATOKH8c8e0L6Z6onDE4V6DFYGiI9OELbyN_uXyClx5YwmO-WJl9QwbY5b6KNBuZ382wMksJCdLLrjY_7VBXGxY2CnzRL4JPty7eULRWO-rTrcBuPqmv4Mfazkqn7ee0DNXc97Rw0XgYUBfwki0t0WlKU18RXvRbrC_wInAuTDNcSqAHsRAA8eaTdnqYZm6TNJO0vKuTmNlltDSsqynD6N4nPOqZdzEWRrHpPjjT7UrF1XAAVuJ_ODWs92aWnjucLHCDw',
    },
    content: 'Just finished a new project using React and Node.js! Check it out on my GitHub: github.com/alex-turner/my-project',
    timestamp: '2h',
    likes: 23,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmrTHFd3QWFTU1dR2RHhA__z0Kg6qDwGB4WU62JGAqkPX_6fWwwKv37Mui2F0RpH2ta8fSEJbDOb6xPqidVMl7kdSQc1km8ozT5IRxWPBUigRbdgINBbCaGcZiptoSkRzXLYpD69GE4UpdUNG3zwVxju0oHYXY63YJ9UMgK1Zmo3M_1fkYlvD5JD7SRhyDWeUJq_eKPrcc7NPjDLtHry1Ak278saFeGr7hiIco_SnrHODwE7ii3avGw-HDcZa4rEICfSJblgJlJnE',
    },
    content: 'Looking for collaborators on an open-source project focused on AI and machine learning. DM me if interested!',
    timestamp: '4h',
    likes: 15,
    comments: 3,
    shares: 1,
  },
  {
    id: 3,
    user: {
      name: 'David Lee',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo39pku9xc0Jki8dEnB0uLbPCczZPdVDvKEdw07VHnO86koeeCXKePCV_DyBmp7lYihaiqWcqGYAneOG6Maz-1D7J0XMh4wtzc1YboWfCTtSa9RzfAvmS1uPiUK6u0mvX1sKn_RUmmluK8G29K0IiXwjEwo1k9jVyCz2uQH0lc99n4XrTEiV52sTynWkrTeEa67X99aRPw_2aSLf-ncI7xucExigK_7TiJ-d-2YJ4XynJX_KwqF-i1huGaC-aUJxA0J6w0N5RdhvA',
    },
    content: 'Excited to announce that I\'ll be speaking at the upcoming DevCon conference! Topic: Building Scalable Web Applications.',
    timestamp: '6h',
    likes: 30,
    comments: 8,
    shares: 4,
  },
  {
    id: 4,
    user: {
      name: 'Emily White',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9m4gK6XfTNHADJ-L-VhR1nGWqsLB1nqomtmVLreTdkbGzERpYFlYkMy06AfN3n7Mw8h8l4B9b4hBX2Je9CmWVsNteeNi9WHa4njxkfQQbFaR6aYQm3piXsPPQ9XQwmSLHA2CzX6FiTlCKu2Ekp8SVgCCrLzt29XX2wSfluXPc7suC1v4aLU9o3Fcm0OClTF4j2WMVfce_-cuFbV0RA53kt91JU7cZuBL_vGOxuoTPUoOfhyO812tTSOD4mE-uGBWWZn-PgzJUpZI',
    },
    content: 'Just launched my personal portfolio website! Built with Next.js and Tailwind CSS. Feedback is welcome!',
    timestamp: '8h',
    likes: 18,
    comments: 6,
    shares: 2,
  },
  {
    id: 5,
    user: {
      name: 'Mark Johnson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUwZcmfrDoXPPI6pP440ngoi3YLEs1-xNGlrmI3kx-R_R8Ex7oXRGE-GVyLTz6ZaIk7JjjfTfD3DWD3uDCQ4Bspjet_TcNDE7JffUb5jC1MPHr8eC_e7BW-NYGN6GACGdZTz4xiPZTcQEIZFSnI_fmi7rT-6AzB3iQ0nrDpB2oZW3XaswgEsoPJbJMf4hb28uPJ_Ec_wUx9SdbnkAcHBP1_BYisdIJyB5rDlYmVcv0Bj9z-9JKb5JyauaxhG27BP91yXzsBcHlD08',
    },
    content: 'Participating in the Global Hackathon this weekend! Working on a project to improve accessibility in web applications. Wish me luck!',
    timestamp: '10h',
    likes: 25,
    comments: 7,
    shares: 3,
  },
];

function PostCard({ post }: { post: typeof mockPosts[0] }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        bgcolor: 'transparent', 
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderRadius: 0,
        p: 2
      }}
    >
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
    </Paper>
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

        <Box>
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={mainTab} index={1}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search Projects"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                }
              }}
            />
            <Box sx={{ minWidth: 120 }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.23)',
                  backgroundColor: 'var(--card-bg)',
                  color: 'inherit',
                  fontSize: '1rem',
                }}
              >
                <option value="stars">Sort by Stars</option>
                <option value="name">Sort by Name</option>
              </select>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 2
          }}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
}