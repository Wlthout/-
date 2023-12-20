import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UserInfoType } from "../../shared/api/types.ts";

type UseUserInfoStoreState = {
  isLoggedIn: boolean;
  userInfo?: UserInfoType;
};
type UseUserInfoStoreActions = {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserInfo: (userInfo: UserInfoType) => void;
};

type UseUserInfoStoreType = UseUserInfoStoreState & UseUserInfoStoreActions;

export const useUserInfoStore = create<UseUserInfoStoreType>()(
  devtools((set) => ({
    isLoggedIn: false,
    userInfo: undefined,
    setIsLoggedIn: (isLoggedIn) =>
      set({
        isLoggedIn,
      }),
    setUserInfo: (userInfo) =>
      set({
        userInfo,
      }),
  })),
);
