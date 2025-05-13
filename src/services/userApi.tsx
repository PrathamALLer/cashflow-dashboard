// userApi.tsx - Contains all user data-related API functions
import { getToken } from './authApi';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Get user details from API
export const fetchUserDetails = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/details`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user details');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch user details error:', error);
    // For development, return mock data if API fails
    return getMockUserDetails();
  }
};

// Update user details
export const updateUserDetails = async (userData: any) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/details`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user details');
    }

    return await response.json();
  } catch (error) {
    console.error('Update user details error:', error);
    throw error;
  }
};

// Update user settings
export const updateUserSettings = async (settingsData: any) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settingsData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update settings');
    }

    return await response.json();
  } catch (error) {
    console.error('Update settings error:', error);
    throw error;
  }
};

// Get user financial events
export const fetchFinancialEvents = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/users/financial-events`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch financial events');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch financial events error:', error);
    // For development, return mock data if API fails
    return getMockFinancialEvents();
  }
};

// Mock data functions for development
const getMockUserDetails = () => {
  return {
    data: {
      id: '1',
      name: 'John Smith',
      age: 35,
      desired_retirement_age: 60,
      total_after_tax_monthly_income: 5000,
      net_monthly_essential_expenses: 2000,
      net_monthly_non_essential_expenses: 1000,
      pension_starting_value: 50000,
      isa_starting_value: 20000,
      gia_starting_value: 10000,
      risk_level: 'moderate',
    }
  };
};

const getMockFinancialEvents = () => {
  return {
    data: [
      {
        id: '1',
        type: 'income',
        description: 'Salary Increase',
        amount: 500,
        start_age: 36,
        end_age: 65
      },
      {
        id: '2',
        type: 'expense',
        description: 'Mortgage Payment',
        amount: -1200,
        start_age: 35,
        end_age: 65
      },
      {
        id: '3',
        type: 'one-time',
        description: 'Inheritance',
        amount: 50000,
        start_age: 45,
        end_age: 45
      }
    ]
  };
}; 