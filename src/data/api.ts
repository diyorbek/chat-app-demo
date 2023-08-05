import ky, { Options } from 'ky';

import { useQuery } from 'react-query';

export const ROOT_URL = 'https://example.com/';

export const api = ky.extend({
  prefixUrl: ROOT_URL,
});

export function useFetch<T>(key: string, url: string, options?: Options) {
  const data = useQuery<T>({
    queryKey: key,
    queryFn: () => api.get(url, options).json(),
  });

  return data;
}
