$(document).ready(function() {
  $('.new-tweet').hide()
  $('.write-tweet').on('click', function() {
    $('.new-tweet').slideToggle();
  });
})