// authApi.tsx - Contains all authentication-related API functions

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Store and retrieve JWT token
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const setToken = (token: string): void => {
  localStorage.setItem('auth_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Login with email and password
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/web-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenant_id: '1', // Static tenant ID
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    // Save token to localStorage
    setToken(data.data.token);
    return data.data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Login with Google
export const loginWithGoogle = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tenant_id: '1', // Static tenant ID
        token,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Google login failed');
    }

    const data = await response.json();
    // Save token to localStorage
    setToken(data.data.token);
    return data.data.user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// Logout
export const logout = (): void => {
  removeToken();
};

// Check auth status without making API call to /users/me
export const getUserProfile = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    // For now, just assume the token is valid without making an additional API call
    // This avoids making the invalid call to /users/me
    
    // In a real implementation, you might want to decode the JWT token locally
    // or make a call to a valid endpoint to verify the token
    
    return { valid: true };
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

// Mock login for development (no API call)
export const mockLogin = async (email: string, password: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock user data
      const user = {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
      };
      // Mock token
      const token = 'mock-jwt-token-for-development';
      setToken(token);
      resolve(user);
    }, 800); // Simulate API delay
  });
}; 