/*
 * Задача 14: «Простые числа»
 *
 * Напишите функцию primes(n). Её единственный аргумент — целое число n.
 * Функция должна возвращать массив простых чисел от 2 до n.
 *
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

function primes(num) {

  if (typeof num !== 'number' || !Number.isInteger(num)) {
    console.error('Wrong input');
    return undefined;
  }

  const arr = [];
  for (let i = 1; i <= num; i++) {
    if (isPrime(i)) {
      arr.push(i);
    }
  }
  return arr;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(primes(-7)); // [2, 3, 5]
console.log(primes(17)); // [2, 3, 5, 7, 11, 13, 17]

 /*
 *   Принято
 */
