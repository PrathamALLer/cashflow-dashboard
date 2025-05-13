// financialApi.tsx - Contains all financial data-related API functions
import { getToken } from './authApi';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Get cash flow projections
export const fetchCashFlowData = async (userDetails: any, settings: any) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/financial/cashflow-projections`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userDetails, settings }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch cash flow data');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch cash flow data error:', error);
    // For development, generate mock data if API fails
    return generateMockCashFlowData(userDetails, settings);
  }
};

// Get financial suggestions from AI
export const fetchFinancialSuggestions = async (userDetails: any, settings: any, cashFlowData: any, isPlanFailing: boolean) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const response = await fetch(`${API_URL}/financial/suggestions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userDetails, 
        settings, 
        cashFlowData, 
        isPlanFailing 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch financial suggestions');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch financial suggestions error:', error);
    // For development, return mock suggestions if API fails
    return getMockFinancialSuggestions(isPlanFailing);
  }
};

// Apply a financial suggestion
export const applyFinancialSuggestion = async (suggestionId: string) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_URL}/financial/apply-suggestion/${suggestionId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to apply suggestion');
    }

    return await response.json();
  } catch (error) {
    console.error('Apply suggestion error:', error);
    throw error;
  }
};

// Mock data functions for development
const generateMockCashFlowData = (userDetails: any, settings: any) => {
  const data = [];
  const currentAge = userDetails.age || 30;
  const retirementAge = userDetails.desired_retirement_age || 65;
  const lifeExpectancy = settings?.life_expectancy || 95;
  
  let pensionValue = userDetails.pension_starting_value || 50000;
  let isaValue = userDetails.isa_starting_value || 20000;
  let giaValue = userDetails.gia_starting_value || 10000;
  
  // Generate data for each year from current age to life expectancy
  for (let age = currentAge; age <= lifeExpectancy; age++) {
    // During accumulation phase
    if (age < retirementAge) {
      // Simple growth calculation
      const generalGrowth = Math.round((pensionValue + isaValue + giaValue) * 0.05);
      
      // Monthly surplus into investments
      const monthlySurplus = (userDetails.total_after_tax_monthly_income || 0) - 
                           ((userDetails.net_monthly_essential_expenses || 0) + 
                            (userDetails.net_monthly_non_essential_expenses || 0));
      
      const yearlyContribution = monthlySurplus * 12;
      
      // Split contributions based on tax efficiency
      const pensionContribution = Math.round(yearlyContribution * 0.5);
      const isaContribution = Math.round(yearlyContribution * 0.3);
      const giaContribution = Math.round(yearlyContribution * 0.2);
      
      // Update values
      pensionValue += pensionContribution + Math.round(pensionValue * 0.06);
      isaValue += isaContribution + Math.round(isaValue * 0.05);
      giaValue += giaContribution + Math.round(giaValue * 0.04);
      
      data.push({
        age,
        starting_value: pensionValue + isaValue + giaValue - generalGrowth - pensionContribution - isaContribution - giaContribution,
        pension_starting_value: pensionValue - pensionContribution - Math.round(pensionValue * 0.06),
        isa_starting_value: isaValue - isaContribution - Math.round(isaValue * 0.05),
        gia_starting_value: giaValue - giaContribution - Math.round(giaValue * 0.04),
        general_growth: generalGrowth,
        pension_money_in: pensionContribution,
        isa_contribution: isaContribution,
        gia_contribution: giaContribution,
        pension_ending_value: pensionValue,
        isa_ending_value: isaValue,
        gia_ending_value: giaValue,
        total_money_out: 0,
        isa_money_out: 0,
        pension_money_out: 0,
        gia_money_out: 0,
        decumulation_achieved_successfully: true,
        total_ending_value: pensionValue + isaValue + giaValue,
      });
    } 
    // Decumulation phase
    else {
      // Yearly withdrawal
      const yearlyWithdrawal = (userDetails.net_monthly_essential_expenses || 0) * 12 * (1 + (settings?.inflation_percentage || 0.02));
      
      // Withdraw from the most tax-efficient way
      let isaWithdrawal = Math.min(isaValue, yearlyWithdrawal * 0.4);
      let giaWithdrawal = Math.min(giaValue, yearlyWithdrawal * 0.2);
      let pensionWithdrawal = Math.min(pensionValue, yearlyWithdrawal - isaWithdrawal - giaWithdrawal);
      
      // Additional withdrawals if needed
      if (isaWithdrawal + giaWithdrawal + pensionWithdrawal < yearlyWithdrawal) {
        const remaining = yearlyWithdrawal - isaWithdrawal - giaWithdrawal - pensionWithdrawal;
        if (isaValue > isaWithdrawal) {
          const additional = Math.min(isaValue - isaWithdrawal, remaining);
          isaWithdrawal += additional;
        } else if (giaValue > giaWithdrawal) {
          const additional = Math.min(giaValue - giaWithdrawal, remaining);
          giaWithdrawal += additional;
        } else if (pensionValue > pensionWithdrawal) {
          const additional = Math.min(pensionValue - pensionWithdrawal, remaining);
          pensionWithdrawal += additional;
        }
      }
      
      // Update values
      pensionValue = Math.max(0, pensionValue - pensionWithdrawal + Math.round(pensionValue * 0.04));
      isaValue = Math.max(0, isaValue - isaWithdrawal + Math.round(isaValue * 0.04));
      giaValue = Math.max(0, giaValue - giaWithdrawal + Math.round(giaValue * 0.03));
      
      const totalWithdrawal = isaWithdrawal + giaWithdrawal + pensionWithdrawal;
      const decumulationAchieved = totalWithdrawal >= yearlyWithdrawal * 0.95;
      
      data.push({
        age,
        starting_value: pensionValue + isaValue + giaValue + pensionWithdrawal + isaWithdrawal + giaWithdrawal,
        pension_starting_value: pensionValue + pensionWithdrawal,
        isa_starting_value: isaValue + isaWithdrawal,
        gia_starting_value: giaValue + giaWithdrawal,
        general_growth: Math.round((pensionValue + isaValue + giaValue) * 0.04),
        pension_money_in: 0,
        isa_contribution: 0,
        gia_contribution: 0,
        pension_ending_value: pensionValue,
        isa_ending_value: isaValue,
        gia_ending_value: giaValue,
        total_money_out: totalWithdrawal,
        isa_money_out: isaWithdrawal,
        pension_money_out: pensionWithdrawal,
        gia_money_out: giaWithdrawal,
        decumulation_achieved_successfully: decumulationAchieved,
        total_ending_value: pensionValue + isaValue + giaValue,
      });
    }
  }
  
  return { data };
};

const getMockFinancialSuggestions = (isPlanFailing: boolean) => {
  if (isPlanFailing) {
    return {
      data: [
        {
          id: '1',
          title: 'Increase Pension Contributions',
          details: 'Increasing your monthly pension contributions by 5% could significantly improve your retirement outlook.',
          projected_impact: '+£150,000 at retirement',
          impact_level: 'high',
          applicable_to: 'settings',
          settings_changes: {
            pension_contribution_percentage: '+5',
          }
        },
        {
          id: '2',
          title: 'Reduce Monthly Expenses',
          details: 'Reducing your non-essential monthly expenses by £200 would allow you to save more towards retirement.',
          projected_impact: '+£100,000 over lifetime',
          impact_level: 'medium',
          applicable_to: 'user_details',
          user_detail_changes: {
            net_monthly_non_essential_expenses: '-200',
          }
        },
        {
          id: '3',
          title: 'Delay Retirement by 2 Years',
          details: 'Delaying your retirement by 2 years would give your investments more time to grow and reduce the withdrawal period.',
          projected_impact: '+£80,000 over lifetime',
          impact_level: 'high',
          applicable_to: 'user_details',
          user_detail_changes: {
            desired_retirement_age: '+2',
          }
        }
      ]
    };
  } else {
    return {
      data: [
        {
          id: '1',
          title: 'Optimize ISA Allocation',
          details: 'Increasing your ISA allocation would provide more tax-free growth and withdrawals in retirement.',
          projected_impact: '+£20,000 in tax savings',
          impact_level: 'medium',
          applicable_to: 'settings',
          settings_changes: {
            isa_allocation_percentage: '+5',
          }
        },
        {
          id: '2',
          title: 'Adjust Risk Profile',
          details: 'Your current risk profile is conservative. Considering your age, a slightly more aggressive approach could yield better returns.',
          projected_impact: '+£40,000 over lifetime',
          impact_level: 'medium',
          applicable_to: 'user_details',
          user_detail_changes: {
            risk_level: 'moderate',
          }
        }
      ]
    };
  }
}; 