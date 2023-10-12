const STORAGE_KEY = "USER_TOKEN";

const sessionAPI = {
  setToken: (token: string) => {
    sessionStorage.setItem(STORAGE_KEY, token);
  },

  getToken: (): string | null => {
    return sessionStorage.getItem(STORAGE_KEY);
  },

  removeToken: () => {
    sessionStorage.removeItem(STORAGE_KEY);
  }
};

export default sessionAPI;