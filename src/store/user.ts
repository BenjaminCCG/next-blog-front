import { User } from '@/network/api/api-params-moudle';
import { create } from 'zustand';
import { persist} from 'zustand/middleware'
interface UserStore {
  userInfo: User;
  setUserInfo: (userInfo: User) => void;
}
export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: {},
      setUserInfo: (userInfo: User) => set(() => ({ userInfo })),
    }),
    {
      name: 'user-storage',
    }
  )
);
