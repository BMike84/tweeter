/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }
 
 $(document).ready(function() {
  const createTweetElement = function(tweetData) {
    const $tweet = (`
        <article class="article-tweets">
          <header>
            <div class="user">
            <img src="${tweetData.user.avatars}" alt="">
              <p>${tweetData.user.name}</p>
            </div>
            <p>${tweetData.user.handle}</p>
          </header>
          <div class="tweet">
            <p>${tweetData.content.text}</p>
            <div class="border"></div>
          </div>
          <footer>
            <div class="left-footer">
              <span>${tweetData.created_at}</span>
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

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);

})