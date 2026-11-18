import assert from 'node:assert';
import { 
  calculateMortgagePITI, 
  generateAmortizationSchedule, 
  calculateCompoundInterest,
  calculateCAGR,
  calculateRuleOf72,
  calculateCapRate,
  calculateDTI,
  calculateBMI
} from '../src/index.js';

console.log('Testing @affichain/core mathematical algorithms...');

// 1. Mortgage PITI Test
const m = calculateMortgagePITI({
  homePrice: 400000,
  downPayment: 80000,
  annualInterestRate: 6.75,
  loanTermYears: 30,
  annualPropertyTax: 4800,
  annualHomeInsurance: 1400
});
assert.strictEqual(m.principalLoanAmount, 320000);
assert.strictEqual(m.monthlyPrincipalAndInterest, 2075.51);
assert.strictEqual(m.monthlyPropertyTax, 400.00);
assert.strictEqual(m.totalMonthlyPITI, 2592.18);
console.log('✓ calculateMortgagePITI passed');

// 2. Amortization Schedule Test
const s = generateAmortizationSchedule({
  principal: 300000,
  annualInterestRate: 6.5,
  loanTermYears: 30,
  extraMonthlyPayment: 250
});
assert(s.payoffYears < 30, 'Extra payments must reduce payoff tenure');
assert.strictEqual(s.schedule[0].month, 1);
console.log('✓ generateAmortizationSchedule passed');

// 3. Compound Interest Test
const ci = calculateCompoundInterest({
  principal: 10000,
  monthlyContribution: 500,
  annualRate: 8,
  years: 10
});
assert(ci.futureValue > ci.totalDeposited, 'Future value must exceed total deposited');
console.log('✓ calculateCompoundInterest passed');

// 4. CAGR Test
const cagr = calculateCAGR({
  beginningValue: 10000,
  endingValue: 20000,
  numberOfYears: 5
});
assert.strictEqual(cagr, 14.87);
console.log('✓ calculateCAGR passed');

// 5. Rule of 72 Test
const r72 = calculateRuleOf72({ annualRate: 7.2 });
assert.strictEqual(r72, 10.0);
console.log('✓ calculateRuleOf72 passed');

// 6. Cap Rate Test
const cr = calculateCapRate({ netOperatingIncome: 30000, propertyValue: 300000 });
assert.strictEqual(cr, 10.00);
console.log('✓ calculateCapRate passed');

// 7. DTI Test
const dti = calculateDTI({ monthlyDebtPayments: 2000, grossMonthlyIncome: 5000 });
assert.strictEqual(dti, 40.00);
console.log('✓ calculateDTI passed');

// 8. BMI Test
const bmi = calculateBMI({ weightKg: 70, heightCm: 175 });
assert.strictEqual(bmi.bmi, 22.9);
assert.strictEqual(bmi.category, 'Normal weight');
console.log('✓ calculateBMI passed');

console.log('\n🎉 ALL 8 MATHEMATICAL ALGORITHM TESTS PASSED SUCCESSFULLY!');
