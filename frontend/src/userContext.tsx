import React, { ReactNode, createContext, useContext, useState } from 'react';
import { UserState } from './types/usertypes';
import sessionAPI, { USER_STORAGE_KEY } from './services/sessionStorageAPI';

type UserContextType = {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
};

type UserProviderProps = {
    children: ReactNode;
  };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const storedData = sessionStorage.getItem(USER_STORAGE_KEY);
  const initialUserState: UserState = storedData 
    ? JSON.parse(storedData) 
    : { role: null, id: null, companyId: null, currentChapterId: null, currentChapterStepId: null, email: null, firstName: null, lastName: null, validatedChapterId: null };
  
  const [user, setUser] = useState<UserState>(initialUserState);

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