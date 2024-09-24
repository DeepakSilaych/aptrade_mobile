import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
const USERNAME = 'username';
const PHONE = 'phone';

export const getToken = () => getItem<string>(TOKEN);
export const getUsername = () => getItem<string>(USERNAME);
export const getPhone = () => getItem<string>(PHONE);

export const setUser = (value: {username: string, phone: string, token: string}) => {
  setItem<string>(USERNAME, value.username);
  setItem<string>(PHONE, value.phone);
  setItem<string>(TOKEN, value.token);
}

export const removeUser = () => {
  removeItem(USERNAME);
  removeItem(PHONE);
  removeItem(TOKEN);
}