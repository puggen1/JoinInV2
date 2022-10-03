function hiddenToggler(htmlElement, status) {
  if (status) {
    htmlElement.classList.add("hidden");
  } else {
    htmlElement.classList.remove("hidden");
  }
}
function inputFieldColor(htmlElement, status) {
  if (!status) {
    htmlElement.classList.add("border-danger");
    htmlElement.classList.remove("border-success");
  } else {
    htmlElement.classList.add("border-success");
    htmlElement.classList.remove("border-danger");
  }
}
export { hiddenToggler, inputFieldColor };
