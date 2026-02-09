export type InvestmentProfile = 'conservative' | 'balanced' | 'dynamic';
export type InvestmentGoal = 'retirement' | 'housing' | 'children' | 'wealth';
export type CurrentSituation = 'cash' | 'deposits' | 'investor';

export interface UserInput {
  age: number;
  initialInvestment: number;
  monthlyContribution: number;
  profile: InvestmentProfile;
  // Lead Gen Fields
  name: string;
  email: string;
  phone: string;
  goal: InvestmentGoal;
  situation: CurrentSituation;
}

export interface SimulationData {
  year: number;
  age: number;
  investedAmount: number; // Total cash out of pocket
  projectedValueConservative: number; // Traditional savings/deposits
  projectedValueOptimized: number; // Contigo Futuro
  totalProfit: number; // Optimized Value - Invested Amount
}

export enum Step {
  INTRO = 'INTRO',
  INPUTS = 'INPUTS',
  ANALYSIS = 'ANALYSIS', 
  GATE = 'GATE', // Lead Qual Form
  RESULTS = 'RESULTS'
}