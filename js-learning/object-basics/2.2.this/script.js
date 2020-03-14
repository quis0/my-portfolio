"use strict";

let calculator = {
  read: function(x, y) {
    this.x = +prompt("Enter first number: ", 0);
    this.y = +prompt("Enter second number: ", 0);
  },
  sum: function() {
    return(this.x + this.y)
  },
  mul: function() {
    return(this.x * this.y)
  }
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );

