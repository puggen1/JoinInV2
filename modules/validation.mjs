/*import {
    loginRegisterError,
    loginRegisterSuccess,
    removeBorder,
    displayMessage,
  } from "./responsiveMessage.mjs";*/
import { hiddenToggler, inputFieldColor } from "./responses.mjs";
let usernameRegex = /^[a-zA-Z0-9_æøåÆØÅ]{3,15}$/;
let emailRegex = /^[a-z0-9.æøå]{0,}[a-z0-9]{1,}@(stud.)?noroff.no$/i;
let passwordRegex = /^[a-zA-Z0-9æøåÆØÅ]{8,30}$/;

export default async function validate(event) {
  console.log(event);
  let {
    userName = event.target[0],
    email = event.target[1],
    password = event.target[2],
  } = event;
  let userErrorPlacement = document.querySelector("#regNameResponse");
  let emailErrorPlacement = document.querySelector("#regEmailResponse");
  let passwordErrorPlacement = document.querySelector("#regPasswordResponse");
  let nameOk = false;
  let emailOk = false;
  let passwordOk = false;
  if (usernameRegex.test(userName.value.trim())) {
    nameOk = true;
    //hiddenToggler(userErrorPlacement, nameOk);
    //inputFieldColor(userName, nameOk);
  }
  if (passwordRegex.test(password.value.trim())) {
    passwordOk = true;
    //hiddenToggler(passwordErrorPlacement, nameOk);
    //inputFieldColor(password, nameOk);
  }
  if (emailRegex.test(email.value.trim())) {
    emailOk = true;
    //hiddenToggler(emailErrorPlacement, nameOk);
    //inputFieldColor(email, nameOk);
  }
  /*
  for(input of event.target){
    if(input.tagName ==="INPUT"){

    }
  }*/
  //find a suiting for loop for this.. maybe add all to an array and then for each...
  hiddenToggler(userErrorPlacement, nameOk);
  inputFieldColor(userName, nameOk);
  hiddenToggler(passwordErrorPlacement, passwordOk);
  inputFieldColor(password, passwordOk);
  hiddenToggler(emailErrorPlacement, emailOk);
  inputFieldColor(email, emailOk);

  return { username: nameOk, email: emailOk, password: passwordOk };
}

//key down validating? only after unfocus? check v1 or formula blog
