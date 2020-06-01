/*
 * Задача 9: «Простое число»
 *
 * Напишите функцию isPrime(n) для проверки, простое число n или нет.
 * Напомним, что число называют простым, если оно больше 1 и делится
 * без остатка только на 1 и на само себя.
 *
 * На вход функция должна принимать число n и возвращать true,
 * если n простое, и false — если нет.
*/

function isPrime(n) {
  if (typeof n === 'number' && isFinite(n) && Number.isInteger(n)) {
    if (!isPrime.cache) {
      isPrime.cache = {};
    }
    if (n in isPrime.cache) {
      return isPrime.cache[n];
    }
    if (n === 0 || n === 1) {
      isPrime.cache[n] = false;
      return isPrime.cache[n];
    }
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        isPrime.cache[n] = false;
        return isPrime.cache[n];
      }
    }
    isPrime.cache[n] = true;
    return isPrime.cache[n];
  }
  console.error('Wrong input!');
  return undefined;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(isPrime(0)); // false
console.log(isPrime(1)); // false
console.log(isPrime(3)); // true
console.log(isPrime(6)); // false
console.log(isPrime(17)); // true


 /*  
 *   Принято, отличное решение!
 */