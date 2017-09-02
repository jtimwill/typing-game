//References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

var typed_chars = [];
var my_string;
var errors = 0;
var start_time;
var end_time;
var time_spent;
var first_keypress = true;
var increment = 0;
var progress = 0;

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
    if (first_keypress) {
      start_time = $.now();
      first_keypress = false;
      increment = 100/my_string.length;
    }
    else if (event_object.key === my_string[0] || (event_object.key === "Enter" && /\n/.test(my_string[0]))) {
      console.log("Correct!");
      my_string.shift();
      progress += increment;

      $(".progress-bar").css({
        width: Math.floor(progress) + "%",
      });
      $(".progress-bar").text(Math.floor(progress) + "%")


      console.log(my_string.join(""));
      if (my_string.length === 0) {
        console.log("You Won!");
        console.log("Errors: " + errors);
        end_time = $.now();
        time_spent = (end_time - start_time)/1000;
        console.log("Time Spent: " + time_spent + " seconds");
        $("#alert").append("<div class='alert alert-success' role='alert'><strong>You Won!</div>");
      }
    } else if (!/Shift/.test(event_object.key)){
      console.log(my_string.join(""));
      console.log("Wrong!");
      errors++;
    }
  });
});

// 37 ArrowLeft
// 38 ArrowRight
// 39 ArrowUp
// 40 ArrowDown
// 16 Shift
