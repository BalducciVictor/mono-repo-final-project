import { UserState } from "../types/usertypes";

export const TOKEN_STORAGE_KEY = "USER_TOKEN";
export const USER_STORAGE_KEY = 'USER_DATA';

const sessionAPI = {
  setToken: (token: string) => {
    sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
  },

  getToken: (): string | null => {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  },

  removeToken: () => {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  },
  
  setUser: (user: UserState) => {
    const userData = JSON.stringify(user);
    sessionStorage.setItem(USER_STORAGE_KEY, userData);
  },

  getUser: (): UserState | null => {
    const storedData = sessionStorage.getItem(USER_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  },

  removeUser: () => {
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }
};

export default sessionAPI;