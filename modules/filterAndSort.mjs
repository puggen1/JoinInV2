import Post from "./Post.mjs";
function filterPosts(event, posts) {
  let filteredPosts = {};
  let keyword = event.target.id;
  if (keyword === "media") {
    filteredPosts = posts.filter(filterMedia);
  } else if (keyword === "today") {
    filteredPosts = posts.filter(filterTodaysPosts);
  } else if (keyword === "mine") {
    filteredPosts = posts.filter(filterMyPosts);
  } else {
    return posts;
  }
  return filteredPosts;
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

function sortPosts(event, posts) {
  let sortType = event.target.id;
  let sortedPosts = [];
  if (sortType === "new") {
    console.log("should sort as newest first");
    sortedPosts = posts.sort((postA, postB) => {
      let postAUpdate = new Date(postA.postData.updated);
      let postBUpdate = new Date(postB.postData.updated);
      if (postAUpdate > postBUpdate) {
        console.log("A");
        return -1;
      } else if (postAUpdate < postBUpdate) {
        console.log("B");
        return 1;
      } else {
        console.log("?");
        return 0;
      }
    });
  } else {
    console.log("should be sorted as old first");
    sortedPosts = posts.sort((postA, postB) => {
      let postAUpdate = new Date(postA.postData.updated);
      let postBUpdate = new Date(postB.postData.updated);
      if (postAUpdate < postBUpdate) {
        console.log("B");
        return -1;
      } else if (postAUpdate > postBUpdate) {
        console.log("A");
        return 1;
      } else {
        console.log("?");
        return 0;
      }
    });
  }
  return sortedPosts;
}
function search(input, posts) {
  return posts.filter(searchFilter, input);
}
function searchFilter(post) {
  if (post.postData.title.toLowerCase().includes(this.toLowerCase())) {
    return true;
  }
}
export { filterPosts, sortPosts, search };
