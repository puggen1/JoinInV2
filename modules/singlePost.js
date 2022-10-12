import Post from "./Post.mjs";
import globalApiCall from "./globalApiCall.mjs";
let params = new URLSearchParams(window.location.search);
let token = localStorage.getItem("token");
let id = params.get("id");

let htmlDiv = document.querySelector("#post");

async function singlePost(id, token) {
  let response = await globalApiCall(
    `social/posts/${id}?_author=true`,
    token,
    "GET"
  );
  if (!response.message) {
    let post = new Post(response);
    post.logPost();
    document.title = post.postData.title;
    htmlDiv.innerHTML = post.htmlPost();
  }
}

singlePost(id, token);
