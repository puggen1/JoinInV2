let authToken = localStorage.getItem("token");
let userName = localStorage.getItem("name");
let isLoggedInStatus = localStorage.getItem("isLoggedIn");
let logOutBtn = document.querySelector("#logOut");
let profileLink = document.querySelector("#username");

//double validation for is logged in so token must be used as well
function isLoggedIn() {
  if (authToken && isLoggedInStatus) {
    return true;
  } else {
    return false;
  }
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.setItem("isLoggenIn", false);
  window.location.href = "/feed.html";
}

function feedInitiator() {
  let status = isLoggedIn();
  if (status) {
    profileLink.innerHTML = userName;
    logOutBtn.addEventListener("click", logOut);
  } else {
    logOutBtn.innerHTML = "Log in";
    profileLink.innerHTML = "";
    logOutBtn.setAttribute("href", "./index.html");
  }
}
feedInitiator();
