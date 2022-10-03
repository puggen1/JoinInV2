//import { eventNames } from "process";
import globalApiCall from "./globalApiCall.mjs";
import validate from "./validation.mjs";
let registerForm = document.querySelector("#register");
registerForm.addEventListener("submit", registerUser);
let loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);

async function registerUser(event) {
  event.preventDefault();
  console.log(event);

  let validateResult = await validate(event);
  let { username, email, password } = validateResult;
  let {
    inputName = event.target[0],
    inputEmail = event.target[1],
    inputPassword = event.target[2],
  } = event;
  if (username && email && password) {
    console.log(event);
    /*let response = await globalApiCall("social/auth/register", "", "POST", {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    });*/
    //do something with response
    // if response is error, display error and change green input fielt to red
    //else if success, show success message, redirect to profile after one second?
  }
}

async function loginUser(event) {
  event.preventDefault();
  console.log(event);
  let { inputEmail = event.target[0], inputPassword = event.target[1] } = event;
  let response = await globalApiCall("social/auth/login", "", "POST", {
    email: inputEmail.value,
    password: inputPassword.value,
  });
  console.log(response);

  //if response is ok /  token is retrieved, store token and name, redirect to profile or feed
}
