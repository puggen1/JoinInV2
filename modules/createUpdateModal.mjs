function createUpdateModal(id) {
  let outerModalDiv = document.createElement("div");
  outerModalDiv.classList.add("modal", "fade");
  outerModalDiv.id = "updatePost" + id;
  outerModalDiv.tabIndex = "-1";
  outerModalDiv.ariaHidden = "true";
  outerModalDiv.innerHTML = `<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="Label">Update post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
    </div>`;
}