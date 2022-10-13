import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
import { logOutInitiate, isLoggedIn, notLoggedIn } from "./logInOut.mjs";
let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let username = localStorage.getItem("username");
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
    post.logPost();
    let { title = postData.title, body = postData.body } = post.postData;
    document.title = title;
    let lowerPost = post.customButtons(user, true);
    let media = Post.postPicture(post.postData);
    let postProfile = Post.postProfile(post.postData);
    let date = post.time();
    console.log(date);
    let postContent = `    
    ${postProfile}
    <h1 class="text-center mb-4">${title}</h1>
    <div class="col-12 m-auto">
    <div class="d-flex justify-content-center flex-column">
    ${media}
    <p class="mt-2">${body}</p>
    </div>
    </div>
    <div class="d-flex flex-wrap justify-content-between align-items-center mt-4">
    <p class="my-0">${date[0]} ${date[1]} ${date[2]}</p>
    ${lowerPost}
    </div>
    `;
    //created post
    let postElement = document.createElement("div");
    postElement.classList.add(
      "col-12",
      "col-lg-4",
      "mt-4",
      "bg-white",
      "rounded-2",
      "p-3",
      "mb-4"
    );
    postElement.innerHTML = `${postContent}<div class="d-flex mt-4 justify-content-center"><a class="btn btn-primary" href="feed.html">Back</a></div>`;
    console.log(postElement);
    post.addEvent(postElement, true);
    htmlMain.insertAdjacentElement("afterbegin", postElement);
  }
}
/**
 *@description initiating single page content
 */
function initiator() {
  let status = isLoggedIn(token, isLoggedInStatus);
  if (status) {
    singlePost(id, token, username);
    HTMLusername.innerHTML = username;
    logOutInitiate(logOutBtn);
  } else {
    notLoggedIn(HTMLusername, logOutBtn, "main");
  }
}
initiator();
