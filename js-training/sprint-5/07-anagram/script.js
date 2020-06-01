/*
 * Задача 7: «Анаграмма»
 *
 * Два слова называют анаграммами, если они состоят из одних и тех же букв.
 * Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга
 * (регистр букв не имеет значения). Для простоты примите, что в этих строках
 * нет пробелов и знаков препинания.
 *
*/

function anagram(str1, str2) {
  if (str1.length !== str2.length)
    return false;
  let newStr1 = str1.toLowerCase();
  let newStr2 = str2.toLowerCase();
  if (newStr1 === newStr2) {
    return false;
  }
  let arr1 = newStr1.split('').sort();
  let arr2 = newStr2.split('').sort();
  newStr1 = arr1.join('');
  newStr2 = arr2.join('');
  return (newStr1 === newStr2);
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(anagram('up', 'UP')); // true
// console.log(anagram('hello', 'bye')); // false

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