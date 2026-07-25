import { useState } from 'react';
import { useAuth } from '../firstInterface/context/AuthContext';
import { loginUser, registerUser } from '../api/authApi';

export const useAuthActions = () => {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      auth.login(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (user, email, password) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const data = await registerUser(user, email, password);
      auth.login(data.token);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Signup failed');
      return { success: false };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  return {
    user: auth.user,
    loading: auth.loading,
    handleLogin,
    handleSignup,
    handleLogout,
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
};
