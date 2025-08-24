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
  totalEarned: 0,
  activeSponsorships: 0,
  hackathonsParticipated: 0,
  recentActivity: [],
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  updateStats: (stats) => set((state) => ({ ...state, ...stats })),
  addActivity: (activity) => set((state) => ({
    recentActivity: [activity, ...state.recentActivity.slice(0, 4)]
  })),
}));