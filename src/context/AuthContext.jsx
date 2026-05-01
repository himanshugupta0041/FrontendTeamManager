import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.user_id, email: payload.sub, role: payload.role });
      } catch (error) {
        console.error('Invalid token');
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      localStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      setUser({ id: response.user_id, email: response.email, role: response.role });
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      await apiSignup(userData);
      toast.success('Account created! Please login.');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
