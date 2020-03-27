/*
 * Задача 11: «Пересечения массивов»
 *
 * Напишите функцию intersection(arr1, arr2). Она должна принимать
 * на вход два массива целых чисел. Функция должна вернуть новый
 * массив чисел, содержащихся в обоих исходных массивах.
 *
*/

function uniq(arr) {
  if (!Array.isArray(arr)) {
    console.error("It's not an array");
    return undefined;
  }
  let newArr = [];
  arr.forEach(function (number) {
    if (!newArr.includes(number)) {
      newArr.push(number);
    }
  });
  return newArr;
}

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


function intersection(arr1, arr2) {
  if (isIntegerArray(arr1) && isIntegerArray(arr2)) {
    let newArr1 = uniq(arr1);
    let newArr2 = uniq(arr2);
    let res = [];
    newArr1.forEach(function (number) {
      if (newArr2.includes(number)) {
        res.push(number);
      }
    });
    return res;
  }
  console.error('Wrong input!');
  return undefined;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(intersection([1, 5, 4, 2, 4.4], [8, 91, 4, 1, 4])); // [4, 1]

