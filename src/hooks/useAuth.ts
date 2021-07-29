import { useState } from 'react';

import { User } from '../interfaces/user.interface';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = ({ email }: { email: User['email'] }) => {
    const data: User = {
      name: 'gsk',
      id: '000',
      email,
    };

    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout } as const;
};

export default useAuth;
