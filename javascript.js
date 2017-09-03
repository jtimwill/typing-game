//References:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://www.sitepoint.com/jqueryhtml5-input-focus-cursor-positions/
// https://stackoverflow.com/questions/35966821/using-jquery-to-highlight-a-character-of-a-string-on-a-webpage
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange

var typed_chars = [],
    my_string,
    errors = 0,
    start_time,
    end_time,
    time_spent,
    first_keypress = true,
    increment = 0,
    progress = 0,
    text_length = 0;

$.fn.moveCursor = function (offset) {
  return this[0].setSelectionRange(0, offset);
};

function handleCorrect(){
  // console.log("Correct!");
  // console.log(my_string.join(""));
  my_string.shift();
  $("textarea").moveCursor(text_length - my_string.length);
  progress += increment;
  $(".progress-bar").css({ width: progress + "%" });
  $(".progress-bar").text(Math.round(progress) + "%");
}

function ignoreIndent() {
  while(/\s/.test(my_string[1])) {
    my_string.shift();
    progress += increment;
  }
}

$(document).ready(function() {
  $("textarea").keydown(function(event_object){
    if (first_keypress && event_object.key === "Enter") {
      event_object.preventDefault();
      my_string = $("textarea").val().trim().split("");
      text_length = my_string.length;
      start_time = $.now();
      first_keypress = false;
      increment = 100/my_string.length;
      $("#alert").append("<div class='alert alert-warning' role='alert'><strong>" +
                          "Start Typing" + "</div>");
      $("textarea").focus().moveCursor(0);
    }
    else if (!first_keypress) {
      event_object.preventDefault();
      if (event_object.key === my_string[0] || (event_object.key === "Enter" && /\n/.test(my_string[0]))) {

        if (event_object.key === "Enter" && /\n/.test(my_string[0])){
          ignoreIndent();
          handleCorrect();
        } else {
          handleCorrect();
        }

        if (my_string.length === 0) {
          end_time = $.now();
          time_spent = (end_time - start_time)/1000;
          var message = "Done! Errors: " + errors +
                        ". Time Spent: " + time_spent +
                        " seconds"
          $("#alert").html("<div class='alert alert-success' role='alert'><strong>" +
                              message + "</div>");
          $("h1").html("Refresh the page to try again");
        }

      } else if (!/Shift/.test(event_object.key)){
        // console.log(my_string.join(""));
        // console.log("Wrong!");
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
