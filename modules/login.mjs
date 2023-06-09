import { hiddenToggler, displayResponse } from "./responses.mjs";
//import { eventNames } from "process";
import globalApiCall from "./globalApiCall.mjs";

/**
 * @description logins a user or gives response that some credentials is not correct.
 * @param {Form Event} event all info needed, given from eventListener(user, email and password as input values)
 * @example ```js
 * loginUser(loginForm);
 * //expected result: user is logged in, or response is shown under form
 * ```
 */
export default async function loginUser(event) {
  event.preventDefault();
  let { inputEmail = event.target[0], inputPassword = event.target[1] } = event;
  let response = await globalApiCall("social/auth/login", "", "POST", {
    email: inputEmail.value,
    password: inputPassword.value,
  });
  if (response.accessToken) {
    hiddenToggler(loginResponse);
    displayResponse(loginResponse, "");
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("username", response.name);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("avatar", response.avatar);
    window.location.href = "./feed.html";
  } else {
    let loginResponse = document.querySelector("#loginResponse");
    hiddenToggler(loginResponse, false);
    displayResponse(loginResponse, `<p class="m-auto">${response.message}</p>`);
  }
  //if response is ok redirect to profile or feed
}
