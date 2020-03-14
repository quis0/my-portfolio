"use strict";

let userName = prompt("Who's there?");
if (userName == "Admin") {
  let password = prompt("Password?")
  if (password == "I'm the boss") {
    alert("Welcome!");
  }
  else if (password == "" || password == null) {
    alert("Canceled!");
  }
  else {
    alert("Wrong password!");
  }
}
else if (userName == "" || userName == null) {
  alert("Canceled!");
}
else {
  alert("Canceled");
}


