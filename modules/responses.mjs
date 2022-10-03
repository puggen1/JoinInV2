/**
 *
 * @param {htmlDOM} htmlElement the element you want to toggle hidden on
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
 * @param {htmlDOM} htmlElement the targeted element that needs to change color
 * @param {string} type the place of dom that needs to be changed
 * @param {string} colorType color type that is wanted
 * @example ```js
 * changeTypeAndColor(htmlDIV, "alert", "success")
 * ```
 */
function changeTypeAndColor(htmlElement, type, colorType) {
  //removes all color if any and adds new... might need to check class list..
  for (let color of colorList) {
    htmlElement.classList.remove(`${type}-${color}`);
  }
  htmlElement.classList.add(`${type}-${colorType}`);
}
/**
 *
 * @param {htmlDOM} htmlElement the html element that you want yo add innerHTML to
 * @param {string} message the message that should be added
 * @example ```js
 * displayResponse(htmlDIV, "<p>This is an paragraph</p>")
 * ```
 */
function displayResponse(htmlElement, message) {
  htmlElement.innerHTML = message;
}

export { hiddenToggler, changeColor, displayResponse, changeTypeAndColor };