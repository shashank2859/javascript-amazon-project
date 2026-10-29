import { formatCurrency } from "../scripts/utils/money.js";


console.log('test suit: formatcurrency')
console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95')
console.log('passed');
else {
console.log('failed');

}

console.log('works with 0');

if (formatCurrency(0) === '0.00'){
console.log('passed');
} else {
console.log('failed');
}

console.log('rounds up to the nearest cent');