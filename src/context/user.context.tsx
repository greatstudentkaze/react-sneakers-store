import { createContext, PropsWithChildren } from 'react';

import useAuth from '../hooks/useAuth';
import { User } from '../interfaces/user.interface';

export interface IUserContext {
  user: User | null,
  login: ({ email }: { email: User['email'] }) => void,
  logout: () => void,
}

const defaultValue = {
  user: null,
  login: () => {},
  logout: () => {},
};

interface UserContextProviderProps {}

export const UserContext = createContext<IUserContext>(defaultValue);

export const UserContextProvider = ({ children }: PropsWithChildren<UserContextProviderProps>): JSX.Element => {
  const { user, logout, login } = useAuth();

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  )
};
