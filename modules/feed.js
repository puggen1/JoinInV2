import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let allPosts = "social/posts?_author=true&_comments=true&_reactions=true";
let authToken = localStorage.getItem("token");
let userName = localStorage.getItem("username");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let logOutBtn = document.querySelector("#logOut");
let profileLink = document.querySelector("#username");
let postDiv = document.querySelector("#posts");
let welcome = document.querySelector("#welcomeMessage");

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
    welcome.innerHTML = `Welcome <b>${userName}</b> here is whats new`;
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
    let singlePost = document.createElement("div");
    singlePost.classList.add("container", "col-11", "col-xl-10", "gy-3");
    singlePost.innerHTML = post.htmlPost();
    postDiv.insertAdjacentElement("beforeend", singlePost);
    //this will be targeted remember not run every time
    let postActions = singlePost.querySelectorAll(".postAction");
    if(postActions.length > 0) {
      postActions[0].addEventListener("click", Post.updatePost);
      postActions[1].addEventListener("click", Post.deletePost)
    }
  }
  //postDiv.innerHTML = html;
}
