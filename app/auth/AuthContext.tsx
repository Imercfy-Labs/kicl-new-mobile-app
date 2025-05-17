import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import * as api from '@/services/api';
import { secureStore } from '@/services/secureStore';

interface User {
  id: string;
  name: string;
  employeeId: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (loginId: string, password: string) => Promise<void>;
  logout: () => void;
  signup?: (data: { name: string; email: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const storedUser = await secureStore.getItem('user');
        const storedToken = await secureStore.getItem('token');
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored user:', error);
      }
    };

    loadStoredUser();
  }, []);

  const login = async (loginId: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.login(loginId, password);
      
      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const { token, user } = response.data;
        
        await secureStore.setItem('token', token);
        await secureStore.setItem('user', JSON.stringify(user));
        
        setUser(user);
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await secureStore.removeItem('token');
      await secureStore.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}