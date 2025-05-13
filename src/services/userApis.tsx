import axios from 'axios';
import { getToken } from './authApi';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchUserDetails = async () => {
  try {
    const authToken = getToken();
    if (!authToken) {
      throw new Error('Not authenticated');
    }

    // Fetch profile data
    const profileResponse = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const {
      RiskProfile: { name: risk_profile_name },
      first_name: name,
    } = profileResponse.data.data;

    // Fetch income data
    const incomeResponse = await axios.get(`${API_URL}/persons/income`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const incomes = incomeResponse.data.data;
    const { bookvalue: monthly_income } = incomes.find((income: any) => income.source === "Monthly Salary");

    // Fetch expenses data
    const expensesResponse = await axios.get(`${API_URL}/persons/expenses`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const expenses = expensesResponse.data.data;
    const { bookvalue: total_expenses } = expenses.find((expense: any) => expense.source === "Monthly Expense");

    // Fetch assets data
    const assetsResponse = await axios.get(`${API_URL}/accounts/assets`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const assets = assetsResponse.data.data;
    console.log('asset response', assetsResponse.data.data);
    const isaAsset = assets.find((asset: any) => asset.name === "isa");
    const pensionAsset = assets.find((asset: any) => asset.name === "pension");
    const giaAsset = assets.find((asset: any) => asset.name === "gia");
    const isa_starting_value = isaAsset ? isaAsset.value : 0;
    const pension_starting_value = pensionAsset ? pensionAsset.value : 0;
    const gia_starting_value = giaAsset ? giaAsset.value : 0;

    console.table({
      monthly_income, 
      total_expenses, 
      isa_starting_value, 
      pension_starting_value, 
      gia_starting_value
    });
    
    return {
      name,
      risk_profile: risk_profile_name,
      total_after_tax_monthly_income: monthly_income,
      total_expenses: total_expenses,
      isa_starting_value: isa_starting_value,
      pension_starting_value: pension_starting_value,
      gia_starting_value: gia_starting_value,
    };
  } catch (error) {
    console.error('Error fetching user details:', error);
    // Return mock data for development or when the API fails
    return getMockUserDetails();
  }
};

// Mock data for development
const getMockUserDetails = () => {
  return {
    name: 'John Smith',
    risk_profile: 'Balanced',
    total_after_tax_monthly_income: 5000,
    total_expenses: 3000,
    isa_starting_value: 20000,
    pension_starting_value: 50000,
    gia_starting_value: 10000,
  };
}; 