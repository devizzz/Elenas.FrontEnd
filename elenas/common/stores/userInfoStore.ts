import { UserInfo } from '../apis/types/user/UserInfo';
import { persist } from 'zustand/middleware';
import create from 'zustand/vanilla';

export type State = {
  user: {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
  } | null;
  access_token: string | null;
  getUserInfo: () => UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
};

export default create(
  persist<State>(
    (set, get) => ({
      user: null,
      access_token: null,
      setUserInfo: (userInfo: UserInfo) =>
        set({
          user: userInfo.user,
          access_token: userInfo.access_token
        }),
      getUserInfo: (): UserInfo => {
        return {
          access_token: get().access_token ?? '',
          user: get().user
        };
      },
      clearUserInfo: () =>
        set({ user: null, access_token: null })
    }),
    { name: 'userInfo', getStorage: () => localStorage }
  )
);
