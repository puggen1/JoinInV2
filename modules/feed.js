import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let allPosts = "social/posts?_author=true&_comments=true&_reactions=true";
import { createAlert, displayResponse } from "./responses.mjs";
let authToken = localStorage.getItem("token");
let userName = localStorage.getItem("username");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let logOutBtn = document.querySelector("#logOut");
let profileLink = document.querySelector("#username");
let postDiv = document.querySelector("#posts");
let welcome = document.querySelector("#welcomeMessage");
// just target input inside modal to send asa value....
let imgLink = document.querySelector("#imgLink");

//alert for not logged in

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
    createAlert("notLoggedIn", "h1", "beforebegin");
    displayResponse(
      document.querySelector("#notLoggedIn"),
      `<p class="m-0">Not logget in</p>`,
      true
    );
    logOutBtn.innerHTML = "Log in";
    profileLink.innerHTML = "";
    logOutBtn.setAttribute("href", "./index.html");
  }
}
feedInitiator();
async function showFeed() {
  let response = await globalApiCall(allPosts, authToken, "GET");
  let postArr = [];
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
