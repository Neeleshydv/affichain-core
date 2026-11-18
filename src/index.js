/**
 * @fileoverview Affi-Chain Core Financial & Mathematical Engine
 * @version 1.0.0
 * @license MIT
 * @see https://www.affichain.com
 */

/**
 * Calculates standard Fixed-Rate Mortgage Principal and Interest (P&I) plus PITI components.
 * Formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
 */
export function calculateMortgagePITI({
  homePrice = 400000,
  downPayment = 80000,
  annualInterestRate = 6.75,
  loanTermYears = 30,
  annualPropertyTax = 4800,
  annualHomeInsurance = 1400,
  monthlyPMI = 0
} = {}) {
  const principal = Math.max(0, homePrice - downPayment);
  const monthlyRate = (annualInterestRate / 100) / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPI = 0;
  if (monthlyRate === 0) {
    monthlyPI = principal / totalMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPI = principal * ((monthlyRate * factor) / (factor - 1));
  }

  const monthlyTax = annualPropertyTax / 12;
  const monthlyInsurance = annualHomeInsurance / 12;
  const totalMonthlyPITI = monthlyPI + monthlyTax + monthlyInsurance + monthlyPMI;
  const totalLifetimeCost = (monthlyPI * totalMonths) + (monthlyTax * totalMonths) + (monthlyInsurance * totalMonths);
  const totalInterest = (monthlyPI * totalMonths) - principal;

  return {
    principalLoanAmount: Number(principal.toFixed(2)),
    monthlyPrincipalAndInterest: Number(monthlyPI.toFixed(2)),
    monthlyPropertyTax: Number(monthlyTax.toFixed(2)),
    monthlyHomeInsurance: Number(monthlyInsurance.toFixed(2)),
    monthlyPMI: Number(monthlyPMI.toFixed(2)),
    totalMonthlyPITI: Number(totalMonthlyPITI.toFixed(2)),
    totalLifetimeInterest: Number(totalInterest.toFixed(2)),
    totalLifetimeCost: Number(totalLifetimeCost.toFixed(2))
  };
}

/**
 * Generates year-by-year or month-by-month loan amortization schedule with optional extra payments.
 */
export function generateAmortizationSchedule({
  principal = 320000,
  annualInterestRate = 6.75,
  loanTermYears = 30,
  extraMonthlyPayment = 0
} = {}) {
  const monthlyRate = (annualInterestRate / 100) / 12;
  const totalMonths = loanTermYears * 12;
  const factor = Math.pow(1 + monthlyRate, totalMonths);
  const baseMonthlyPI = principal * ((monthlyRate * factor) / (factor - 1));

  let currentBalance = principal;
  let totalInterestPaid = 0;
  const schedule = [];

  for (let month = 1; month <= totalMonths; month++) {
    if (currentBalance <= 0) break;

    const interestForMonth = currentBalance * monthlyRate;
    let principalForMonth = (baseMonthlyPI - interestForMonth) + extraMonthlyPayment;

    if (principalForMonth > currentBalance) {
      principalForMonth = currentBalance;
    }

    currentBalance -= principalForMonth;
    totalInterestPaid += interestForMonth;

    schedule.push({
      month,
      year: Math.ceil(month / 12),
      principalPayment: Number(principalForMonth.toFixed(2)),
      interestPayment: Number(interestForMonth.toFixed(2)),
      totalPayment: Number((principalForMonth + interestForMonth).toFixed(2)),
      remainingBalance: Number(Math.max(0, currentBalance).toFixed(2)),
      totalInterestToDate: Number(totalInterestPaid.toFixed(2))
    });
  }

  return {
    payoffMonths: schedule.length,
    payoffYears: Number((schedule.length / 12).toFixed(1)),
    totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
    schedule
  };
}

/**
 * Calculates Compound Interest with regular periodic contributions.
 * Formula: A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
 */
export function calculateCompoundInterest({
  principal = 10000,
  monthlyContribution = 500,
  annualRate = 8,
  years = 20,
  compoundsPerYear = 12
} = {}) {
  const r = annualRate / 100;
  const n = compoundsPerYear;
  const t = years;
  const totalDeposits = principal + (monthlyContribution * 12 * t);

  // Future value of initial principal
  const fvPrincipal = principal * Math.pow(1 + r / n, n * t);

  // Future value of periodic monthly deposits
  const ratePerPeriod = r / 12;
  const totalPeriods = 12 * t;
  const fvContributions = monthlyContribution * ((Math.pow(1 + ratePerPeriod, totalPeriods) - 1) / ratePerPeriod);

  const futureValue = fvPrincipal + fvContributions;
  const totalInterestEarned = futureValue - totalDeposits;

  return {
    initialPrincipal: principal,
    totalContributions: monthlyContribution * 12 * t,
    totalDeposited: Number(totalDeposits.toFixed(2)),
    futureValue: Number(futureValue.toFixed(2)),
    totalInterestEarned: Number(totalInterestEarned.toFixed(2))
  };
}

/**
 * Calculates Compound Annual Growth Rate (CAGR).
 * Formula: CAGR = (EndingValue / BeginningValue)^(1 / n) - 1
 */
export function calculateCAGR({
  beginningValue = 10000,
  endingValue = 25000,
  numberOfYears = 5
} = {}) {
  if (beginningValue <= 0 || numberOfYears <= 0) {
    throw new Error("Beginning value and number of years must be strictly positive.");
  }
  const cagr = Math.pow(endingValue / beginningValue, 1 / numberOfYears) - 1;
  return Number((cagr * 100).toFixed(2));
}

/**
 * Estimates investment doubling time using the Rule of 72.
 */
export function calculateRuleOf72({ annualRate = 7 } = {}) {
  if (annualRate <= 0) return 0;
  return Number((72 / annualRate).toFixed(1));
}

/**
 * Calculates Real Estate Capitalization Rate (Cap Rate).
 * Formula: Cap Rate = (Net Operating Income / Current Market Property Value) * 100
 */
export function calculateCapRate({
  netOperatingIncome = 36000,
  propertyValue = 450000
} = {}) {
  if (propertyValue <= 0) return 0;
  const capRate = (netOperatingIncome / propertyValue) * 100;
  return Number(capRate.toFixed(2));
}

/**
 * Calculates Debt-to-Income (DTI) ratio.
 */
export function calculateDTI({
  monthlyDebtPayments = 1800,
  grossMonthlyIncome = 6000
} = {}) {
  if (grossMonthlyIncome <= 0) return 0;
  const dti = (monthlyDebtPayments / grossMonthlyIncome) * 100;
  return Number(dti.toFixed(2));
}

/**
 * Calculates Body Mass Index (BMI).
 * Formula: BMI = weight (kg) / [height (m)]^2
 */
export function calculateBMI({
  weightKg = 70,
  heightCm = 175
} = {}) {
  if (heightCm <= 0) return 0;
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  
  let category = 'Normal weight';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';

  return {
    bmi: Number(bmi.toFixed(1)),
    category
  };
}
