$(document).ready(function() {
  // For Nav Bar
  // does not display compose tweet when page is loaded
  $(".new-tweet").hide();
  // when clicking first button second button appears
  $(".nav-btn").on("click", function() {
    $(".new-tweet").slideDown();
    $(".nav-btn").addClass("hide");
    $(".nav-btn2").removeClass("hide");
    // makes button scroll down to compose tweet
    $("html, body").animate({
      // - 200 makes it appear properly instead of bottom of container
      scrollTop: $("#container").offset().top - 200
    }, 500);
  });
  //when clicking second button returns to first button
  $(".nav-btn2").on("click", function() {
    $(".new-tweet").slideUp();
    $(".nav-btn2").addClass("hide");
    $(".nav-btn").removeClass("hide");
  });

  // scroll page
  $(document).scroll(function() {

    // finds the position of top of page
    const position = $(window).scrollTop();

    // makes scroll to top button only appear after scrolling down 120px
    if (position > 120) {
      $(".scroll-btn").removeClass("hide");
      $("#navbar").addClass("transparent");
    } else {
      $(".scroll-btn").addClass("hide");
      $("#navbar").removeClass("transparent");
    }
  });

  // gives a smooth scroll
  $(".scroll-btn").on("click", function() {
    $("html").animate({scrollTop: 0}, 500);
    $(".scroll-btn").removeClass("hide");
  });

});