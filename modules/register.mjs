import globalApiCall from "./globalApiCall.mjs";
import validate from "./validation.mjs";
import {
  hiddenToggler,
  displayResponse,
  changeTypeAndColor,
} from "./responses.mjs";
/**
 * @description this function registers a user, and gives response on the html
 * @param {htmlDOM} event html form with 3 input for user, email and password
 * @example```js
 * registerUser(form)
 *
 * //expected result: user is created or error, also a alert box is shown with status
 * ```
 */
export default async function registerUser(event) {
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
    let response = await globalApiCall("social/auth/register", "", "POST", {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    });
    if (!response.email) {
      changeTypeAndColor(registerResponse, "alert", "danger");
      responseMessage = response.message;
    } else {
      changeTypeAndColor(registerResponse, "alert", "success");
      responseMessage = "Account created";
      inputName.value = "";
      inputEmail.value = "";
      inputPassword.value = "";
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
