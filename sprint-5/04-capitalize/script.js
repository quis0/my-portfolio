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


console.log(capitalize('ы  ')); // "Молодость Всё Простит"
