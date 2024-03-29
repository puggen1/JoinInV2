import {
  changeTypeAndColor,
  createAlert,
  displayResponse,
} from "./responses.mjs";
/**
 *
 * @param {string} authToken the auth token to get access to content
 * @param {boolean} isLoggedInStatus the status from localstorage(this is kind of a boolean, but it is either true or undefined...)
 * @returns {boolean} a kind of second security
 */
function isLoggedIn(authToken, isLoggedInStatus) {
  if (authToken && isLoggedInStatus) {
    return true;
  } else {
    return false;
  }
}
/**
 *
 * @param {object} logOutBtn the logout button  / log in button
 */
function logOutInitiate(logOutBtn) {
  logOutBtn.addEventListener("click", logOut);
}
/**
 * @description removes the local storage items that represent you being logget in
 */
function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  window.location.href = "/feed.html";
}
/**
 *
 * @param {object} profileLink a html object in header
 * @param {*} logOutBtn the logout / login Button
 * @param {*} alertLocation the target of the not logget in alert
 * @param {*} postForm the create post form if it excist
 * @param {*} postFilters the filters for all posts
 */
function notLoggedIn(
  profileLink,
  logOutBtn,
  alertLocation,
  postForm = "",
  postFilters = ""
) {
  let alert = createAlert("notLoggedIn", alertLocation, "beforebegin");
  changeTypeAndColor(alert, "alert", "danger");
  displayResponse(alert, `<p class="m-0">Not logget in</p>`, true);
  logOutBtn.innerHTML = "Log in";
  profileLink.remove();
  logOutBtn.setAttribute("href", "./index.html");
  postForm.classList.replace("d-lg-block", "hidden");
  if (postFilters) {
    postFilters.classList.add("hidden");
  }
}
export { isLoggedIn, logOutInitiate, notLoggedIn };
