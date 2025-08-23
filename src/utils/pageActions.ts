import { 
  Create, 
  EmojiEvents, 
  Code, 
  MonetizationOn, 
  AccountTree, 
  Business,
  PostAdd,
  NoteAdd
} from '@mui/icons-material';

export interface PageAction {
  icon: any;
  label: string;
  action: string;
  description?: string;
}

export const pageActions: Record<string, PageAction | null> = {
  '/': {
    icon: PostAdd,
    label: 'New Post',
    action: 'create-post',
    description: 'Share an update with the community'
  },
  '/feed': {
    icon: PostAdd,
    label: 'New Post',
    action: 'create-post',
    description: 'Share something with the community'
  },
  '/projects': {
    icon: AccountTree,
    label: 'New Project',
    action: 'create-project',
    description: 'Start a new open source project'
  },
  '/hackathons': {
    icon: Code,
    label: 'Join Hackathon',
    action: 'join-hackathon',
    description: 'Participate in an upcoming hackathon'
  },
  '/grants': {
    icon: MonetizationOn,
    label: 'Apply for Grant',
    action: 'apply-grant',
    description: 'Submit a grant application'
  },
  '/bounties': {
    icon: EmojiEvents,
    label: 'Create Bounty',
    action: 'create-bounty',
    description: 'Post a new bounty for developers'
  },
  '/organizations': {
    icon: Business,
    label: 'New Organization',
    action: 'create-organization',
    description: 'Create or join an organization'
  },
  '/messages': {
    icon: Create,
    label: 'New Message',
    action: 'compose-message',
    description: 'Send a direct message'
  },
  '/wallet': null, // No action for wallet page
  '/settings': null, // No action for settings page
  '/profile': {
    icon: NoteAdd,
    label: 'Add Skill',
    action: 'add-skill',
    description: 'Add a new skill to your profile'
  }
};

export function getPageAction(pathname: string): PageAction | null {
  return pageActions[pathname] || null;
}