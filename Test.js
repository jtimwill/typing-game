//References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var typed_chars = [];
var my_string;

function removeLeadingSpaces(input) {
  var i = 0, l = input.length;
  while(input[i] !== undefined) {
    if (/\n/.test(input[i])) {
      while(/\s/.test(input[i+1])) {
        input[i+1] = "";
        i++;
      }
    }
    i++;
  }
  return input.join("").split("");
}

$(document).ready(function() {
  my_string = $("textarea").text().trim().split("");
  my_string = removeLeadingSpaces(my_string);
  $("textarea").keydown(function(event_object){
    if (event_object.key === my_string[0] || (event_object.key === "Enter" && /\n/.test(my_string[0]))) {
      console.log("Correct!");
      my_string.shift();
      console.log(my_string.join(""));
      if (my_string.length === 0) {
        console.log("You Won!");
      }
    } else {
      console.log(my_string.join(""));
      console.log("Wrong!");
      console.log(event_object.key);
    }
  });
});
