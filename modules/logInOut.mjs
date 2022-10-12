import { createAlert, displayResponse } from "./responses.mjs";
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
 * @param {htmlDOM} logOutBtn the logout button  / log in button
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
  window.location.href = "/feed.html";
}

function notLoggedIn(profileLink, logOutBtn, alertLocation) {
  let alert = createAlert("notLoggedIn", alertLocation, "beforebegin");
  displayResponse(alert, `<p class="m-0">Not logget in</p>`, true);
  logOutBtn.innerHTML = "Log in";
  profileLink.remove();
  logOutBtn.setAttribute("href", "./index.html");
}
export { isLoggedIn, logOutInitiate, notLoggedIn };
