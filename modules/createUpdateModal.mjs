function createUpdateModal(id) {
  let outerModalDiv = document.createElement("div");
  outerModalDiv.classList.add("modal", "fade");
  outerModalDiv.id = "updatePost" + id;
  outerModalDiv.tabIndex = "-1";
  outerModalDiv.ariaHidden = "true";
  //this will be modal to update post...
 /* <div class="modal fade" id="updatePost" tabindex="-1" aria-labelledby="#updatePostLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updatePostLabel">Add image link here:</h1>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" id="updateTitle" class="form-control" placeholder="title">
          <input type="text" id="udateBody" class="form-control" placeholder="write here">
          <input type="text" id="UpdateMedia" class="form-control" placeholder="write here">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">update post</button>
        </div>
      </div>
    </div>
  </div>*/
}
