import axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import { create } from 'zustand';

import { createSelectors } from '../utils';
import { getPhone, getToken, getUsername,removeUser, setUser } from './utils';

interface AuthState {
  username: string | null;
  phone: string | null;
  token: string | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: {username: string, phone: string, token: string}) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  username: null,
  phone: null,
  token: null,
  signIn: ({username, phone, token}) => {
    setUser({username, phone, token});
    set({ status: 'signIn', username, phone, token });
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  },
  signOut: () => {
    removeUser();
    set({ status: 'signOut', token: null, username: null, phone: null });
    axios.defaults.headers.common['Authorization'] = '';
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const username = getUsername();
      const phone = getPhone();
      if (userToken !== null) {
        get().signIn({username, phone, token: userToken});
      } else {
        get().signOut();
      }
      SplashScreen.hideAsync();
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = ({username,phone, token}: {username: string, phone: string, token: string}) => _useAuth.getState().signIn({username, phone, token});
export const hydrateAuth = () => _useAuth.getState().hydrate();
