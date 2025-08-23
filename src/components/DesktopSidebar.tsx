'use client';

import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Button,
  Box
} from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home,
  Code,
  MonetizationOn,
  RssFeed,
  EmojiEvents,
  Business,
  AccountTree,
  Login
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { getPageAction } from '@/utils/pageActions';

const drawerWidth = 320;

const navItems = [
  { text: 'Home', icon: Home, href: '/', requireAuth: false },
  { text: 'Feed', icon: RssFeed, href: '/feed', requireAuth: false },
  { text: 'Hackathons', icon: Code, href: '/hackathons', requireAuth: true },
  { text: 'Grants', icon: MonetizationOn, href: '/grants', requireAuth: true },
  { text: 'Bounties', icon: EmojiEvents, href: '/bounties', requireAuth: true },
  { text: 'Projects', icon: AccountTree, href: '/projects', requireAuth: true },
  { text: 'Organizations', icon: Business, href: '/organizations', requireAuth: true },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { isAuthenticated, setShowAuthDrawer } = useAuth();
  const pageAction = getPageAction(pathname);

  const handleProtectedNavigation = (item: typeof navItems[0]) => {
    if (item.requireAuth && !isAuthenticated) {
      setShowAuthDrawer(true);
      return;
    }
  };

  const handleActionClick = () => {
    if (!pageAction) return;
    
    // Handle different action types
    switch (pageAction.action) {
      case 'create-post':
        console.log('Open create post modal');
        break;
      case 'create-project':
        console.log('Open create project modal');
        break;
      case 'join-hackathon':
        console.log('Open join hackathon modal');
        break;
      case 'apply-grant':
        console.log('Open grant application modal');
        break;
      case 'create-bounty':
        console.log('Open create bounty modal');
        break;
      case 'create-organization':
        console.log('Open create organization modal');
        break;
      case 'compose-message':
        console.log('Open compose message modal');
        break;
      case 'add-skill':
        console.log('Open add skill modal');
        break;
      default:
        console.log('Unknown action:', pageAction.action);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { 
          width: drawerWidth,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '700px',
          p: 2,
        },
      }}
    >
      <Box>
        {/* Navigation List */}
        <List sx={{ p: 0 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            const needsAuth = item.requireAuth && !isAuthenticated;
            
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
                <ListItemButton
                  component={needsAuth ? 'div' : Link}
                  href={needsAuth ? undefined : item.href}
                  selected={isActive}
                  onClick={() => handleProtectedNavigation(item)}
                  sx={{
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    opacity: needsAuth ? 0.7 : 1,
                    cursor: 'pointer',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <IconComponent sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Dynamic Action Button */}
      {isAuthenticated && pageAction ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<pageAction.icon />}
          onClick={handleActionClick}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.015em',
          }}
        >
          {pageAction.label}
        </Button>
      ) : !isAuthenticated ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<Login />}
          onClick={() => setShowAuthDrawer(true)}
          sx={{
            py: 1.5,
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.015em',
          }}
        >
          Sign In
        </Button>
      ) : null}
    </Drawer>
  );
}