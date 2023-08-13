import { Options } from 'ky';
import { useMemo } from 'react';
import { useAuthToken } from '../contexts/AuthContext';
import { useFetch } from './API';

export interface User {
  id: number;
  name: string;
  avatar_url: string;
  email: string;
}

export function useWhoIAm() {
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
