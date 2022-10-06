export default class Post {
  constructor(postData) {
    this.postData = postData;
  }
  logPost() {
    console.log(this.postData);
  }
  // if author.name is equal to localstorage name
  // display edit and delete button
  /**
   * @description used to show either only link to single post, or if it is your post, options like delete and update.
   * @param {string} localUsername username stored in localstorage
   * @returns string with html of buttons
   */
  customButtons(localUsername) {
    let buttons = `<a type="button" href="./post?id=${this.postData.id}" class="btn btn-outline-dark col-3 m-0 px-0">View </a>`;
    //i dont know how to do this yet
    //this.postData.author.name === localUsername
    if (this.postData.id === 1470) {
      buttons += `<div class="dropdown">
      <button class="btn dropdown-toggle btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">options</button>
      <ul class="dropdown-menu">
          <li><button type="button" data-id="${this.postData.id}" class="btn postAction dropdown-item">update</button></li>
          <li><button type="button" data-id="${this.postData.id}" class="btn postAction dropdown-item">delete</button></li>
      </ul>
  </div>`;
    }
    //
    //
    return buttons;
  }
  static test() {
    console.log("test");
  }
  /**
   * @description runst trough a post class instance, puts the needed values inside html
   * @returns html with values from the postData
   */
  htmlPost() {
    let user = localStorage.getItem("username");
    let buttons = this.customButtons(user);
    let picture = Post.postPicture(this.postData);
    let profile = Post.postProfile(this.postData);
    let { title, body, author, created /*updated*/ } = this.postData;
    //<div class="container col-11 col-xl-10 gy-3"></div>
    let html = `
    <div class="card px-xl-4">
                <div class="card-body">
                ${profile}
                <h3 class="">${title}</h3>
                  ${picture}
                    <p class="card-text ">
                    ${body}
                       </p>
                    <div class="d-flex mt-3 justify-content-between ">
                    ${buttons}
                    <div class="d-flex justify-content-end">
                        <p class="m-2">${created}</p>
                        <!--<p class="m-2">25 aug</p>-->
                    </div>
                </div>
            </div>
</div>
`;
    return html;
  }
  /**
   * @description checks a post object for an picture, and show it in post if so
   * @param {object} post a single post
   * @returns string variable with html
   */
  static postPicture(post) {
    let img = "";

    if (post.media) {
      img = `<img src="${post.media}" class="img-fluid " alt="test alt">`;
    }
    return img;
  }
  /**
   * @description creates the profile div element for an post
   * @param {object} post a single post
   * @returns
   */
  static postProfile(post) {
    let img = "../assets/charlesdeluvio-K4mSJ7kc0As-unsplash.jpg";
    if (post.author.avatar) {
      img = post.author.avatar;
    }
    let avatar = `<img src="${img}" class="rounded-circle img-fluid col-1"  alt="user test alt">`;
    let userDiv = `<div class="d-flex align-items-end mb-3">${avatar} <p class="mb-0"><b class="me-1">${post.author.name}</b>Says:</p></div>`;
    return userDiv;
  }
  static updatePost() {
    console.log("updated");
  }
}
