import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('salesai_auth');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    const userData = res.data.user;
    setUser(userData);
    localStorage.setItem('salesai_auth', JSON.stringify(userData));
    return userData;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('salesai_auth');
  };

  const isAdmin = user?.Role === 'admin';
  const isUser = user?.Role === 'user';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, isUser }}>
      {children}
    </AuthContext.Provider>
  );
};
