import Post from "./Post.mjs";
/**
 *
 * @param {*} event a button with an id
 * @param {*} posts all posts
 * @returns an filtered list of posts determined by what button was pressed
 */
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
/**
 *
 * @param {*} post
 * @returns post if it has an image
 */
function filterMedia(post) {
  if (post.postData.media) {
    return true;
  }
}
/**
 *
 * @param {*} post
 * @returns post if it is from today
 */
function filterTodaysPosts(post) {
  let postDate = post.postData.created;
  let formatedPostDate = new Date(postDate);
  let todaysDate = new Date();
  if (todaysDate.getDate() === formatedPostDate.getDate()) {
    return true;
  }
}
/**
 *
 * @param {*} post
 * @returns returns all posts if they match your username
 */
function filterMyPosts(post) {
  let username = localStorage.getItem("username");
  if (post.postData.author.name === username) {
    return true;
  }
}
/**
 *
 * @param {*} event targeted element(sort buttons)
 * @param {*} posts all posts
 * @returns all the post sorted either new first or oldest first
 */
function sortPosts(event, posts) {
  let sortType = event.target.id;
  let sortedPosts = [];
  if (sortType === "new") {
    sortedPosts = posts.sort((postA, postB) => {
      let postAUpdate = new Date(postA.postData.updated);
      let postBUpdate = new Date(postB.postData.updated);
      if (postAUpdate > postBUpdate) {
        return -1;
      } else if (postAUpdate < postBUpdate) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    sortedPosts = posts.sort((postA, postB) => {
      let postAUpdate = new Date(postA.postData.updated);
      let postBUpdate = new Date(postB.postData.updated);
      if (postAUpdate < postBUpdate) {
        return -1;
      } else if (postAUpdate > postBUpdate) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return sortedPosts;
}
/**
 *
 * @param {string} input input value of an search field
 * @param {object} posts an post object
 * @returns a filtered list
 */
function search(input, posts) {
  return posts.filter(searchFilter, input);
}
/**
 *
 * @param {object} post a post object, that needs a title
 * @returns {boolean} if the title match this(input value)
 */
function searchFilter(post) {
  let {
    title = post.postData.title,
    author = post.postData.author.name,
    text = post.postData.body,
  } = post;
  let string = this.toUpperCase();
  if (title.toUpperCase().indexOf(string) > -1) {
    return true;
  }
  if (author.toUpperCase().indexOf(string) > -1) {
    return true;
  }
  if (text.toUpperCase().indexOf(string) > -1) {
    return true;
  }
}
export { filterPosts, sortPosts, search };
