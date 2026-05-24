import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getCurrentUser } from '@/features/auth/services/auth.service';

import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from '@/features/auth/storage/auth.storage';

import type { AuthUser } from '@/features/auth/types/auth.types';

type AuthContextValue = {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(async (): Promise<void> => {
    await removeAuthToken();

    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async (): Promise<void> => {
    if (!token) {
      await clearSession();
      return;
    }

    try {
      const currentUser = await getCurrentUser(token);

      setUser(currentUser);
    } catch {
      await clearSession();
    }
  }, [token, clearSession]);

  useEffect(() => {
    async function loadSession(): Promise<void> {
      try {
        const storedToken = await getAuthToken();

        if (!storedToken) {
          return;
        }

        const currentUser = await getCurrentUser(storedToken);

        setToken(storedToken);
        setUser(currentUser);
      } catch {
        await clearSession();
      } finally {
        setIsLoading(false);
      }
    }

    void loadSession();
  }, [clearSession]);

  const signIn = useCallback(async (nextToken: string): Promise<void> => {
    const currentUser = await getCurrentUser(nextToken);

    await saveAuthToken(nextToken);

    setToken(nextToken);
    setUser(currentUser);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    await clearSession();
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      signIn,
      signOut,
      refreshUser,
    }),
    [
      token,
      user,
      isLoading,
      signIn,
      signOut,
      refreshUser,
    ],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}