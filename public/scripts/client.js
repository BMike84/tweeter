/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    //.empty() makes sure i dont get duplicate tweets when submitting
    $('#tweets-container').empty();
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  const createTweetElement = function(tweet) {
    const $tweet = (`
        <article class="article-tweets">
          <header>
            <div class="user">
            <img src="${tweet.user.avatars}" alt="">
              <p>${tweet.user.name}</p>
            </div>
            <p>${tweet.user.handle}</p>
          </header>
          <div class="tweet">
            <p>${tweet.content.text}</p>
            <div class="border"></div>
          </div>
          <footer>
            <div class="left-footer">
              <span>${timeago.format(tweet.created_at)}</span>
            </div>
            <div class="right-footer">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `);
    return $tweet
  }
 
   // form submission
  $("#form-tweet").submit(function(event) {
    // console.log('Event called');
    event.preventDefault();

    //checking for errors
    //checking for text area using id='tweet-text'
    if (!$(this).find("#tweet-text").val()) {
      console.log('Failed 0 characters')
      return alert('Please add some characters before submitting');
    }

    if ($(this).find("#tweet-text").val().length > 140) {
      console.log('Failed exceeded 140 characters')
      return alert("You've exceeeded the 140 characters allowed!")
    }
    
    // submits to tweets database
    $.ajax("/tweets", { 
      method: 'Post', 
      data: $(this).serialize()
    }).then(function() {
      $("#tweet-text").val('');
      $(".counter").text(140);
      loadTweets()
    })
    
  });

  //load tweets
  const loadTweets = function () {
    // using a get request to search the  page for all tweets
    $.ajax("/tweets", { method: 'GET' })
    .then(function (tweets) {
    // console.log('Success: ', tweets);
    renderTweets(tweets);
    });
  };
  
  // load tweets   
  loadTweets();

});