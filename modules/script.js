import loginUser from "./login.mjs";
import registerUser from "./register.mjs";
let registerForm = document.querySelector("#register");
registerForm.addEventListener("submit", registerUser);
let loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);
