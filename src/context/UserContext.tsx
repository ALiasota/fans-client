import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

interface User {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => void;
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

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        logout();
      }
      alert(error.response?.data?.message || error.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token, fetchUserProfile]);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      fetchUserProfile();
      navigate('/profile');
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const register = async (
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
      const response = await axios.post(`${apiUrl}/auth/register`, {
        email,
        password,
        confirmPassword,
      });
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
      fetchUserProfile();
      navigate('/profile');
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, fetchUserProfile }}
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
