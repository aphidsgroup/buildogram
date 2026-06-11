/**
 * Number to Indian Rupees Words
 * Converts a numeric value to Indian currency words.
 * e.g. 2793487.50 → "Twenty Seven Lakhs Ninety Three Thousand Four Hundred Eighty Seven and Fifty Paise Only"
 */

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
               'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
               'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigit(n) {
  if (n < 20) return ones[n];
  return (tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')).trim();
}

function threeDigit(n) {
  if (n === 0) return '';
  if (n < 100) return twoDigit(n);
  return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + twoDigit(n % 100) : '');
}

export function numberToWords(amount) {
  if (amount === 0) return 'Zero Only';
  
  const num = Math.abs(amount);
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let words = '';
  
  if (rupees >= 10000000) {
    words += threeDigit(Math.floor(rupees / 10000000)) + ' Crore ';
  }
  if (rupees >= 100000) {
    words += threeDigit(Math.floor((rupees % 10000000) / 100000)) + ' Lakh ';
  }
  if (rupees >= 1000) {
    words += threeDigit(Math.floor((rupees % 100000) / 1000)) + ' Thousand ';
  }
  if (rupees >= 100) {
    words += threeDigit(Math.floor((rupees % 1000) / 100)) + ' Hundred ';
  }
  if (rupees % 100 > 0) {
    words += twoDigit(rupees % 100) + ' ';
  }

  words = words.trim();
  if (!words) words = 'Zero';
  words += ' Rupees';
  
  if (paise > 0) {
    words += ' and ' + twoDigit(paise) + ' Paise';
  }
  
  return words + ' Only';
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatIndianNumber(amount) {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
