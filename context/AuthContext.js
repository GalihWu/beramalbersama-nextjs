'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getIsTokenValid } from '@/service/FetchData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setAuthToken(token);

    if (!token) {
      setIsChecking(false);
      return;
    }

    const validate = async () => {
      try {
        await getIsTokenValid();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    validate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        isAuthenticated,
        isChecking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
