import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let allPosts = "social/posts?_author=true&_comments=true&_reactions=true";
import { createAlert, displayResponse } from "./responses.mjs";
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

//global list of all posts initiated
let postArr = [];
//global list for filtered posts that can be sorted
let postToShow = [];
//create post areas here
let postForm = document.querySelector("#newPost");
postForm.addEventListener("submit", () => {
  Post.createPost(event, imgLink);
});
//double validation for is logged in so token must be used as well
function isLoggedIn() {
  if (authToken && isLoggedInStatus) {
    return true;
  } else {
    return false;
  }
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.setItem("isLoggenIn", false);
  window.location.href = "/feed.html";
}

function feedInitiator() {
  let status = isLoggedIn();
  if (status) {
    profileLink.innerHTML = userName;
    logOutBtn.addEventListener("click", logOut);
    welcome.innerHTML = `Welcome <b>${userName}</b> here is whats new:`;
    showFeed();
  } else {
    let alert = createAlert("notLoggedIn", "h1", "beforebegin");
    displayResponse(alert, `<p class="m-0">Not logget in</p>`, true);
    logOutBtn.innerHTML = "Log in";
    profileLink.innerHTML = "";
    logOutBtn.setAttribute("href", "./index.html");
  }
}
feedInitiator();
async function showFeed() {
  let response = await globalApiCall(allPosts, authToken, "GET");

  for (let post of response) {
    postArr.push(new Post(post));
  }
  for (let post of postArr) {
    Post.displayPosts(post, postDiv);
  }
  //postDiv.innerHTML = html;
}

let premadeButtons = document.querySelectorAll("#preMade button");
console.log(premadeButtons);
premadeButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    postToShow = await filterPosts(e, postArr);
    postDiv.innerHTML = "";
    for (let post of postToShow) {
      Post.displayPosts(post, postDiv);
    }
    console.log(postToShow);

    //to reset filters:
    if (e.target.id === "all") {
      postArr = postToShow;
      postToShow = [];
    }
  });
});
let sortButtons = document.querySelectorAll("#sortOptions a");
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
      Post.displayPosts(post, postDiv);
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
    Post.displayPosts(post, postDiv);
  }
});
