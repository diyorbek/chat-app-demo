import { Options } from 'ky';
import { useMemo } from 'react';
import { useAuthToken } from '../contexts/AuthContext';
import { useFetch } from './api';

export interface User {
  id: number;
  name: string;
  avatar_url: string;
}

export function useActiveChats() {
  const { token } = useAuthToken();
  const options = useMemo(() => {
    const ops: Options = {};

    if (token) {
      ops.headers = new Headers({
        Authorization: `Token ${token}`,
      });
    }

    return ops;
  }, [token]);

  return useFetch<User[]>('active-chats', 'api/chats/active', options);
}
