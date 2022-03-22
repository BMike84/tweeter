$(document).ready(function() {
  // specifying the text area with #tweet-text
  $('#tweet-text').on('input', function() {
    // counts the number of inputs pressed
    let charCount = $(this).val().length;
    let remainChars = 140 - charCount;
    // find the class counter in the html file
    let counter = $(this).parent().find('.counter');
    // updates the class counter text with remaining characters
    counter.text(remainChars);
    // adds a class to output tag to turn color red if the number remaining is less then 0
    if (remainChars < 0) {
      counter.addClass('negative-count');
    } else {
      counter.removeClass('negative-count');
    }
  });
});
