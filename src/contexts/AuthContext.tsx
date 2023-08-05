import { ReactNode, createContext, useContext, useState } from 'react';

const defaultValues: {
  token: string | null;
  saveToken: (token: string) => void;
} = {
  token: localStorage.getItem('auth_token'),
  saveToken: () => void 0,
};

const AuthTokenContext = createContext(defaultValues);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthToken() {
  return useContext(AuthTokenContext);
}

export function AuthTokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(defaultValues.token);

  const saveToken = (token: string) => {
    localStorage.setItem('auth_token', token);
    setToken(token);
  };

  return (
    <AuthTokenContext.Provider value={{ token, saveToken }}>
      {children}
    </AuthTokenContext.Provider>
  );
}
