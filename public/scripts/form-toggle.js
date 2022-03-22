$(document).ready(function() {
  // does not display compose tweet
  $('.new-tweet').hide()
  // when clicking first button second button appears
  $('.nav-btn').on('click', function() {
    $('.new-tweet').slideDown();
    $('.nav-btn').addClass('hide');
    $('.nav-btn2').removeClass('hide');
    // makes button scroll down to compose tweet
    $('html, body').animate({
      // - 200 makes it appear properly instead of bottom of container
      scrollTop: $("#container").offset().top - 200
    }, 1000);
  });
  //when clicking second button returns to first button
  $('.nav-btn2').on('click', function() {
    $('.new-tweet').slideUp();
    $('.nav-btn2').addClass('hide');
    $('.nav-btn').removeClass('hide');
  })
})