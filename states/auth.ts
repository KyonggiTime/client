import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

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
    effects: [ persistAtom ],
});

export const useAuth = () => useRecoilValue(authState);
