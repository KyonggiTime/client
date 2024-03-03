import { atom, useRecoilValue } from 'recoil';

export interface Auth {
  isLoggedIn: boolean;
  token: string | null;
  email: string | null;
}

export const authState = atom<any>({
    key: 'Auth',
    default: {
        isLoggedIn: false,
        token: null,
    },
});

export const useAuth = () => useRecoilValue(authState);
