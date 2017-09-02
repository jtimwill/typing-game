//References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://www.sitepoint.com/jqueryhtml5-input-focus-cursor-positions/
// https://stackoverflow.com/questions/35966821/using-jquery-to-highlight-a-character-of-a-string-on-a-webpage
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange

var typed_chars = [];
var my_string;
var errors = 0;
var start_time;
var end_time;
var time_spent;
var first_keypress = true;
var increment = 0;
var progress = 0;
var text_length = 0;

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

$.fn.moveCursor = function (offset) {
  return this[0].setSelectionRange(0, offset);;
};

$(document).ready(function() {
  $("textarea").keydown(function(event_object){
    if (first_keypress && event_object.key === "Enter") {
      event_object.preventDefault();
      my_string = $("textarea").val().trim().split("");
      //my_string = removeLeadingSpaces(my_string);
      text_length = my_string.length;
      start_time = $.now();
      first_keypress = false;
      increment = 100/my_string.length;
      $("#alert").append("<div class='alert alert-warning' role='alert'><strong>" +
                          "GO!" + "</div>");
      $("textarea").focus().moveCursor(0);
    }
    else if (!first_keypress) {
      event_object.preventDefault();
      if (event_object.key === my_string[0] || (event_object.key === "Enter" && /\n/.test(my_string[0]))) {

        if (event_object.key === "Enter" && /\n/.test(my_string[0])){
          while(/\s/.test(my_string[1])) {
            my_string.shift();
            progress += increment;
          }
          my_string.shift();
          console.log("Correct!");
          console.log(my_string.join(""));

          $("textarea").moveCursor(text_length - my_string.length);
          progress += increment;
          $(".progress-bar").css({
            width: progress + "%",
          });
          $(".progress-bar").text(Math.round(progress) + "%");

        } else {
          console.log("Correct!");
          console.log(my_string.join(""));

          my_string.shift();
          $("textarea").moveCursor(text_length - my_string.length);
          progress += increment;
          $(".progress-bar").css({
            width: progress + "%",
          });
          $(".progress-bar").text(Math.round(progress) + "%");
        }

        if (my_string.length === 0) {
          end_time = $.now();
          time_spent = (end_time - start_time)/1000;
          var message = "Done! Errors: " + errors +
                        ". Time Spent: " + time_spent +
                        " seconds"
          $("#alert").html("<div class='alert alert-success' role='alert'><strong>" +
                              message + "</div>");
        }

      } else if (!/Shift/.test(event_object.key)){
        console.log(my_string.join(""));
        console.log("Wrong!");
        errors++;
      }
    }
  });
});

// 37 ArrowLeft
// 38 ArrowRight
// 39 ArrowUp
// 40 ArrowDown
// 16 Shift
