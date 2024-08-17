import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await axios.get(`${apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    return error;
  }
};
