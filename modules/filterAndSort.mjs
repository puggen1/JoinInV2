import Post from "./Post.mjs";
function filterPosts(event, posts, target) {
  target.innerHTML = "";
  let filteredPosts = {};
  let keyword = event.target.id;
  console.log(keyword);
  console.log(posts);
  if (keyword === "media") {
    filteredPosts = posts.filter(filterMedia);
  } else if (keyword === "today") {
    filteredPosts = posts.filter(filterTodaysPosts);
  } else {
    filteredPosts = posts.filter(filterMyPosts);
  }
  for (let post of filteredPosts) {
    Post.displayPosts(post, target);
  }
}
function filterMedia(post) {
  if (post.postData.media) {
    return true;
  }
}
function filterTodaysPosts(post) {
  let postDate = post.postData.created;
  let formatedPostDate = new Date(postDate);
  let todaysDate = new Date();
  if (todaysDate.getDate() === formatedPostDate.getDate()) {
    return true;
  }
}
function filterMyPosts(post) {
  let username = localStorage.getItem("username");
  if (post.postData.author.name === username) {
    return true;
  }
}
export { filterPosts };
