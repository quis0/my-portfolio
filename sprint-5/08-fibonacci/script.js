/*
 * Задача 8: «Фибоначчи»
 *
 * Последовательность Фибоначчи — это порядок чисел, где каждое последующее
 * число является суммой двух предыдущих: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
 *
 * Напишите функцию, которая принимает на вход число n и возвращает n-й элемент
 * последовательности Фибоначчи.
*/

function fibonacci(n) {
  if (typeof (n) !== 'number' || (n ^ 0) !== n) {
    console.error('Wrong input!');
    return undefined;
  }
  if (!fibonacci.cache) {
    fibonacci.cache = {};
  }
  if (n in fibonacci.cache) {
    return fibonacci.cache[n];
  }

  let firstNumber = 0, secondNumber = 1, sum = 0, i = 0;

  if (n < 0) {
    for (i = -1; i > n; i--) {
      sum = firstNumber - secondNumber;
      firstNumber = secondNumber;
      secondNumber = sum;
    }
    fibonacci.cache[n] = secondNumber;
  }
  else if (n === 0) {
    fibonacci.cache[n] = 0;
  }
  else {
    for (i = 1; i < n; i++) {
      sum = firstNumber + secondNumber;
      firstNumber = secondNumber;
      secondNumber = sum;
    }
    fibonacci.cache[n] = secondNumber;
  }

  return fibonacci.cache[n];
}

// Протестируйте решение, вызывая функцию с разными аргументами:

for (i = -5; i <= 5; i++) {
  console.log(fibonacci(i));
}


 /*  
 *   Принято!
 * 	Можно вот такое решение поиска числа Фибоначчи взять
 function fib(n) { 	  
      return n <= 1 ? n : fib(n - 1) + fib(n - 2);	  
    }  
      
 */