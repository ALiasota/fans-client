import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, login, register } from '../services/auth';

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => void;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  );
  const navigate = useNavigate();
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUser = async () => {
    if (!token) return;
    try {
      const response = await fetchUserProfile(token);
      setUser(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        logout();
      }
      alert(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  const loginUser = async (email: string, password: string) => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await login(email, password);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      getUser();
      navigate('/profile');
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Password Error');
      return;
    }
    try {
      const response = await register(email, password);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      getUser();
      navigate('/profile');
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginUser, registerUser, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
