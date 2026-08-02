import { useState } from 'react';
import { useAuth } from '../firstInterface/auth/hooks/useAuth';
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
    auth.logoutUser();
  };

  const handleUpdateProfile = async ({ username, name, email }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await auth.updateProfile({ username, name, email });
      if (!result.success) {
        setError(result.message || 'Failed to update profile');
      }
      return result;
    } catch (err) {
      const msg = err.message || 'Failed to update profile';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user: auth.user,
    loading: auth.loading,
    handleLogin,
    handleSignup,
    handleLogout,
    handleUpdateProfile,
    updateUser: auth.updateUser,
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
};

