import globalApiCall from "./globalApiCall.mjs";
import {
  changeColor,
  changeTypeAndColor,
  createAlert,
  displayResponse,
} from "./responses.mjs";
//import { Modal } from "../node_modules/bootstrap/js/dist/modal.js";
export default class Post {
  constructor(postData) {
    this.postData = postData;
  }
  logPost() {
    console.log(this.postData);
  }
  // if author.name is equal to localstorage name
  // display edit and delete button
  /**
   * @description used to show either only link to single post, or if it is your post, options like delete and update.
   * @param {string} localUsername username stored in localstorage
   * @returns string with html of buttons
   */
  customButtons(localUsername) {
    let buttons = `<a type="button" href="./post?id=${this.postData.id}" class="btn btn-outline-dark col-3 m-0 px-0">View </a>`;
    //i dont know how to do this yet
    //this.postData.author.name === localUsername
    if (this.postData.author.name === localUsername) {
      buttons += `<div class="dropdown">
      <button class="btn dropdown-toggle btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">options</button>
      <ul class="dropdown-menu">
          <li><button type="button" data-bs-target="#updatePost" data-id="${this.postData.id}" class="btn postAction dropdown-item">update</button></li>
          <li><button type="button" data-id="${this.postData.id}" class="btn postAction dropdown-item">delete</button></li>
      </ul>
  </div>`;
    }
    //
    //
    return buttons;
  }
  /**
   * @description runst trough a post class instance, puts the needed values inside html
   * @returns html with values from the postData
   */
  htmlPost() {
    this.time();
    let user = localStorage.getItem("username");
    let buttons = this.customButtons(user);
    let picture = Post.postPicture(this.postData);
    let profile = Post.postProfile(this.postData);
    let [status, date, time] = this.time();
    let { title, body /*updated*/ } = this.postData;
    //<div class="container col-11 col-xl-10 gy-3"></div>
    let html = `
    <div class="card px-xl-4">
                <div class="card-body">
                ${profile}
                <h3 class="">${title}</h3>
                  ${picture}
                    <p class="card-text col-10">
                    ${body}
                       </p>
                    <div class="d-flex mt-3 justify-content-between ">
                    ${buttons}
                    <div class="d-flex justify-content-end">
                        <p class="m-2">${status} ${time}</p>
                        <p class="m-2 ms-0">${date}</p>
                    </div>
                </div>
            </div>
</div>
`;
    return html;
  }
  /**
   * @description checks a post object for an picture, and show it in post if so
   * @param {object} post a single post
   * @returns string variable with html
   */
  static postPicture(post) {
    let img = "";

    if (post.media) {
      img = `<img src="${post.media}" class="img-fluid" alt="test alt">`;
    }
    return img;
  }
  /**
   * @description creates the profile div element for an post
   * @param {object} post a single post
   * @returns
   */
  static postProfile(post) {
    //make universal for friends function (move to another file and function )
    let img = "../assets/charlesdeluvio-K4mSJ7kc0As-unsplash.jpg";
    if (post.author.avatar) {
      img = post.author.avatar;
    }
    let avatar = `<img src="${img}" class="rounded-circle img-fluid col-1">`;
    let userDiv = `<div class="d-flex align-items-end mb-3">${avatar} <a href="./profile.html?username=${post.author.name}"class="mb-0 link-dark"><b class="me-1">${post.author.name}</a></b>Says:</div>`;
    return userDiv;
  }
  //can be changed to non static if i send id with it
  async showUpdatePostModal() {
    //this works but is not what i expected
    let id = this.getAttribute("data-id");
    let update = bootstrap.Modal.getOrCreateInstance("#updatePost");
    update.show();
    let updateform = document.querySelector("#updatePostForm");
    updateform.addEventListener("submit", () => {
      Post.updatePost(event, id, update);
    });
  }
  static async updatePost(e, id, modal) {
    e.preventDefault();
    let { title = e.target[0], body = e.target[1], media = e.target[2] } = e;
    let token = localStorage.getItem("token");
    let bodyToSend = { title: title.value, body: body.value };
    //arr fro loop
    let htmlArr = [title, body];
    if (media.value) {
      bodyToSend.media = media.value;
    }
    if ((title.value, body.value)) {
      let response = await globalApiCall(
        `social/posts/${id}`,
        token,
        "PUT",
        bodyToSend
      );
      console.log(response);
      htmlArr.forEach((input) => {
        changeColor(input, true);
      });
      modal.hide();
      for (let input of e.target) {
        input.value = "";
        changeTypeAndColor(input, "border");
      }
    } else {
      htmlArr.forEach((input) => {
        if (!input.value) {
          changeColor(input, false);
        } else {
          changeColor(input, true);
        }
      });
    }
  }
  /**
   * @description takes id from an button, deletes the post with that id
   */
  async deletePost() {
    let id = this.getAttribute("data-id");
    let token = localStorage.getItem("token");
    if (confirm("Delete this post?")) {
      let response = await globalApiCall(`social/posts/${id}`, token, "DELETE");
      console.log(response);
    } else {
      console.log("cancelled");
    }
  }
  /**
   * @description adds eventlisteners to the buttons of an post, so events will be triggered when clicked
   * @param {htmlDOM} singlePost a html post, that the user created, with the update and delete buttons
   *
   */
  addEvent(singlePost) {
    let postActions = singlePost.querySelectorAll(".postAction");
    if (postActions.length > 0) {
      postActions[0].addEventListener("click", this.showUpdatePostModal);
      postActions[1].addEventListener("click", this.deletePost);
    }
  }
  /**
   * @description creates a post with the given data
   * @param {htmlDom} event an html object with form data
   */
  static async createPost(event, imageLink) {
    event.preventDefault();
    let alert = createAlert("postMessage", "#newPost", "beforeend");

    let token = localStorage.getItem("token");
    let { title = event.target[0], body = event.target[1] } = event;
    let contentArr = [title, body];

    if (title.value && body.value) {
      let apiBody = { title: title.value, body: body.value };
      if (imageLink.value) {
        apiBody.media = imageLink.value;
      }

      let response = await globalApiCall(
        "social/posts",
        token,
        "POST",
        apiBody
      );
      console.log(response);
      contentArr.forEach((ele) => {
        changeTypeAndColor(ele, "border", "");
      });
      displayResponse(alert, `<p class="m-0">Post created</p>`, true);
      changeTypeAndColor(alert, "alert", "success");
    } else {
      contentArr.forEach((ele) => {
        if (!ele.value) {
          changeTypeAndColor(ele, "border", "danger");
        }
      });
      displayResponse(
        alert,
        `<p class="m-0">title and body is required</p>`,
        true
      );
      changeTypeAndColor(alert, "alert", "danger");
    }
  }
  /**
   *
   * @returns {array} of values for a single post(time and date for creation or updated)
   */
  time() {
    let options = { month: "long" };
    let current = new Date(this.postData.created);
    let status = "<b>created: </b>";
    if (this.postData.updated > this.postData.created) {
      current = new Date(this.postData.updated);
      status = "<b>updated: </b>";
    }
    //hours and minutes
    let hour = current.getHours();
    let minutes = current.getMinutes();
    let time = `${hour}:${minutes}`;

    //day and month
    let date = current.getDate();
    let month = new Intl.DateTimeFormat("en-US", options).format(current);
    let fullDate = `${date} ${month}`;
    //hmm
    //or

    return [status, fullDate, time];
  }
  /**
   *
   * @param {Object} post class instance of Post
   * @param {*} postDiv target div where content will be added to
   */
  static displayPosts(post, postDiv) {
    let singlePost = document.createElement("div");
    singlePost.classList.add("container", "col-11", "col-xl-10", "my-3");
    singlePost.innerHTML = post.htmlPost();
    postDiv.insertAdjacentElement("beforeend", singlePost);
    //so it only runs on my posts
    if (post.postData.author.name === localStorage.getItem("username")) {
      post.addEvent(singlePost);
    }
  }
}
