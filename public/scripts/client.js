/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
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

// for submission
const submitTweet = function () {
  $("#form-tweet").submit(function(event) {
    // console.log('Event called');
    event.preventDefault();
    $.ajax("/tweets", { method: 'Post', data: $(this).serialize()});
    // console.log($(this).serialize())
   });
}



//load tweets
const loadTweets = function () {
  // using a get request to search the  page for all tweets
  $.ajax("/tweets", { method: 'GET' })
  .then(function (tweets) {
    // console.log('Success: ', tweets);
    submitTweet();
    renderTweets(tweets);
  })
}

loadTweets();

})