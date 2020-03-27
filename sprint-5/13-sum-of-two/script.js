/*
 * Задача 13: «Сумма двух»
 *
 * Напишите функцию sumOfTwo(arr, num). Её аргументы: массив целых чисел arr
 * и целое число num. Функция должна вернуть true, если в переданном массиве
 * есть какие-то два числа, чья сумма равна num. Если же такой пары чисел нет,
 * функция должна вернуть false.
 *
*/

function isIntegerArray(arr) {
  let isIntegerArray = true;
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== 'number' || (!Number.isInteger(arr[i]))) {
      isIntegerArray = false;
      break;
    }
  }
  return isIntegerArray;
}

function sumOfTwo(arr, sum) {

  if(!isIntegerArray(arr)) {
    console.error('Wrong input');
    return undefined;
  }

  if (typeof sum !== 'number' || !Number.isInteger(sum)) {
    console.error('Wrong input');
    return undefined;
  }

  let newArr = arr.map(function (item) {
    return sum - item;
  });

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === newArr[j]) {
        return true;
      }
    }
  }


  return false;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(sumOfTwo([1, 2, 3, 4, 5], 4)); // true (так как 1 + 3 === 4)
console.log(sumOfTwo([1, 2, 3, 4, 5], 100)); // false

 /*  
 *   Принято
 */