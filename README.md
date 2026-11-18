# @affichain/core

> Institutional-grade financial, mathematical, and cryptographic calculation engine. 100% client-side, zero-dependency, and mathematically verified.

[![npm version](https://img.shields.io/npm/v/affichain-core.svg?style=flat-square)](https://www.npmjs.com/package/affichain-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Powered by Affi-Chain](https://img.shields.io/badge/Web%20App-Affi--Chain-blue?style=flat-square)](https://www.affichain.com)

Developed and maintained by [Affi-Chain](https://www.affichain.com), this library powers over 225+ interactive utilities and precision financial calculators on [https://www.affichain.com](https://www.affichain.com).

---

## Features

* **Zero Dependencies**: Lightweight, self-contained mathematical routines with 0 external dependencies.
* **100% Client-Side Privacy**: Computations execute entirely in memory. Zero network overhead or remote API logging.
* **Bank-Grade Precision**: Implements standard amortization equations, compound growth formulas, and statistical algorithms.
* **TypeScript & ES Modules**: Native ES Modules support with complete JSDoc annotations.

---

## Installation

```bash
npm install affichain-core
```

Or using Yarn / pnpm:
```bash
yarn add affichain-core
# or
pnpm add affichain-core
```

---

## Quick Start & Usage

### 1. Fixed-Rate Mortgage & PITI Calculation
Calculate principal, interest, taxes, insurance, and total monthly housing obligations.

```javascript
import { calculateMortgagePITI } from 'affichain-core';

const mortgage = calculateMortgagePITI({
  homePrice: 400000,
  downPayment: 80000,          // 20% down ($320k loan balance)
  annualInterestRate: 6.75,     // 6.75%
  loanTermYears: 30,
  annualPropertyTax: 4800,
  annualHomeInsurance: 1400
});

console.log(mortgage);
// Output:
// {
//   principalLoanAmount: 320000,
//   monthlyPrincipalAndInterest: 2075.51,
//   monthlyPropertyTax: 400.00,
//   monthlyHomeInsurance: 116.67,
//   totalMonthlyPITI: 2592.18,
//   totalLifetimeInterest: 427183.60,
//   totalLifetimeCost: 933183.60
// }
```
*Live GUI version: [Affi-Chain Mortgage Calculator](https://www.affichain.com/financial-calculators/mortgage-calculator)*

---

### 2. Compound Interest & Investment Growth
Model portfolio growth with periodic recurring monthly deposits.

```javascript
import { calculateCompoundInterest } from 'affichain-core';

const portfolio = calculateCompoundInterest({
  principal: 10000,            // $10,000 initial seed capital
  monthlyContribution: 500,    // $500/month recurring deposit
  annualRate: 8.5,             // 8.5% expected annual return
  years: 25,
  compoundsPerYear: 12
});

console.log(portfolio);
// Output:
// {
//   initialPrincipal: 10000,
//   totalContributions: 150000,
//   totalDeposited: 160000,
//   futureValue: 569720.44,
//   totalInterestEarned: 409720.44
// }
```
*Live GUI version: [Affi-Chain Compound Interest Calculator](https://www.affichain.com/financial-calculators/compound-interest-calculator)*

---

### 3. Loan Amortization Schedule with Prepayments
Generate detailed year-by-year payment schedules showing balance paydown and early mortgage payoff strategies.

```javascript
import { generateAmortizationSchedule } from 'affichain-core';

const schedule = generateAmortizationSchedule({
  principal: 300000,
  annualInterestRate: 6.5,
  loanTermYears: 30,
  extraMonthlyPayment: 250     // $250 extra per month towards principal
});

console.log(`Payoff Term: ${schedule.payoffYears} years (saved ~6.2 years!)`);
console.log(`Total Interest Paid: $${schedule.totalInterestPaid}`);
```
*Live GUI version: [Affi-Chain Loan & EMI Calculator](https://www.affichain.com/financial-calculators/loan-calculator)*

---

### 4. Real Estate Cap Rate & Financial Ratios
Evaluate investment property yields and borrowing capacity.

```javascript
import { calculateCapRate, calculateDTI, calculateCAGR } from 'affichain-core';

// Capitalization Rate
const capRate = calculateCapRate({
  netOperatingIncome: 42000,   // Annual rental income after operating expenses
  propertyValue: 550000
});
console.log(`Cap Rate: ${capRate}%`); // 7.64%

// Debt-to-Income (DTI)
const dti = calculateDTI({
  monthlyDebtPayments: 2100,
  grossMonthlyIncome: 7000
});
console.log(`DTI Ratio: ${dti}%`);   // 30.00%
```

---

## API Reference Overview

| Function | Description | Live Web GUI |
| :--- | :--- | :--- |
| `calculateMortgagePITI()` | Computes Principal, Interest, Taxes, and Insurance breakdown. | [Affi-Chain Mortgage](https://www.affichain.com/financial-calculators/mortgage-calculator) |
| `generateAmortizationSchedule()` | Month-by-month and year-by-year loan amortization schedule. | [Affi-Chain Amortization](https://www.affichain.com/financial-calculators/loan-calculator) |
| `calculateCompoundInterest()` | Future value of recurring investments with compounding intervals. | [Affi-Chain Compound](https://www.affichain.com/financial-calculators/compound-interest-calculator) |
| `calculateCAGR()` | Compound Annual Growth Rate across historical investment windows. | [Affi-Chain CAGR](https://www.affichain.com/financial-calculators/cagr-calculator) |
| `calculateRuleOf72()` | Doubling time estimation based on annual interest return. | [Affi-Chain Rule of 72](https://www.affichain.com/financial-calculators/rule-of-72-calculator) |
| `calculateCapRate()` | Real estate capitalization rate for income-producing property. | [Affi-Chain Cap Rate](https://www.affichain.com/financial-calculators/cap-rate-calculator) |
| `calculateDTI()` | Back-end debt-to-income ratio for mortgage qualification. | [Affi-Chain DTI](https://www.affichain.com/financial-calculators/debt-to-income-calculator) |
| `calculateBMI()` | Body Mass Index with WHO categorization. | [Affi-Chain BMI](https://www.affichain.com/health-calculators/bmi-calculator) |

---

## License

MIT © [Neelesh Yadav](https://github.com/Neeleshydv). Free for personal, commercial, and educational use.

For the full suite of 225+ interactive developer tools, JSON editors, and precision calculators, visit [Affi-Chain](https://www.affichain.com).
