import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'USER_LOADED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
          const response = await api.get('/api/auth/me');
          dispatch({ type: 'USER_LOADED', payload: response.data.user });
        } catch (error) {
          console.error('Error loading user:', error);
          dispatch({ type: 'LOGIN_FAIL' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadUser();
  }, [state.token]);

  // Login user
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.post('/api/auth/login', { email, password });
      
      const { token, user } = response.data;
      console.log('Login response:', { token, user }); // Debug log
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
      toast.success('Login successful!');
      
      // Add delay to ensure state is updated
      setTimeout(() => {
        // Redirect based on role
        if (user.role === 'admin') {
          console.log('Redirecting to admin dashboard');
          navigate('/admin');
        } else if (user.role === 'farmer') {
          console.log('Redirecting to farmer dashboard');
          navigate('/farmer');
        } else {
          console.log('Unknown role, redirecting to home');
          navigate('/');
        }
      }, 100);
      
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAIL' });
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.post('/api/auth/register', userData);
      
      const { token, user } = response.data;
      console.log('Register response:', { token, user }); // Debug log
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
      toast.success('Registration successful! Please wait for admin approval.');
      
      // Add delay to ensure state is updated
      setTimeout(() => {
        // Redirect to farmer dashboard
        console.log('Redirecting to farmer dashboard after registration');
        navigate('/farmer');
      }, 100);
      
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: 'LOGIN_FAIL' });
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Logout user
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    delete api.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await api.put('/api/auth/profile', profileData);
      dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  };

  // Check if user is approved (for farmers)
  const isApproved = () => {
    return state.user?.isApproved || state.user?.role === 'admin';
  };

  // Check if user has specific role
  const hasRole = (role) => {
    console.log('Checking role:', role, 'User:', state.user); // Debug log
    return state.user?.role === role;
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    login,
    register,
    logout,
    updateProfile,
    isApproved,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
