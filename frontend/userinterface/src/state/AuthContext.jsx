import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Decode JWT payload without any library.
 * Returns the payload object or null on failure.
 */
function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

/**
 * AuthProvider — owns user state and token lifecycle.
 *
 * Responsibilities:
 *  - Restore session from localStorage on mount
 *  - Provide login(token) to persist + decode a new JWT
 *  - Provide logout() to clear session
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage for existing token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ id: payload.id, name: payload.user || payload.email });
      } else {
        localStorage.removeItem('token'); // expired
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const payload = decodeToken(token);
    setUser({ id: payload.id, name: payload.user || payload.email });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading,setLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth — low-level hook to access auth state directly.
 * For orchestrated actions (login flow, signup flow), use useAuthActions from hooks/.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
