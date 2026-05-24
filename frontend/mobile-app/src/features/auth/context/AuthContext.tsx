import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/features/auth/storage/auth.storage';

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession(): Promise<void> {
      try {
        const storedToken = await getAuthToken();
        setToken(storedToken);
      } finally {
        setIsLoading(false);
      }
    }

    void loadSession();
  }, []);

  async function signIn(nextToken: string): Promise<void> {
    await saveAuthToken(nextToken);
    setToken(nextToken);
  }

  async function signOut(): Promise<void> {
    await removeAuthToken();
    setToken(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      signIn,
      signOut,
    }),
    [token, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}