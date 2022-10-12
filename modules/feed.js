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
//global list of all posts initiated
let postArr = [];
//global list for filtered posts that can be sorted
let postToShow = [];
//create post areas here
let postForm = document.querySelector("#newPost");
postForm.addEventListener("submit", () => {
  Post.createPost(event, imgLink);
});

function feedInitiator() {
  //double validation for is logged in so token must be used as well
  let status = isLoggedIn(authToken, isLoggedInStatus);
  if (status) {
    profileLink.innerHTML = userName;
    logOutInitiate(logOutBtn);
    welcome.innerHTML = `Welcome <b>${userName}</b> here is whats new:`;
    showFeed();
  } else {
    notLoggedIn(profileLink, logOutBtn, "h1");
  }
}
feedInitiator();
async function showFeed() {
  let response = await globalApiCall(allPosts, authToken, "GET");
  for (let post of response) {
    postArr.push(new Post(post));
  }
  for (let post of postArr) {
    let singlePost = document.createElement("div");
    singlePost.classList.add("container", "col-11", "col-xl-10", "my-3");
    singlePost.innerHTML = post.htmlPost();
    postDiv.insertAdjacentElement("beforeend", singlePost);
    //this will be targeted remember not run every time
    post.addEvent(singlePost);
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
