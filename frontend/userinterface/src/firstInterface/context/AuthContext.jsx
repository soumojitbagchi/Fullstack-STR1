import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = decodeToken(token);
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({ id: payload.id, name: payload.user || payload.email, email: payload.email });
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const payload = decodeToken(token);
    setUser({ id: payload.id, name: payload.user || payload.email, email: payload.email });
  };

  const updateUser = ({ token, user: updatedUser }) => {
    if (token) {
      localStorage.setItem('token', token);
      const payload = decodeToken(token);
      if (payload) {
        setUser({ id: payload.id, name: payload.user || payload.email, email: payload.email });
        return;
      }
    }
    if (updatedUser) {
      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        name: updatedUser.name || updatedUser.user || prev?.name,
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


