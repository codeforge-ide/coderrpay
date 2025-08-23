'use client';

import { Fab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getPageAction } from '@/utils/pageActions';

export default function MobileActionFab() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const pageAction = getPageAction(pathname);

  // Only show on mobile and when authenticated and there's a relevant action
  if (!isMobile || !isAuthenticated || !pageAction) {
    return null;
  }

  const handleActionClick = () => {
    // Handle different action types (same as desktop)
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
    <Fab
      color="primary"
      onClick={handleActionClick}
      sx={{
        position: 'fixed',
        bottom: 80, // Above bottom navigation (64px height + 16px margin)
        right: 16,
        zIndex: 1000,
      }}
    >
      <pageAction.icon />
    </Fab>
  );
}