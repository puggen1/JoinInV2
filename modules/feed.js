import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let allPosts = "social/posts?_author=true&_comments=true&_reactions=true";
let authToken = localStorage.getItem("token");
let userName = localStorage.getItem("name");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let logOutBtn = document.querySelector("#logOut");
let profileLink = document.querySelector("#username");
let postDiv = document.querySelector("#posts");

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
    testPost();
  } else {
    logOutBtn.innerHTML = "Log in";
    profileLink.innerHTML = "";
    logOutBtn.setAttribute("href", "./index.html");
  }
}
feedInitiator();

async function testPost() {
  let response = await globalApiCall(allPosts, authToken, "GET");
  let postArr = [];
  for (let post of response) {
    postArr.push(new Post(post));
  }
  let html = "";
  for (let post of postArr) {
    post.logPost();
    html += post.htmlPost();
  }
  postDiv.innerHTML = html;
}
