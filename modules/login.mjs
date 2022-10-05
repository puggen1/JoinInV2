import { hiddenToggler, displayResponse } from "./responses.mjs";
//import { eventNames } from "process";
import globalApiCall from "./globalApiCall.mjs";

/**
 *
 * @param {Form Event} event all info needed, given from eventListener
 */
export default async function loginUser(event) {
  event.preventDefault();
  let { inputEmail = event.target[0], inputPassword = event.target[1] } = event;
  let response = await globalApiCall("social/auth/login", "", "POST", {
    email: inputEmail.value,
    password: inputPassword.value,
  });
  if (response.accessToken || !response.message) {
    console.log(response);
    hiddenToggler(loginResponse);
    displayResponse(loginResponse, "");
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("username", response.name);
    window.location.href = "./feed.html";
  } else {
    let loginResponse = document.querySelector("#loginResponse");
    hiddenToggler(loginResponse, false);
    displayResponse(loginResponse, `<p class="m-auto">${response.message}</p>`);
  }
  //if response is ok redirect to profile or feed
}
