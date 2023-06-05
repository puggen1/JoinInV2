import { isLoggedIn, logOutInitiate, notLoggedIn } from "./logInOut.mjs";
import {
  createAlert,
  changeTypeAndColor,
  displayResponse,
} from "./responses.mjs";
import globalApiCall from "./globalApiCall.mjs";
import Post from "./Post.mjs";
import customAvatar from "./customAvatar.js";
let params = new URLSearchParams(window.location.search);
let user = params.get("username");
let localUser = localStorage.getItem("username");
let authToken = localStorage.getItem("token");
let status = localStorage.getItem("isLoggedIn");
let avatar = localStorage.getItem("avatar");

//html i need to edit
let contactHeader = document.querySelector("#contacts h2");
let contacts = document.querySelector("#contacts");
let Profileheader = document.querySelector("h1");
let image = document.querySelector("#roundProfilePicture");
let modalText = document.querySelector("#modalText");
let modalImage = document.querySelector("#profilePicture img");
let posts = document.querySelector("#posts");
let allContent = document.querySelector("#allContent");
let middlePart = document.querySelector("#allPosts");
let newPost = document.querySelector("#newPost");
let newButton = document.querySelector("#newButton");
let imgLink = document.querySelector("#imgLink");
let profileLink = document.querySelector("#username");
let logOutBtn = document.querySelector("#logOut");

//update avatar
let changeAvatar = document.querySelector("#changeAvatar");
let inputAvatar = document.querySelector("#avatarLink");
let responseMessage = document.querySelector("#response");
newPost.addEventListener("submit", () => {
  Post.createPost(event, imgLink);
});

async function initiateProfile() {
  profileLink.children[0].innerHTML = localUser;
  profileLink.children[1].src = (avatar && avatar !== "null") ? avatar : customAvatar(localUser);
  let url = "social/profiles/";
  let myself;
  //finds out if it is your own profile or not
  if (user && user !== localUser) {
    url += user;
    myself = false;
  } else {
    myself = true;
    url += localUser;
  }
  url += "?_posts=true";
  let response = await globalApiCall(url, authToken, "GET");
  if (response.message) {
    alert = createAlert("profileAlert", "#allContent", "afterbegin", "col-6");
    changeTypeAndColor(alert, "alert", "danger");
    displayResponse(alert, response.message, true);
  } else {
  if (myself) {
    contactHeader.innerHTML = "my contacts";
      inputAvatar.addEventListener("input", (e) => {
        if (new URL(e.target.value)) {
          modalImage.src = e.target.value;
        }
      });

      changeAvatar.addEventListener("click", async () => {
        const url = `social/profiles/${localUser}/media`;
        let response = await globalApiCall(url, authToken, "PUT", {
          avatar: inputAvatar.value,
        });
        if (response.avatar === inputAvatar.value) {
          image.src = inputAvatar.value;
          modalImage.src = inputAvatar.value;
          modalText.innerHTML = `${localUser}'s profile picture`;
          inputAvatar.value = "";
          localStorage.setItem("avatar", response.avatar);
          responseMessage.innerHTML = "avatar changed";
        } else {
          responseMessage.innerHTML = "something went wrong";
        }
      });
    //if not my profile:
  } else {
    middlePart.classList.add("order-3", "order-md-4", "order-xl-2");
    middlePart.classList.remove("order-4", "order-xl-5");
    newPost.remove();
    newButton.remove();
    allContent.classList.add("align-items-start");
  }
  Profileheader.innerHTML = response.name;
  if (response.avatar) {
    image.src = response.avatar;
    modalImage.src = response.avatar;
  }
  modalText.innerHTML = `${response.name}'s profile picture`;
  if (response.posts) {
      posts.innerHTML = "";
    for (let post of response.posts) {
      let singlePost = new Post(post);
        let picture = singlePost.Picture();
      let buttons = singlePost.customButtons(localUser, false, true);
      let {
        title = singlePost.postData.title,
        body = singlePost.postData.body,
      } = post;
      let dates = singlePost.time();
      //similar to post class's display post, might merge them later
      let postDiv = document.createElement("div");
        postDiv.classList.add("card", "my-2", "mx-sm-3", "col-12", "my-2");
      postDiv.innerHTML = `
      <div class="card-body">
        <h3 class="fs-5"><b>${title}</b></h3>
        ${picture}
          <p class="card-text col-10 mt-2 fs-6">
          ${body}
             </p>
            </div>
            <div class="d-flex mt-3 justify-content-between flex-wrap card-footer ">
          ${buttons}
          <div class="d-flex justify-content-end ">
              <p class="m-2">${dates[0]} ${dates[1]}</p>
              <p class="m-2 ms-0">${dates[2]}</p>
          </div>
      </div>`;
      if (myself) {
        singlePost.addEvent(postDiv);
      }
        posts.insertAdjacentElement("beforeend", postDiv);
      }
    }
  }
}

if (isLoggedIn(authToken, status)) {
  initiateProfile();
} else {
  notLoggedIn(profileLink, logOutBtn, "#allContent", newPost);
}
logOutInitiate(logOutBtn);
