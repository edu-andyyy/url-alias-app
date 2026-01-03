import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { isAuthenticated, getUsername, logout as apiLogout, login as apiLogin } from '../api';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());
  const [username, setUsername] = useState<string | null>(() => getUsername());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check auth status on mount
    const authStatus = isAuthenticated();
    const storedUsername = getUsername();
    setIsLoggedIn(authStatus);
    setUsername(storedUsername);
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    await apiLogin(username, password);
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    apiLogout();
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
