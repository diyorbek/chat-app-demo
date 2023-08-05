import { api } from './api';

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function removeAuthToken() {
  localStorage.removeItem('auth_token');
}

interface SignInDetails {
  email: string;
  password: string;
}

export async function login(values: SignInDetails): Promise<{ token: string }> {
  const result = await api.post('api/auth/sign-in/', {
    json: values,
  });

  return result.json();
}
