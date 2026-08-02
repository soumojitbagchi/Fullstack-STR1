import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loading, setLoading, login, updateUser, logout } = context;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });
  const loginUser = async ({email,user, password}) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email,user, password });
      const { token } = response.data;
      login(token);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }
  const registerUser = async ({email,user, password}) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', { email,user, password });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ username, name, email }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(
        '/user/update-profile',
        { username, name, email },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (response.data?.token) {
        updateUser({ token: response.data.token, user: response.data.user });
      }
      return { success: true, message: response.data?.message || 'Profile updated successfully', data: response.data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to update profile',
      };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    logout();
  };

  return { user, loading, setLoading, loginUser, registerUser, updateProfile, logoutUser, updateUser };
};