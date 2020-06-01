/*
 * Задача 5: «Найти гласные»
 *
 * Напишите функцию findVowels(str), принимающую на вход кириллическую
 * строку str  и возвращающую количество гласных, содержащихся в этой строке.
 * Для вашего удобства вот массив кириллических гласных:
 *
 * ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'].
 *
*/

function findVowels(str) {
  const cyrillicVowels = ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'];
  let arr = str.toLowerCase().split('');
  let totalVowels = 0;
  arr.forEach(function(letterFromString){
    cyrillicVowels.forEach(function(cyrillicVowel){
      if (letterFromString === cyrillicVowel)
        totalVowels++;
    });
  });

  return totalVowels;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(findVowels('здравствуй Тте')); // 3
console.log(findVowels('привет')); // 2
console.log(findVowels('хеллоу')); // 3


 /*  
 *   Принято!
 * 	 
 * 	Вы используете цикл, это очень долго. Можно было бы проходить одним циклом по строке 
 * 	и с помощью indexOf определить имеется ли буква в массиве 
 * 	https: //developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf 
 * 	 
 */