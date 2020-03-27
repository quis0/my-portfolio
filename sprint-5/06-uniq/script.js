/*
 * Задача 6: «Уникальные числа»
 *
 * Напишите функцию uniq(arr), принимающую на вход массив целых чисел.
 * Функция должна возвращать массив уникальных чисел, которые содержатся
 * в переданном массиве. То есть, дубликаты должны быть удалены.
 *
*/

function uniq(arr) {
  if (!Array.isArray(arr)) {
    console.error("It's not an array");
    return undefined;
  }
  let newArr = [];
  arr.forEach(function(number) {
    if (!newArr.includes(number)) {
      newArr.push(number);
    }
  });
  return newArr;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(uniq([1, 2, 5, 4, 2])); // [1, 2, 5, 4]
console.log(uniq([3, 3, 3, 5])); // [3, 5]
console.log(uniq('1, 4, 2, 2, 3, 4, 8]')); // It's not an array
 /*  
 *   Принято!
 * 	Можно вот такое решение
 function anagram(stringA, stringB) { 	  
      return cleanString(stringA) === cleanString(stringB);	  
    }  
      
  function cleanString(str) {	  
        return str.replace(/[^]/g).toLowerCase().split('').sort().join()  
 }   	 
 */