/*
 * Задача 12: «Посчитать количество нулей»
 *
 * Напишите функцию countZeros(n), принимающую на вход целое неотрицательное
 * число n. Возвращать функция должна количество нулей, содержащихся в аргументе.
 *
*/

function countZeros(n) {

  if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
    console.error('Wrong input!');
    return undefined;
  }


  let string = '';
  for (let i = 1; i <= n; i++) {
    string = string.concat(i.toString());
  }

  let totalZeros = 0;
  while (string.search('0') !== -1) {
    string = string.substring(string.search('0') + 1);

    totalZeros++;
  }

  return totalZeros;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(countZeros(1)); // 2 – два нуля, по одному в числах 10 и 20
console.log(countZeros(20)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
