import React, { ReactNode, createContext, useContext, useState } from 'react';
import { UserState } from './type/usertype';

type UserContextType = {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

type UserProviderProps = {
    children: ReactNode;
  };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserState>({ token: null, role: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}