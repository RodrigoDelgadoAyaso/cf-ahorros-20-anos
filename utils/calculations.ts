import { UserInput, SimulationData } from '../types';

export const calculateProjection = (input: UserInput): SimulationData[] => {
  const yearsToSimulate = 65 - input.age > 10 ? 65 - input.age : 20; // Up to retirement or 20 years min
  const data: SimulationData[] = [];

  let currentInvested = input.initialInvestment; // Cash out of pocket
  let currentValConservative = input.initialInvestment;
  let currentValOptimized = input.initialInvestment;
  
  // Determine rate based on selected profile for the "Optimized" path
  const optimizedRate = input.profile === 'conservative' ? 0.035 : 
                        input.profile === 'balanced' ? 0.055 : 
                        0.08; // Slightly more aggressive for "Dynamic" sales pitch

  const traditionalRate = 0.02; // Benchmark: Standard inflation/low deposit

  for (let i = 0; i <= yearsToSimulate; i++) {
    const age = input.age + i;
    
    data.push({
      year: new Date().getFullYear() + i,
      age,
      investedAmount: Math.round(currentInvested),
      projectedValueConservative: Math.round(currentValConservative),
      projectedValueOptimized: Math.round(currentValOptimized),
      totalProfit: Math.round(currentValOptimized - currentInvested)
    });

    // Advance to next year
    const annualContribution = input.monthlyContribution * 12;
    
    currentInvested += annualContribution;
    
    // Compound interest formula application
    currentValConservative = (currentValConservative + annualContribution) * (1 + traditionalRate);
    currentValOptimized = (currentValOptimized + annualContribution) * (1 + optimizedRate);
  }

  return data;
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
};

export const formatNumber = (val: number) => {
  return new Intl.NumberFormat('es-ES').format(val);
};