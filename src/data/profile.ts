import { Options } from 'ky';
import { useMemo } from 'react';
import { useAuthToken } from '../contexts/AuthContext';
import { useFetch } from './api';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  avatar_url: string;
  email: string;
}

export function useWhoIam() {
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

  return useFetch<User>('who-am-i', 'api/auth/who-am-i/', options);
}
