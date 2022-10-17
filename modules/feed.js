import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let allPosts = "social/posts?_author=true&_comments=true&_reactions=true";
import { isLoggedIn, logOutInitiate, notLoggedIn } from "./logInOut.mjs";
import { filterPosts, sortPosts, search } from "./filterAndSort.mjs";

let authToken = localStorage.getItem("token");
let userName = localStorage.getItem("username");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let logOutBtn = document.querySelector("#logOut");
let profileLink = document.querySelector("#username");
let postDiv = document.querySelector("#posts");
let welcome = document.querySelector("#welcomeMessage");
// just target input inside modal to send asa value....
let imgLink = document.querySelector("#imgLink");

//location for post form:
let postForm = document.querySelector("#newPost");
//location for filter
let postFilter = document.querySelector("#filter");
//global list of all posts initiated
let postArr = [];
//global list for filtered posts that can be sorted
let postToShow = [];
//create post areas here

/**
 * @description check if user is logged in, if true, initiate feed, else show not logged in message
 */
function feedInitiator() {
  //double validation for is logged in so token must be used as well
  let status = isLoggedIn(authToken, isLoggedInStatus);
  if (status) {
    profileLink.innerHTML = userName;
    logOutInitiate(logOutBtn);
    welcome.innerHTML = `Welcome <b class="fw-bold">${userName}</b> here is whats new:`;
    showFeed();
    postForm.addEventListener("submit", () => {
      Post.createPost(event, imgLink);
    });
  } else {
    notLoggedIn(profileLink, logOutBtn, "h1", postForm, postFilter);
  }
}

feedInitiator();
/**
 * @description shows the feed
 */
async function showFeed() {
  let response = await globalApiCall(allPosts, authToken, "GET");

  for (let post of response) {
    postArr.push(new Post(post));
  }
  for (let post of postArr) {
    post.displayPosts(postDiv);
  }
}

let premadeButtons = document.querySelectorAll("#preMade button");
premadeButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    postToShow = await filterPosts(e, postArr);
    postDiv.innerHTML = "";
    for (let post of postToShow) {
      post.displayPosts(postDiv);
    }
    //to reset filters:
    if (e.target.id === "all") {
      postArr = postToShow;
      postToShow = [];
    }
  });
});
let sortButtons = document.querySelectorAll("#sortOptions button");
sortButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    //if else statement is to "reset filters"
    if (postToShow.length > 0) {
      postToShow = await sortPosts(e, postToShow);
    } else {
      postToShow = await sortPosts(e, postArr);
    }
    postDiv.innerHTML = "";
    for (let post of postToShow) {
      post.displayPosts(postDiv);
    }
  });
});

let searchField = document.querySelector("#search input");
searchField.addEventListener("keyup", async (e) => {
  let searchTarget = postArr;
  if (postToShow.length > 0) {
    searchTarget = postToShow;
  }
  //for now, searchresult is used instead of posts to show..
  let searchResult = await search(e.target.value, searchTarget);
  postDiv.innerHTML = "";
  for (let post of searchResult) {
    post.displayPosts(postDiv);
  }
});
