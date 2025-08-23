import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppStore {
  user: User | null;
  isLoading: boolean;
  totalEarned: number;
  activeSponsorships: number;
  hackathonsParticipated: number;
  recentActivity: Activity[];
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  updateStats: (stats: { totalEarned?: number; activeSponsorships?: number; hackathonsParticipated?: number }) => void;
  addActivity: (activity: Activity) => void;
}

interface Activity {
  id: string;
  type: 'sponsorship' | 'hackathon' | 'connection' | 'project';
  title: string;
  description: string;
  amount?: string;
  timestamp: string;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  isLoading: false,
  totalEarned: 12500,
  activeSponsorships: 3,
  hackathonsParticipated: 5,
  recentActivity: [
    {
      id: '1',
      type: 'sponsorship',
      title: 'Received Sponsorship from OpenSourceProject',
      description: '$500',
      amount: '$500',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'hackathon',
      title: 'Participated in AI Hackathon',
      description: 'Won 2nd Place',
      timestamp: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      type: 'connection',
      title: 'Connected GitHub Account',
      description: 'Successfully linked',
      timestamp: '2024-01-13T09:20:00Z'
    }
  ],
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  updateStats: (stats) => set((state) => ({ ...state, ...stats })),
  addActivity: (activity) => set((state) => ({
    recentActivity: [activity, ...state.recentActivity.slice(0, 4)]
  })),
}));