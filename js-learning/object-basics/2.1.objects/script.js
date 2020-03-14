"use strict";

function sumSalaries(obj) {
  let total = 0;
  for (let key in obj) {
    total += obj[key];
  }
  return total;
}

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
}

let sum = sumSalaries(salaries);

alert(sum);


