import { ArticleType } from '@/network/api/api-params-moudle';
import { create } from 'zustand';

interface Business {
  typeList: ArticleType[];
  shouldFetchData: boolean;
  setTypeList: (typeList: ArticleType[]) => void;
  setShouldFetchData: (shouldFetchData: boolean) => void;
}
export const useBusinessStore = create<Business>((set) => ({
  typeList: [],
  shouldFetchData: false,
  setTypeList: (typeList: ArticleType[]) => set(() => ({ typeList })),
  setShouldFetchData: (shouldFetchData: boolean) => set(() => ({ shouldFetchData })),
}));
