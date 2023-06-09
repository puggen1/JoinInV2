import Post from "./Post.mjs";
import customAvatar from "./customAvatar.js";
import globalApiCall from "./globalApiCall.mjs";
import { logOutInitiate, isLoggedIn, notLoggedIn } from "./logInOut.mjs";
import {
  hiddenToggler,
  changeColor,
  displayResponse,
  changeTypeAndColor,
  createAlert,
} from "./responses.mjs";
let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let username = localStorage.getItem("username");
let avatar = localStorage.getItem("avatar");
let id = params.get("id");

let htmlMain = document.querySelector("main");
let HTMLusername = document.querySelector("#username");
let logOutBtn = document.querySelector("#logOut");
/**
 * @description does an api call via globalApiCall, displays the content on the page
 * @param {number} id the id of the post
 * @param {string} token your auth token
 * @param {string} user the username of the logged in user
 */
async function singlePost(id, token, user) {
  let response = await globalApiCall(
    `social/posts/${id}?_author=true`,
    token,
    "GET"
  );
  if (!response.message) {
    let post = new Post(response);
    let { title = this.title, body = this.body } = post;
    document.title = title;
    let lowerPost = post.customButtons(user, true);
    let media = post.Picture();
    let postProfile = post.Profile();
    let date = post.time();
    let postContent = `
    <div class="card-body">    
    ${postProfile}
    <h1 class="text-center mb-4">${title}</h1>
    <div class="col-12 m-auto">
    <div class="d-flex justify-content-center flex-column">
    ${media}
    <p class="mt-2">${body}</p>
    </div>
    </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between align-items-center card-footer">
    <div class="d-flex col-12 col-sm-6 mb-2">
    <a class="btn btn-primary" href="feed.html">Back</a>

    ${lowerPost}
    </div>
    <p class="my-0">${date[0]} ${date[1]} ${date[2]}</p>
    </div>
    `;
    //created post
    let postElement = document.createElement("div");
    postElement.classList.add(
      "col-12",
      "col-sm-10",
      "col-md-8",
      "col-xl-4",
      "mt-4",
      "bg-white",
      "rounded-2",
      "p-0",
      "mb-4",

      "card"
    );
    postElement.innerHTML = postContent;
    post.addEvent(postElement, true);
    htmlMain.insertAdjacentElement("afterbegin", postElement);
  } else {
    alert = createAlert("singlePostAlert", "main", "afterbegin", "col-6");
    changeTypeAndColor(alert, "alert", "danger");
    displayResponse(alert, response.message, true);
  }
}
/**
 *@description initiating single page content
 */
function initiator() {
  let status = isLoggedIn(token, isLoggedInStatus);
  if (status) {
    singlePost(id, token, username);
    HTMLusername.children[0].innerHTML = username;
    HTMLusername.children[1].src = avatar && (avatar !== "null") ? avatar : customAvatar(username);
    logOutInitiate(logOutBtn);
  } else {
    notLoggedIn(HTMLusername, logOutBtn, "main");
  }
}
initiator();
