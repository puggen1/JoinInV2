/**
 *
 * @param {object} htmlElement the element you want to toggle hidden on
 * @param {boolean} shouldBeHidden determines if the element should be hidden or not
 * @example ```js
 * hiddenTogler(htmlDiv, false)
 * //element will now be shown
 * ```
 */
function hiddenToggler(htmlElement, shouldBeHidden = true) {
  if (shouldBeHidden) {
    htmlElement.classList.add("hidden");
  } else {
    htmlElement.classList.remove("hidden");
  }
}
/**
 * @description all the diffrent bootstrap colors, used in loop to stip elements for color
 */
let colorList = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];
/**
 *
 * @param {object} htmlElement the element you want to change your border of
 * @param {boolean} status determines if it should be green or red border
 */
function changeColor(htmlElement, status = true) {
  if (!status) {
    htmlElement.classList.add("border-danger");
    htmlElement.classList.remove("border-success");
  } else {
    htmlElement.classList.add("border-success");
    htmlElement.classList.remove("border-danger");
  }
}
/**
 *
 * @param {object} htmlElement the targeted element that needs to change color
 * @param {string} type the place of dom that needs to be changed
 * @param {string} colorType color type that is wanted
 * @example ```js
 * changeTypeAndColor(htmlDIV, "alert", "success")
 * ```
 */
function changeTypeAndColor(htmlElement, type, colorType = "") {
  //removes all color if any and adds new... might need to check class list..
  for (let color of colorList) {
    htmlElement.classList.remove(`${type}-${color}`);
  }
  if ((type, colorType)) {
    htmlElement.classList.add(`${type}-${colorType}`);
  }
}
/**
 *
 * @param {object} htmlElement the html element that you want yo add innerHTML to
 * @param {string} message the message that should be added
 * @param {boolean} dismissable if the button for dismiss should be shown or not
 * @example ```js
 * displayResponse(htmlDIV, "<p>This is an paragraph</p>")
 * ```
 */
function displayResponse(htmlElement, message, dismissable = false) {
  let alternative = `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  if (dismissable) {
    htmlElement.innerHTML = message + alternative;
  } else {
    htmlElement.innerHTML = message;
  }
}
/**
 * @description used to create an alert element to be further used in you code. for example to display an error
 * @param {string} id wanted id for the element you are creating... might be removied later
 * @param {string} target id of target you want to place the new element around or inside
 * @param {string} posistion the possistion of the new element according to the target
 * @param {string} size the col size of the alert, standart is col-7
 * @returns the created alert element, do be used further
 * @example ```js
 * let alert = createAlert("createPost", "#postForm", "beforeend", "col-12")
 * ```
 */
function createAlert(id, target, posistion, size = "col-7") {
  let targetedHtmlElement = document.querySelector(target);
  let alert = document.createElement("div");
  alert.classList.add(
    "mt-3",
    size,
    "alert",
    "alert-dismissable",
    "justify-content-between",
    "d-flex"
  );
  alert.id = id;
  alert.role = "alert";
  targetedHtmlElement.insertAdjacentElement(posistion, alert);
  return alert;
}

export {
  hiddenToggler,
  changeColor,
  displayResponse,
  changeTypeAndColor,
  createAlert,
};
