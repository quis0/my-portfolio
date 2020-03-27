/*
 * Задача 10: «Факториал»
 *
 * Напишите функцию factorial(n), возвращающую факториал неотрицательного
 * целого числа. Факториал — это произведение всех натуральных чисел
 * от 1 до n включительно. Факториал 0 равен 1.
 *
*/

function factorial(n) {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    console.error('Wrong input');
    return undefined;
  }
  let factorial = 1;
  for (let i = 1; i < n; i++) {
    factorial *= i + 1;
  }
  return factorial;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(factorial(1)); // 1
console.log(factorial(1)); // 1
console.log(factorial(2)); // 720
