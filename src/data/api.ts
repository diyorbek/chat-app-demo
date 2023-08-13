import ky, { Options } from 'ky';
import { useQuery } from 'react-query';

const API_URL =
  import.meta.env.APP_MODE === 'production'
    ? import.meta.env.VITE_PRODUCTION_API_URL
    : import.meta.env.VITE_STAGING_API_URL; // 'development' and 'staging' mode both makes requests to staging API

export const API = ky.create({
  prefixUrl: API_URL,
});

export function useFetch<T>(key: string, url: string, options?: Options) {
  const data = useQuery<T>({
    queryKey: key,
    queryFn: () => API.get(url, options).json(),
  });

  return data;
}
