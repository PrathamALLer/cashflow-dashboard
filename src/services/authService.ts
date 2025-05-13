import api from './api';

// Mock user for development testing
const MOCK_USER = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  token: 'mock-jwt-token-for-development',
};

// Helper functions for token management
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Authentication service functions
const authService = {
  // Login with email and password
  async loginWithEmail(email: string, password: string) {
    try {
      const response = await api.post('/auth/web-login', {
        tenant_id: '1', // Static tenant ID
        email,
        password,
      });
      
      const { token, user } = response.data.data;
      setToken(token);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Login with Google
  async loginWithGoogle(token: string) {
    try {
      const response = await api.post('/auth/google-login', {
        tenant_id: '1', // Static tenant ID
        token,
      });
      
      const { token: authToken, user } = response.data.data;
      setToken(authToken);
      return user;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  },

  // Use mock login for development if needed
  async mockLogin(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          setToken(MOCK_USER.token);
          resolve(MOCK_USER);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800); // Simulate API delay
    });
  },

  // Logout user
  logout() {
    removeToken();
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!getToken();
  },

  // Get current user information from token
  async getCurrentUser() {
    try {
      if (!this.isAuthenticated()) {
        return null;
      }
      
      // In a real app, you would verify the token with the server
      // and get the current user's data
      const response = await api.get('/users/me');
      return response.data.user;
    } catch (error) {
      console.error('Failed to get current user:', error);
      // If there's an error (like token expired), clear the token
      this.logout();
      return null;
    }
  },

  // Get the auth token
  getToken,
};

export default authService; 