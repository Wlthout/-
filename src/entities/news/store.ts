import { create } from "zustand";
import { NewsType } from "../../shared/api/types.ts";
import { devtools } from "zustand/middleware";

type UseNewsStoreState = {
  news?: NewsType[];
};
type UseNewsStoreActions = {
  setNews: (news: NewsType[]) => void;
};
type UseNewsStoreType = UseNewsStoreState & UseNewsStoreActions;

export const useNewsStore = create<UseNewsStoreType>()(
  devtools((set) => ({
    news: undefined,
    setNews: (news) =>
      set({
        news,
      }),
  })),
);
