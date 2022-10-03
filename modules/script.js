//import { eventNames } from "process";
import globalApiCall from "./globalApiCall.mjs";
import validate from "./validation.mjs";
import {
  hiddenToggler,
  displayResponse,
  changeColor,
  alertColor,
} from "./responses.mjs";
let registerForm = document.querySelector("#register");
registerForm.addEventListener("submit", registerUser);
let loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);

async function registerUser(event) {
  event.preventDefault();
  //for success or error message
  let responseMessage;
  let registerResponse = document.querySelector("#registerResponse");
  let validateResult = await validate(event);
  let { username, email, password } = validateResult;
  let {
    inputName = event.target[0],
    inputEmail = event.target[1],
    inputPassword = event.target[2],
  } = event;

  if (username && email && password) {
    console.log(event);
    let response = await globalApiCall("social/auth/register", "", "POST", {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    });
    console.log(response);
    if (!response.email) {
      alertColor(registerResponse, "danger");
      responseMessage = response.message;
    } else {
      alertColor(registerResponse, "success");
      responseMessage = "Account created";
    }
    //do something with response
    // if response is error, display error and change green input fielt to red
    //else if success, show success message, redirect to profile after one second?
    displayResponse(
      registerResponse,
      `<p class="m-auto">${responseMessage}</p>`
    );
    hiddenToggler(registerResponse, false);
  }
}

async function loginUser(event) {
  event.preventDefault();
  let { inputEmail = event.target[0], inputPassword = event.target[1] } = event;
  let response = await globalApiCall("social/auth/login", "", "POST", {
    email: inputEmail.value,
    password: inputPassword.value,
  });
  if (response.authorizationToken || !response.message) {
    console.log(response);
    hiddenToggler(loginResponse);
    displayResponse(loginResponse, "");
  } else {
    let loginResponse = document.querySelector("#loginResponse");
    hiddenToggler(loginResponse, false);
    displayResponse(loginResponse, `<p class="m-auto">${response.message}</p>`);
  }
  //if response is ok /  token is retrieved, store token and name, redirect to profile or feed
}
