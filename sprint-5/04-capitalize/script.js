/*
 * Задача 4: «С большой буквы»
 *
 * Напишите функцию capitalize(str). Функция должна возвращать новую
 * строку каждое слово в которой начинается с прописной буквы.
 *
*/

function capitalize(str) {
  if (str) {
    let newStr = str;
    while (newStr.endsWith(' ')) {
      if (newStr.length === 1)
        return ' ';
      newStr = newStr.substring(0, newStr.length - 1)
    }

    while (newStr.includes('  ')) {
      newStr = newStr.substring(0, newStr.indexOf('  ')) + newStr.substring(newStr.indexOf('  ') + 1);
    }
    let arr = newStr.split(' ');

    let newArr = arr.map(function (item) {
      return item[0].toUpperCase() + item.slice(1);
    });
    newArr = newArr.join(' ');;
    return newArr;
  }
  return '';
}

// Протестируйте решение, вызывая функцию с разными аргументами:


console.log(capitalize('ы  ')); // "Ы"
 /*  
 *   Принято!
 * 	 Более коротким решением было бы:
 * 	return str.replace(/(?:^|)/g, function(a) { return a.toUpperCase(); })
 * 	 
 * 	В этом решении использована довольно сложная техника - регулярные выражения. Вы можете почитать про них по ссылке
 * 	https://learn.javascript.ru/regular-expressions
 * 	
 * 	А вот тренажер, если вы захотите попрактиковаться 
 * 	https://regex101.com/
 * 	 
 */