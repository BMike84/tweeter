/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const escape = str => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = tweets => {
    //.empty() makes sure i dont get duplicate tweets when submitting
    const tweetContainer = $("#tweets-container");
    tweetContainer.empty();
    tweets.forEach(tweet => {
      const value = createTweetElement(tweet);
      tweetContainer.prepend(value);
    });
  };

  //creates loaded tweets section
  const createTweetElement = tweet => {
    const $tweet = (`
        <article class="article-tweets">
          <header>
            <div class="user">
              <img src="${escape(tweet.user.avatars)}" alt="">
              <p>${escape(tweet.user.name)}</p>
            </div>
            <p>${escape(tweet.user.handle)}</p>
          </header>
          <div class="tweet">
            <p>${escape(tweet.content.text)}</p>
            <div class="border"></div>
          </div>
          <footer>
            <div class="left-footer">
              <span>${escape(timeago.format(tweet.created_at))}</span>
            </div>
            <div class="right-footer">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `);
    return $tweet;
  };
 
  // form submission
  const formSubmit = () => {
    $("#form-tweet").submit(function(event) {
      event.preventDefault();

      //checking for errors
      $(".error").slideUp();

      // checking for text area using id="tweet-text"
      // If no characters were added while submitting tweet
      if (!$(this).find("#tweet-text").val()) {
        return $(".error").text("❌ Please add some characters before submitting ❌").slideDown();
      }

      // If characters exceeded 140 you get a error
      if ($(this).find("#tweet-text").val().length > 140) {
        return $(".error").text("❌ You've exceeeded the 140 characters allowed! ❌").slideDown();
      }
      
      // submits to tweets database
      $.ajax("/tweets", {
        method: "Post",
        data: $(this).serialize()
      })
      // This renders the tweets without having to refresh page
        .then(() => {
          $("#tweet-text").val("");
          $(".counter").text(140);
          loadTweets();
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    });
  };

  formSubmit();
  
  //load tweets
  const loadTweets = () => {
    // using a get request to search the  page for all tweets
    $.ajax("/tweets", { method: "GET" })
      .then((tweets) => {
        renderTweets(tweets);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
  
  // load tweets
  loadTweets();

});